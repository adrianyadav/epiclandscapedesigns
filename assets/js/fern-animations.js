document.addEventListener('DOMContentLoaded', function () {
    const ferns = document.querySelectorAll('.decoration--fern-bottom-left, .decoration--fern-top-right');
    const nav = document.querySelector('.nav');
    const hamburgerBtn = document.querySelector('.hamburger-btn');

    let isNavVisible = false;
    let animationTriggered = false;

    // Initial fade-in animation
    function animateFernsIn() {
        if (animationTriggered) return;
        animationTriggered = true;

        ferns.forEach((fern, index) => {
            // Set transition first
            fern.style.transition = 'opacity 3s ease-in-out, transform 3s ease-in-out';

            // Force a reflow to ensure transition is applied
            fern.offsetHeight;

            // Now animate to final state
            fern.style.opacity = '0.8';
            fern.style.transform = getFinalTransform(fern);
        });
    }

    // Get initial transform based on fern position
    function getInitialTransform(fern, index) {
        const isTopRight = fern.classList.contains('decoration--fern-top-right');
        const isBottomLeft = fern.classList.contains('decoration--fern-bottom-left');

        if (isTopRight) {
            return 'translate(150px, -150px) scale(0.7)';
        } else if (isBottomLeft) {
            return 'translate(-150px, 150px) scale(0.7)';
        }
        return 'scale(0.7)';
    }

    // Get final transform (current position)
    function getFinalTransform(fern) {
        const isTopRight = fern.classList.contains('decoration--fern-top-right');
        const isBottomLeft = fern.classList.contains('decoration--fern-bottom-left');

        if (isTopRight) {
            return 'translate(0px, 0) scale(1)';
        } else if (isBottomLeft) {
            return 'translate(0, 0) scale(1)';
        }
        return 'scale(1)';
    }

    // Check if navigation is visible
    function checkNavVisibility() {
        const navRect = nav ? nav.getBoundingClientRect() : null;
        const hamburgerRect = hamburgerBtn ? hamburgerBtn.getBoundingClientRect() : null;

        // For desktop: nav is visible when it's in viewport
        // For mobile: hamburger button is visible when it's in viewport
        const isDesktop = window.innerWidth > 900;
        const isVisible = isDesktop ?
            (navRect && navRect.bottom > 0 && navRect.top < window.innerHeight) :
            (hamburgerRect && hamburgerRect.bottom > 0 && hamburgerRect.top < window.innerHeight);

        return isVisible;
    }

    // Handle fern visibility based on nav visibility
    function handleFernVisibility() {
        const navVisible = checkNavVisibility();

        if (navVisible !== isNavVisible) {
            isNavVisible = navVisible;

            ferns.forEach(fern => {
                if (navVisible) {
                    // Show ferns with fade-in
                    fern.style.opacity = '0.8';
                    fern.style.transform = getFinalTransform(fern);
                    fern.style.transition = 'opacity 0.8s ease-in-out, transform 0.8s ease-in-out';
                } else {
                    // Hide ferns with fade-out
                    fern.style.opacity = '0';
                    fern.style.transform = getInitialTransform(fern, 0);
                    fern.style.transition = 'opacity 0.5s ease-in-out, transform 0.5s ease-in-out';
                }
            });
        }
    }

    // Initialize
    function init() {
        // Set initial state for all ferns at once
        ferns.forEach(fern => {
            fern.style.opacity = '0';
            fern.style.transform = getInitialTransform(fern, 0);
            fern.style.transition = 'none'; // No transition for initial state
        });

        // Force a reflow to ensure initial state is applied
        ferns[0]?.offsetHeight;

        // Start initial animation after a short delay
        setTimeout(animateFernsIn, 100);

        // Add scroll listener for nav visibility
        window.addEventListener('scroll', handleFernVisibility);

        // Check initial state
        handleFernVisibility();
    }

    // Initialize when DOM is ready
    init();
}); 