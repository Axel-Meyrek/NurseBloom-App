import { formulas } from '../../data/formulas.js';

export const exerciseModule = {
    currentExercise: null,
    attempts: 3,
    streak: 0,
    isCompletedToday: false,
    userEmail: null,

    init() {
        const session = localStorage.getItem('nursebloom_session');
        if (!session) return;
        
        const user = JSON.parse(session);
        this.userEmail = user.email;

        this.loadData();
        this.checkDailyStatus();
        this.updateHeaderStreak();
        
        if (!this.isCompletedToday) {
            this.newExercise();
        } else {
            this.showCompletedState();
        }
    },

    loadData() {
        const streakKey = `nursebloom_${this.userEmail}_streak`;
        const dateKey = `nursebloom_${this.userEmail}_last_date`;

        const savedStreak = localStorage.getItem(streakKey);
        if (savedStreak) this.streak = parseInt(savedStreak);

        const lastDate = localStorage.getItem(dateKey);
        const today = new Date().toDateString();
        
        // Check if user missed a day to reset streak
        if (lastDate) {
            const lastDateObj = new Date(lastDate);
            const todayObj = new Date(today);
            const diffTime = Math.abs(todayObj - lastDateObj);
            const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
            
            if (diffDays > 1) {
                this.streak = 0;
                localStorage.setItem(streakKey, 0);
            }
        }
    },

    checkDailyStatus() {
        const today = new Date().toDateString();
        const dateKey = `nursebloom_${this.userEmail}_last_date`;
        const lastDate = localStorage.getItem(dateKey);
        if (lastDate === today) {
            this.isCompletedToday = true;
        } else {
            this.isCompletedToday = false;
        }
    },

    saveCompletion() {
        const today = new Date().toDateString();
        const streakKey = `nursebloom_${this.userEmail}_streak`;
        const dateKey = `nursebloom_${this.userEmail}_last_date`;

        localStorage.setItem(dateKey, today);
        localStorage.setItem(streakKey, this.streak);
        this.isCompletedToday = true;
        this.updateHeaderStreak();
    },

    updateHeaderStreak() {
        const streakEl = document.getElementById('streak-count');
        if (streakEl) streakEl.innerText = this.streak;
    },

    newExercise() {
        this.attempts = 3;
        const allExercises = formulas.flatMap(f => f.exercises);
        const randomIndex = Math.floor(Math.random() * allExercises.length);
        this.currentExercise = allExercises[randomIndex];
        this.updateUI();
    },

    updateUI() {
        const questionEl = document.getElementById('exercise-question');
        const optionsGrid = document.getElementById('exercise-options');
        const feedbackEl = document.getElementById('exercise-feedback');
        const attemptsEl = document.getElementById('exercise-attempts');
        const streakEl = document.getElementById('exercise-streak');

        if (!this.currentExercise) return;

        questionEl.innerText = this.currentExercise.question;
        optionsGrid.innerHTML = '';
        
        this.currentExercise.options.forEach(option => {
            const btn = document.createElement('button');
            btn.className = 'option-btn';
            btn.innerText = option;
            btn.onclick = () => this.checkAnswer(option, btn);
            optionsGrid.appendChild(btn);
        });

        attemptsEl.innerText = `Intentos: ${this.attempts}/3`;
        feedbackEl.innerText = '';
    },

    showCompletedState() {
        const questionEl = document.getElementById('exercise-question');
        const optionsGrid = document.getElementById('exercise-options');
        const feedbackEl = document.getElementById('exercise-feedback');
        const attemptsEl = document.getElementById('exercise-attempts');

        questionEl.innerHTML = `<div style="text-align: center; padding: 20px;">
            <i class="fas fa-check-circle" style="font-size: 3rem; color: var(--accent-color); margin-bottom: 15px;"></i>
            <h3>¡Reto completado!</h3>
            <p style="color: #666; margin-top: 10px;">Has terminado tu ejercicio de hoy. Vuelve mañana para seguir aumentando tu racha.</p>
        </div>`;
        optionsGrid.innerHTML = '';
        feedbackEl.innerText = '';
        attemptsEl.style.display = 'none';
    },

    checkAnswer(selected, btn) {
        if (this.isCompletedToday) return;

        if (selected === this.currentExercise.correct) {
            btn.classList.add('correct');
            this.streak++;
            document.getElementById('exercise-feedback').innerText = "¡Excelente! Has acertado.";
            this.disableOptions();
            this.saveCompletion();
            setTimeout(() => this.showCompletedState(), 2000);
        } else {
            btn.classList.add('incorrect');
            btn.disabled = true;
            this.attempts--;
            
            if (this.attempts === 0) {
                this.streak = 0;
                document.getElementById('exercise-feedback').innerText = `No te rindas. La respuesta era: ${this.currentExercise.correct}`;
                this.disableOptions();
                this.saveCompletion();
                setTimeout(() => this.showCompletedState(), 3000);
            }
        }
        document.getElementById('exercise-attempts').innerText = `Intentos: ${this.attempts}/3`;
    },

    disableOptions() {
        const btns = document.querySelectorAll('.option-btn');
        btns.forEach(b => b.disabled = true);
    }
};
