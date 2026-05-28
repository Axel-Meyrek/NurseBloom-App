export const mascot = {
    element: document.getElementById('mascot'),
    mouth: document.getElementById('mouth'),
    message: document.getElementById('mascot-message'),

    setHappy() {
        this.mouth.setAttribute('d', 'M 35 65 Q 50 85 65 65');
        this.element.style.transform = 'scale(1.1) rotate(5deg)';
        document.getElementById('eye-left').setAttribute('fill', 'var(--accent-color)');
        document.getElementById('eye-right').setAttribute('fill', 'var(--accent-color)');
        this.message.innerText = "¡Excelente! ¡Sigue así!";
        setTimeout(() => {
            this.element.style.transform = 'scale(1) rotate(0deg)';
            document.getElementById('eye-left').setAttribute('fill', 'white');
            document.getElementById('eye-right').setAttribute('fill', 'white');
        }, 1500);
    },

    setSad() {
        this.mouth.setAttribute('d', 'M 35 75 Q 50 65 65 75');
        this.element.style.transform = 'scale(0.9) translateY(10px)';
        document.getElementById('eye-left').setAttribute('fill', '#999');
        document.getElementById('eye-right').setAttribute('fill', '#999');
        this.message.innerText = "¡Oh no! No te rindas, ¡tú puedes!";
        setTimeout(() => {
            this.element.style.transform = 'scale(1) translateY(0px)';
            document.getElementById('eye-left').setAttribute('fill', 'white');
            document.getElementById('eye-right').setAttribute('fill', 'white');
        }, 1500);
    },

    setThinking() {
        this.mouth.setAttribute('d', 'M 35 70 L 65 70');
        this.message.innerText = "Mmm... déjame pensar...";
    },

    setDefault() {
        this.mouth.setAttribute('d', 'M 35 65 Q 50 75 65 65');
        this.message.innerText = "¿Listo para aprender?";
    }
};
