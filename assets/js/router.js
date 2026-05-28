export const router = {
    views: {
        home: document.getElementById('home-view'),
        formulas: document.getElementById('formulas-view'),
        dictionary: document.getElementById('dictionary-view'),
        medications: document.getElementById('medications-view'),
        'medication-detail': document.getElementById('medication-detail-view'),
        'formula-detail': document.getElementById('formula-detail-view')
    },
    navItems: document.querySelectorAll('.nav-item'),

    init() {
        // Prevent default link behavior
        this.navItems.forEach(item => {
            item.addEventListener('click', (e) => e.preventDefault());
        });
    },

    navigate(viewName) {
        // Hide all views
        Object.values(this.views).forEach(view => {
            view.classList.remove('active');
        });

        // Show target view
        if (this.views[viewName]) {
            this.views[viewName].classList.add('active');
            window.scrollTo(0, 0);
        }

        // Update nav active state
        this.navItems.forEach(item => {
            const onclick = item.getAttribute('onclick');
            if (onclick && onclick.includes(`'${viewName}'`)) {
                item.classList.add('active');
            } else {
                item.classList.remove('active');
            }
        });
    }
};
