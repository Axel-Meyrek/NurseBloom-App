import { medications } from '../../data/medications.js';
import { router } from './router.js';

export const medicationsModule = {
    allMeds: [],

    init() {
        // Flatten medications for easier searching
        this.allMeds = medications.flatMap(cat => cat.items.map(item => ({...item, category: cat.category})));

        const searchInput = document.getElementById('meds-search');
        const searchBtn = document.getElementById('meds-search-btn');
        const clearBtn = document.getElementById('clear-meds-btn');

        if (searchInput) {
            searchInput.oninput = () => {
                clearBtn.style.display = searchInput.value ? 'block' : 'none';
                this.filterMeds(searchInput.value);
            };
        }

        if (clearBtn) {
            clearBtn.onclick = () => {
                searchInput.value = '';
                clearBtn.style.display = 'none';
                this.filterMeds('');
            };
        }

        this.renderList(this.allMeds);
    },

    filterMeds(query) {
        const q = query.toLowerCase().trim();
        const filtered = this.allMeds.filter(med => 
            med.name.toLowerCase().includes(q) || 
            med.indications.some(i => i.toLowerCase().includes(q)) ||
            med.category.toLowerCase().includes(q)
        );
        this.renderList(filtered);
    },

    renderList(list) {
        const container = document.getElementById('medications-list');
        if (!container) return;

        if (list.length === 0) {
            container.innerHTML = `<p style="text-align: center; padding: 20px; color: var(--text-muted);">No se encontraron medicamentos.</p>`;
            return;
        }

        container.innerHTML = '';
        list.forEach(med => {
            const item = document.createElement('div');
            item.className = 'list-item';
            item.style.flexDirection = 'column';
            item.style.alignItems = 'flex-start';
            item.style.gap = '8px';
            
            item.innerHTML = `
                <div style="display: flex; justify-content: space-between; width: 100%; align-items: center;">
                    <strong style="color: var(--primary-color); font-size: 1.05rem;">${med.name}</strong>
                    <span style="font-size: 0.65rem; background: #f1f3f5; padding: 2px 8px; border-radius: 8px; color: #666;">${med.category}</span>
                </div>
                <p style="font-size: 0.85rem; color: #666; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden;">
                    ${med.indications[0]}
                </p>
            `;
            item.onclick = () => this.showDetail(med);
            container.appendChild(item);
        });
    },

    showDetail(med) {
        const content = document.getElementById('medication-detail-content');
        if (!content) return;

        content.innerHTML = `
            <div class="card" style="margin-top: 10px; border-top: 4px solid var(--accent-color);">
                <div style="margin-bottom: 25px;">
                    <span style="font-size: 0.75rem; font-weight: 700; color: var(--accent-color); text-transform: uppercase; letter-spacing: 1px;">${med.category}</span>
                    <h1 style="font-size: 2rem; color: var(--primary-color); margin-top: 5px;">${med.name}</h1>
                </div>

                <div style="margin-bottom: 30px;">
                    <h3 style="font-size: 0.9rem; text-transform: uppercase; color: var(--text-muted); margin-bottom: 15px; border-bottom: 1px solid #eee; padding-bottom: 8px;">Indicaciones terapéuticas</h3>
                    <ul style="list-style: none;">
                        ${med.indications.map(i => `<li style="margin-bottom: 10px; padding-left: 20px; position: relative;"><i class="fas fa-check" style="position: absolute; left: 0; top: 4px; color: var(--accent-color); font-size: 0.8rem;"></i> ${i}</li>`).join('')}
                    </ul>
                </div>

                <div>
                    <h3 style="font-size: 0.9rem; text-transform: uppercase; color: var(--text-muted); margin-bottom: 15px; border-bottom: 1px solid #eee; padding-bottom: 8px;">Presentaciones disponibles</h3>
                    <ul style="list-style: none;">
                        ${med.presentations.map(p => `<li style="margin-bottom: 10px; padding-left: 20px; position: relative;"><i class="fas fa-box" style="position: absolute; left: 0; top: 4px; color: #636e72; font-size: 0.8rem;"></i> ${p}</li>`).join('')}
                    </ul>
                </div>
            </div>

            <div class="card" style="background: rgba(32, 201, 151, 0.05); border: 1px dashed var(--accent-color);">
                <p style="font-size: 0.85rem; color: #555; text-align: center;">
                    <i class="fas fa-info-circle"></i> Consulta siempre el protocolo de tu institución y la ficha técnica del fabricante antes de la administración.
                </p>
            </div>
        `;

        router.navigate('medication-detail');
    }
};
