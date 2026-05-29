import { formulas } from '../../data/formulas.js';
import { router } from './router.js';

export const formulasModule = {
    init() {
        const list = document.getElementById('formulas-list');
        if (!list) return;
        
        list.innerHTML = '';

        formulas.forEach(formula => {
            const item = document.createElement('div');
            item.className = 'list-item';
            item.innerHTML = `
                <div style="display: flex; align-items: center; gap: 12px;">
                    <div style="background: rgba(32, 201, 151, 0.1); width: 40px; height: 40px; border-radius: 10px; display: flex; align-items: center; justify-content: center;">
                        <i class="fas fa-calculator" style="color: var(--accent-color); font-size: 0.9rem;"></i>
                    </div>
                    <span style="font-weight: 600; color: var(--primary-color);">${formula.name}</span>
                </div>
                <i class="fas fa-chevron-right" style="font-size: 0.8rem; opacity: 0.3;"></i>
            `;
            item.onclick = () => this.showDetails(formula);
            list.appendChild(item);
        });
    },

    showDetails(formula) {
        const content = document.getElementById('formula-detail-content');
        if (!content) return;

        let classificationHtml = '';
        if (formula.classification) {
            classificationHtml = `
                <div class="card" style="background: #f8fafc; border: 1px solid #e2e8f0;">
                    <h4 style="font-size: 0.8rem; text-transform: uppercase; color: var(--text-muted); margin-bottom: 15px; display: flex; align-items: center; gap: 8px;">
                        <i class="fas fa-table" style="color: var(--accent-color);"></i> Clasificación y Valores
                    </h4>
                    <div style="display: flex; flex-direction: column; gap: 10px;">
                        ${formula.classification.map(c => `
                            <div style="display: flex; justify-content: space-between; padding: 10px; background: white; border-radius: 8px; font-size: 0.9rem;">
                                <span style="font-weight: 600;">${c.label}</span>
                                <span style="color: var(--accent-color); font-weight: 700;">${c.range}</span>
                            </div>
                        `).join('')}
                    </div>
                </div>
            `;
        }

        let formulaHtml = '';
        if (formula.formula) {
            formulaHtml = `
                <div style="margin-bottom: 25px;">
                    <h4 style="font-size: 0.8rem; text-transform: uppercase; color: var(--text-muted); margin-bottom: 10px;">Fórmula Matemática</h4>
                    <div style="background: #1a1c1e; color: #20c997; padding: 20px; border-radius: 12px; font-family: 'Courier New', Courier, monospace; font-size: 1.1rem; font-weight: 700; text-align: center; border: 1px solid #333; box-shadow: inset 0 2px 10px rgba(0,0,0,0.3);">
                        ${formula.formula}
                    </div>
                </div>
            `;
        }

        content.innerHTML = `
            <div class="card" style="border-top: 4px solid var(--accent-color);">
                <div style="margin-bottom: 25px;">
                    <h1 style="font-size: 1.8rem; color: var(--primary-color); line-height: 1.2;">${formula.name}</h1>
                </div>
                
                <div style="margin-bottom: 25px;">
                    <h4 style="font-size: 0.8rem; text-transform: uppercase; color: var(--text-muted); margin-bottom: 10px;">Procedimiento</h4>
                    <p style="font-size: 1rem; color: #444; line-height: 1.6; background: #f1f3f5; padding: 15px; border-radius: 12px; border-left: 4px solid var(--primary-color);">
                        ${formula.description}
                    </p>
                </div>

                ${formulaHtml}

                ${classificationHtml}

                <div style="margin-top: 30px;">
                    <h4 style="font-size: 0.8rem; text-transform: uppercase; color: var(--text-muted); margin-bottom: 15px;">Casos Prácticos</h4>
                    <div style="display: flex; flex-direction: column; gap: 15px;">
                        ${formula.exercises.map((e, index) => `
                            <div style="padding: 18px; background: white; border: 1px solid #edf2f7; border-radius: 12px; position: relative; overflow: hidden;">
                                <div style="position: absolute; top: 0; left: 0; bottom: 0; width: 4px; background: var(--accent-color); opacity: 0.3;"></div>
                                <span style="font-size: 0.7rem; font-weight: 800; color: #cbd5e0; position: absolute; right: 15px; top: 15px;">EJERCICIO ${index + 1}</span>
                                <p style="font-size: 0.95rem; font-weight: 500; color: var(--primary-color); margin-bottom: 12px; padding-right: 60px;">${e.question}</p>
                                <div style="display: flex; align-items: center; gap: 8px; color: var(--success-color); font-weight: 700; font-size: 1rem;">
                                    <i class="fas fa-check-double"></i>
                                    <span>Resultado: ${e.correct}</span>
                                </div>
                            </div>
                        `).join('')}
                    </div>
                </div>
            </div>

            <div style="text-align: center; padding: 20px; opacity: 0.6;">
                <p style="font-size: 0.8rem; color: var(--text-muted);">
                    <i class="fas fa-info-circle"></i> Estas fórmulas son herramientas de apoyo. Verifica siempre con los protocolos vigentes.
                </p>
            </div>
        `;

        router.navigate('formula-detail');
    }
};
