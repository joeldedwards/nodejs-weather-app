function onWindowLoad() {
    const preloaderWrapper = document.querySelector('.preloader-wrapper');
    if (preloaderWrapper) {
        preloaderWrapper.classList.add('loaded');

        if (preloaderWrapper.classList.contains('loaded')) {
        const preloaderMain = document.querySelector('.preloader-main');
        if (preloaderMain) {
            setTimeout(() => {
            preloaderMain.remove();
            }, 1200);
        }
        }
    }
}

if (document.readyState === 'complete') {
    onWindowLoad();
} else {
    window.addEventListener('load', onWindowLoad);
}