const butInstall = document.getElementById('buttonInstall');

// Logic for installing the PWA
// Add event handler to the `beforeinstallprompt` event
window.addEventListener('beforeinstallprompt', (event) => {
    console.log('beforeinstallprompt fired');
    
    window.deferredPrompt = event;
    butInstall.classList.toggle('hidden', false);
});

// TODO: fix click event not working
butInstall.addEventListener('click', async (event) => {
    console.log('click!');
    const promptEvent = window.deferredPrompt;

    if (!promptEvent) {
        return;
    }

    promptEvent.prompt();
    window.deferredPrompt = null;

    butInstall.classList.toggle('hidden', true);
});


// 'Handle appinstalled event'
window.addEventListener('appinstalled', (event) => {
    window.deferredPrompt = null;
});
