import { medicalTerms } from '../../data/dictionaryData.js';
import { medications } from '../../data/medications.js';

export const dictionaryModule = {
    history: [],

    init() {
        const searchBtn = document.getElementById('search-btn');
        const searchInput = document.getElementById('dictionary-search');
        const clearBtn = document.getElementById('clear-search-btn');

        searchBtn.onclick = () => this.search();
        
        searchInput.oninput = () => {
            clearBtn.style.display = searchInput.value ? 'block' : 'none';
        };

        searchInput.onkeypress = (e) => {
            if (e.key === 'Enter') this.search();
        };

        clearBtn.onclick = () => {
            searchInput.value = '';
            clearBtn.style.display = 'none';
            this.search();
        };

        this.loadHistory();
        this.renderHistory();
    },

    loadHistory() {
        const saved = localStorage.getItem('nursebloom_search_history');
        if (saved) {
            this.history = JSON.parse(saved);
        }
    },

    saveToHistory(termData) {
        // Remove if already exists to move to top
        this.history = this.history.filter(h => h.word.toLowerCase() !== termData.word.toLowerCase());
        
        // Add to beginning
        this.history.unshift({
            word: termData.word,
            definition: termData.definition,
            info: termData.info,
            source: termData.source
        });

        // Limit to 5 items
        if (this.history.length > 5) {
            this.history = this.history.slice(0, 5);
        }

        localStorage.setItem('nursebloom_search_history', JSON.stringify(this.history));
        this.renderHistory();
    },

    renderHistory() {
        const container = document.getElementById('recent-searches');
        const list = document.getElementById('recent-searches-list');
        if (!list || !container) return;

        if (this.history.length === 0) {
            container.style.display = 'none';
            return;
        }

        container.style.display = 'block';
        list.innerHTML = '';

        this.history.forEach(item => {
            const tag = document.createElement('div');
            tag.className = 'history-tag';
            tag.style.cssText = `
                padding: 14px 22px;
                background: white;
                border: 1px solid #e2e8f0;
                border-radius: 20px;
                font-size: 1rem;
                font-weight: 500;
                color: var(--primary-color);
                cursor: pointer;
                transition: all 0.2s ease;
                box-shadow: 0 2px 4px rgba(0,0,0,0.02);
                width: 100%;
                display: flex;
                justify-content: space-between;
                align-items: center;
            `;
            
            tag.innerHTML = `<span>${item.word}</span> <i class="fas fa-history" style="font-size: 0.8rem; opacity: 0.3;"></i>`;
            
            // Hover effect via JS
            tag.onmouseover = () => {
                tag.style.borderColor = 'var(--accent-color)';
                tag.style.background = '#f8fafc';
                tag.style.transform = 'translateX(5px)';
            };
            tag.onmouseout = () => {
                tag.style.borderColor = '#e2e8f0';
                tag.style.background = 'white';
                tag.style.transform = 'translateX(0)';
            };

            tag.onclick = () => {
                document.getElementById('dictionary-search').value = item.word;
                document.getElementById('clear-search-btn').style.display = 'block';
                this.renderResult(item);
                window.scrollTo({ top: 0, behavior: 'smooth' });
            };
            list.appendChild(tag);
        });
    },

    async search() {
        const query = document.getElementById('dictionary-search').value.toLowerCase().trim();
        const resultDiv = document.getElementById('dictionary-result');
        const historyDiv = document.getElementById('recent-searches');
        
        if (!query) {
            resultDiv.innerHTML = '';
            historyDiv.style.display = this.history.length > 0 ? 'block' : 'none';
            return;
        }

        resultDiv.innerHTML = '<p style="text-align: center; padding: 20px; color: var(--text-muted);"><i class="fas fa-spinner fa-spin"></i> Consultando fuentes médicas...</p>';
        historyDiv.style.display = 'none';

        let found = medicalTerms.find(t => t.word.toLowerCase() === query);
        
        if (!found) {
            medications.forEach(cat => {
                const med = cat.items.find(m => m.name.toLowerCase().includes(query));
                if (med) {
                    found = {
                        word: med.name,
                        definition: `Medicamento perteneciente a la categoría de ${cat.category}.`,
                        info: `Indicaciones: ${med.indications.join(', ')}`,
                        source: 'Nurse Bloom'
                    };
                }
            });
        }

        if (found) {
            this.saveToHistory(found);
            this.renderResult(found);
        } else {
            try {
                const response = await fetch(`https://es.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(query)}`);
                if (response.ok) {
                    const data = await response.json();
                    const wikiResult = {
                        word: data.title,
                        definition: data.extract,
                        info: 'Información obtenida vía Wikipedia para consulta general.',
                        source: 'Wikipedia'
                    };
                    this.saveToHistory(wikiResult);
                    this.renderResult(wikiResult);
                } else {
                    throw new Error('No encontrado');
                }
            } catch (error) {
                resultDiv.innerHTML = `
                    <p style="margin-top: 20px; color: var(--error-color); text-align: center;">
                        <i class="fas fa-exclamation-circle"></i> No se encontró información para "${query}".
                    </p>
                `;
                historyDiv.style.display = this.history.length > 0 ? 'block' : 'none';
            }
        }
    },

    renderResult(found) {
        const resultDiv = document.getElementById('dictionary-result');
        const historyDiv = document.getElementById('recent-searches');

        historyDiv.style.display = 'none';

        resultDiv.innerHTML = `
            <div class="result-card" style="margin-top: 10px; padding: 20px; border-left: 4px solid ${found.source === 'Wikipedia' ? 'var(--secondary-accent)' : 'var(--accent-color)'}; background: white; border-radius: 12px; box-shadow: var(--shadow-sm); animation: fadeIn 0.5s ease;">
                <div style="display: flex; justify-content: space-between; align-items: flex-start;">
                    <h3 style="color: var(--primary-color); margin-bottom: 10px; font-size: 1.2rem;">${found.word}</h3>
                    <span style="font-size: 0.65rem; background: #eee; padding: 2px 8px; border-radius: 10px; color: #666; font-weight: 600;">${found.source || 'Nurse Bloom'}</span>
                </div>
                <p style="font-size: 0.95rem; line-height: 1.6; color: #333;">${found.definition}</p>
                ${found.info ? `<p style="margin-top: 15px; font-size: 0.85rem; color: #666; border-top: 1px solid #f0f0f0; padding-top: 10px;"><strong>Nota:</strong> ${found.info}</p>` : ''}
                <button onclick="window.dictionaryModule.clearCurrent()" style="margin-top: 15px; background: none; border: none; color: var(--accent-color); font-size: 0.8rem; font-weight: 600; cursor: pointer;">Cerrar definición</button>
            </div>
        `;
        window.dictionaryModule = this;
    },

    clearCurrent() {
        document.getElementById('dictionary-search').value = '';
        this.search();
    }
};
