export const authModule = {
    users: [],
    currentUser: null,

    init() {
        this.loadUsers();
        this.checkSession();

        const loginForm = document.getElementById('form-login');
        const registerForm = document.getElementById('form-register');

        if (loginForm) {
            loginForm.onsubmit = (e) => {
                e.preventDefault();
                this.login();
            };
        }

        if (registerForm) {
            registerForm.onsubmit = (e) => {
                e.preventDefault();
                this.register();
            };
        }
        
        // Expose to window for inline onclick toggle
        window.authModule = this;
    },

    loadUsers() {
        const saved = localStorage.getItem('nursebloom_users');
        if (saved) this.users = JSON.parse(saved);
    },

    checkSession() {
        const session = localStorage.getItem('nursebloom_session');
        if (session) {
            this.currentUser = JSON.parse(session);
            this.showApp();
        }
    },

    toggleForm(form) {
        const loginForm = document.getElementById('login-form');
        const registerForm = document.getElementById('register-form');
        const errorDiv = document.getElementById('auth-error');
        
        errorDiv.innerText = '';
        if (form === 'login') {
            loginForm.style.display = 'block';
            registerForm.style.display = 'none';
        } else {
            loginForm.style.display = 'none';
            registerForm.style.display = 'block';
        }
    },

    register() {
        const name = document.getElementById('reg-name').value.trim();
        const email = document.getElementById('reg-email').value.trim();
        const password = document.getElementById('reg-password').value.trim();
        const errorDiv = document.getElementById('auth-error');

        if (!name || !email || !password) {
            errorDiv.innerText = 'Por favor, completa todos los campos.';
            return;
        }

        if (this.users.find(u => u.email === email)) {
            errorDiv.innerText = 'Este correo ya está registrado.';
            return;
        }

        const newUser = { name, email, password };
        this.users.push(newUser);
        localStorage.setItem('nursebloom_users', JSON.stringify(this.users));

        errorDiv.style.color = 'var(--success-color)';
        errorDiv.innerText = '¡Registro exitoso! Ya puedes iniciar sesión.';
        
        setTimeout(() => {
            errorDiv.style.color = 'var(--error-color)';
            this.toggleForm('login');
        }, 2000);
    },

    login() {
        const email = document.getElementById('login-email').value.trim();
        const password = document.getElementById('login-password').value.trim();
        const errorDiv = document.getElementById('auth-error');

        const user = this.users.find(u => u.email === email && u.password === password);

        if (user) {
            this.currentUser = user;
            localStorage.setItem('nursebloom_session', JSON.stringify(user));
            this.showApp();
        } else {
            errorDiv.innerText = 'Correo o contraseña incorrectos.';
        }
    },

    showApp() {
        document.getElementById('auth-view').style.display = 'none';
        document.getElementById('app-content').style.display = 'block';
        
        // Update user name in header
        const userBrand = document.querySelector('.top-header .brand');
        if (userBrand) {
            userBrand.innerHTML = `Hola, <span>${this.currentUser.name.split(' ')[0]}</span>`;
        }

        // Import and re-initialize exercise module for this specific user
        import('./exercise.js').then(module => {
            module.exerciseModule.init();
        });
    },

    logout() {
        localStorage.removeItem('nursebloom_session');
        window.location.reload();
    }
};
