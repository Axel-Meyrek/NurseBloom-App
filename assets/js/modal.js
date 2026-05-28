export const modal = {
    modalEl: document.getElementById('details-modal'),
    bodyEl: document.getElementById('modal-body'),

    init() {
        const closeBtn = document.querySelector('.close-btn');
        if (closeBtn) {
            closeBtn.onclick = () => this.close();
        }
        window.onclick = (event) => {
            if (event.target == this.modalEl) this.close();
        };
    },

    show(contentHtml) {
        this.bodyEl.innerHTML = contentHtml;
        this.modalEl.style.display = 'flex';
        document.body.style.overflow = 'hidden';
    },

    close() {
        this.modalEl.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
};
