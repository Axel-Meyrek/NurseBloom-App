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

    // Register Service Worker for PWA
    if ('serviceWorker' in navigator) {
        window.addEventListener('load', () => {
            navigator.serviceWorker.register('./sw.js')
                .then(registration => {
                    console.log('ServiceWorker registration successful with scope: ', registration.scope);
                })
                .catch(err => {
                    console.log('ServiceWorker registration failed: ', err);
                });
        });
    }

    // PWA Installation Logic
    let deferredPrompt;
    const installBtn = document.getElementById('install-button-container');
    console.log('PWA Logic initialized. Install button found:', !!installBtn);

    // Check if the app is already installed/standalone
    if (window.matchMedia('(display-mode: standalone)').matches || window.navigator.standalone === true) {
        console.log('App is running in standalone mode.');
        if (installBtn) installBtn.style.display = 'none';
    }

    window.addEventListener('beforeinstallprompt', (e) => {
        console.log('beforeinstallprompt event fired!');
        // Prevent Chrome 67 and earlier from automatically showing the prompt
        e.preventDefault();
        // Stash the event so it can be triggered later.
        deferredPrompt = e;
        // Update UI notify the user they can add to home screen
        if (installBtn) {
            installBtn.style.display = 'flex';
        }
    });

    if (installBtn) {
        installBtn.addEventListener('click', async () => {
            if (!deferredPrompt) return;
            // Show the prompt
            deferredPrompt.prompt();
            // Wait for the user to respond to the prompt
            const { outcome } = await deferredPrompt.userChoice;
            console.log(`User response to the install prompt: ${outcome}`);
            // We've used the prompt, and can't use it again, throw it away
            deferredPrompt = null;
            // Hide the button
            installBtn.style.display = 'none';
        });
    }

    window.addEventListener('appinstalled', (evt) => {
        console.log('NurseBloom was installed.');
        if (installBtn) {
            installBtn.style.display = 'none';
        }
    });
});
