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
    
    // Detection for iOS
    const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
    const isStandalone = window.matchMedia('(display-mode: standalone)').matches || window.navigator.standalone === true;

    console.log('PWA Logic initialized. Platform:', isIOS ? 'iOS' : 'Other', 'Standalone:', isStandalone);

    // Show button on iOS if not already installed
    if (isIOS && !isStandalone) {
        if (installBtn) installBtn.style.display = 'flex';
    }

    // Check if the app is already installed/standalone (for non-iOS)
    if (isStandalone) {
        if (installBtn) installBtn.style.display = 'none';
    }

    window.addEventListener('beforeinstallprompt', (e) => {
        console.log('beforeinstallprompt event fired!');
        e.preventDefault();
        deferredPrompt = e;
        if (installBtn && !isStandalone) {
            installBtn.style.display = 'flex';
        }
    });

    if (installBtn) {
        installBtn.addEventListener('click', async () => {
            if (isIOS) {
                alert('Para instalar NurseBloom en tu iPhone:\n\n1. Pulsa el botón "Compartir" (el icono del cuadrado con una flecha arriba en Safari).\n2. Desliza hacia abajo y selecciona "Añadir a la pantalla de inicio".');
                return;
            }

            if (!deferredPrompt) return;
            deferredPrompt.prompt();
            const { outcome } = await deferredPrompt.userChoice;
            console.log(`User response to the install prompt: ${outcome}`);
            deferredPrompt = null;
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
