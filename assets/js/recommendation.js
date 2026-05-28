import { recommendations } from '../../data/recommendations.js';

export const recommendationModule = {
    init() {
        const textElement = document.getElementById('recommendation-text');
        // Simple daily hash based on date to get the same recommendation for everyone today
        const today = new Date().toDateString();
        let hash = 0;
        for (let i = 0; i < today.length; i++) {
            hash = today.charCodeAt(i) + ((hash << 5) - hash);
        }
        const index = Math.abs(hash % recommendations.length);
        textElement.innerText = recommendations[index];
    }
};
