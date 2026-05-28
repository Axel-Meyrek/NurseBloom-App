import { didYouKnow } from '../../data/didYouKnow.js';

export const didYouKnowModule = {
    init() {
        this.getRandomFact();
    },

    getRandomFact() {
        const textElement = document.getElementById('fact-text');
        const randomIndex = Math.floor(Math.random() * didYouKnow.length);
        
        // Add a small animation effect when changing
        textElement.style.opacity = '0';
        setTimeout(() => {
            textElement.innerText = didYouKnow[randomIndex];
            textElement.style.opacity = '1';
        }, 200);
    }
};
