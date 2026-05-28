import { recommendationModule } from './recommendation.js';
import { exerciseModule } from './exercise.js';
import { formulasModule } from './formulas.js';
import { dictionaryModule } from './dictionary.js';
import { medicationsModule } from './medications.js';
import { didYouKnowModule } from './didYouKnow.js';
import { modal } from './modal.js';
import { mascot } from './mascot.js';
import { router } from './router.js';
import { authModule } from './auth.js';

document.addEventListener('DOMContentLoaded', () => {
    // Initialize Auth first
    authModule.init();

    // Expose modules globally for inline onclick handlers
    window.didYouKnowModule = didYouKnowModule;

    window.router = router;

    // Initialize router
    router.init();

    // Initialize modal
    modal.init();

    try {
        // Initialize all modules
        recommendationModule.init();
        exerciseModule.init();
        formulasModule.init();
        dictionaryModule.init();
        medicationsModule.init();
        didYouKnowModule.init();
        
        console.log('Nurse Bloom initialized successfully!');
    } catch (error) {
        console.error('Error during Nurse Bloom initialization:', error);
    }
});
