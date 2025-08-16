document.addEventListener('DOMContentLoaded', function () {
    const ferns = document.querySelectorAll('.decoration--fern-bottom-left, .decoration--fern-top-right');
    const nav = document.querySelector('.nav');
    const hamburgerBtn = document.querySelector('.hamburger-btn');

    let isNavVisible = false;
    let animationTriggered = false;
    let scrollTimeout = null;

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
        const isMobile = window.innerWidth <= 900;

        if (isTopRight) {
            if (isMobile) {
                return 'translate(100px, -50px) scale(0.7)';
            }
            return 'translate(150px, -150px) scale(0.7)';
        } else if (isBottomLeft) {
            if (isMobile) {
                return 'translate(-50px, 50px) scale(0.7)';
            }
            return 'translate(-150px, 150px) scale(0.7)';
        }
        return 'scale(0.7)';
    }

    // Get final transform (current position)
    function getFinalTransform(fern) {
        const isTopRight = fern.classList.contains('decoration--fern-top-right');
        const isBottomLeft = fern.classList.contains('decoration--fern-bottom-left');
        const isMobile = window.innerWidth <= 900;

        if (isTopRight) {
            if (isMobile) {
                return 'translate(0px, 0px) scale(1)';
            }
            return 'translate(0px, 0) scale(1)';
        } else if (isBottomLeft) {
            if (isMobile) {
                return 'translate(0px, 0px) scale(1)';
            }
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
        let isVisible = false;

        if (isDesktop) {
            isVisible = navRect && navRect.bottom > 0 && navRect.top < window.innerHeight;
        } else {
            // On mobile, check if hamburger button is visible or if we're near the top
            const hamburgerVisible = hamburgerRect && hamburgerRect.bottom > 0 && hamburgerRect.top < window.innerHeight;
            const nearTop = window.scrollY < 100;
            isVisible = hamburgerVisible || nearTop;

            console.log('Mobile check:', { hamburgerVisible, nearTop, scrollY: window.scrollY, isVisible });
        }

        return isVisible;
    }

    // Handle fern visibility based on scroll position
    function handleFernVisibility() {
        const isDesktop = window.innerWidth > 900;

        if (isDesktop) {
            // Desktop: Show/hide based on nav visibility
            const navVisible = checkNavVisibility();

            if (navVisible !== isNavVisible) {
                isNavVisible = navVisible;
                console.log('Desktop nav visibility changed:', navVisible);

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
        } else {
            // Mobile: Continuous fade based on scroll position
            const scrollY = window.scrollY;
            const windowHeight = window.innerHeight;

            // Calculate fade intensity based on scroll position
            // Fade in when near top, fade out when scrolling down
            let fadeIntensity = 0;

            if (scrollY < 50) {
                // Very near top: fully visible
                fadeIntensity = 0.8;
            } else if (scrollY < 200) {
                // Fading out as we scroll down (smoother transition)
                fadeIntensity = 0.8 - ((scrollY - 50) / 150) * 0.8;
            } else {
                // Scrolled down: fully hidden
                fadeIntensity = 0;
            }

            // Add some hysteresis to prevent flickering
            ferns.forEach(fern => {
                const currentOpacity = parseFloat(fern.style.opacity) || 0;
                const targetOpacity = fadeIntensity;

                // Only update if opacity actually changed significantly
                if (Math.abs(currentOpacity - targetOpacity) > 0.02) {
                    fern.style.opacity = targetOpacity;

                    if (targetOpacity > 0.1) {
                        // Show ferns with smooth transition
                        fern.style.transform = getFinalTransform(fern);
                        fern.style.transition = 'opacity 0.2s ease-out, transform 0.2s ease-out';
                    } else {
                        // Hide ferns with quick transition
                        fern.style.transform = getInitialTransform(fern, 0);
                        fern.style.transition = 'opacity 0.15s ease-in, transform 0.15s ease-in';
                    }

                    // Debug logging (only log significant changes)
                    if (Math.abs(currentOpacity - targetOpacity) > 0.1) {
                        console.log('Mobile fern opacity changed:', {
                            from: currentOpacity.toFixed(2),
                            to: targetOpacity.toFixed(2),
                            scrollY
                        });
                    }
                }
            });
        }
    }

    // Initialize
    function init() {
        console.log('Initializing fern animations... Found ferns:', ferns.length);

        if (ferns.length === 0) {
            console.warn('No ferns found for animation');
            return;
        }

        const isDesktop = window.innerWidth > 900;

        // Set initial state for all ferns at once
        ferns.forEach((fern, index) => {
            const initialTransform = getInitialTransform(fern, index);

            if (isDesktop) {
                // Desktop: start hidden
                fern.style.opacity = '0';
                fern.style.transform = initialTransform;
            } else {
                // Mobile: start visible if near top
                const scrollY = window.scrollY;
                if (scrollY < 100) {
                    fern.style.opacity = '0.8';
                    fern.style.transform = getFinalTransform(fern);
                } else {
                    fern.style.opacity = '0';
                    fern.style.transform = initialTransform;
                }
            }

            fern.style.transition = 'none'; // No transition for initial state
            console.log(`Fern ${index + 1} initial state:`, initialTransform, 'Opacity:', fern.style.opacity);
        });

        // Force a reflow to ensure initial state is applied
        ferns[0]?.offsetHeight;

        // Start initial animation after a short delay
        setTimeout(animateFernsIn, 200);

        // Add scroll listener for nav visibility
        window.addEventListener('scroll', handleScrollThrottled);

        // Add resize listener for responsive behavior
        window.addEventListener('resize', handleResize);

        // Check initial state
        handleFernVisibility();
    }

    // Throttled scroll handler for better performance
    function handleScrollThrottled() {
        if (scrollTimeout) return;

        scrollTimeout = setTimeout(() => {
            handleFernVisibility();
            scrollTimeout = null;
        }, 16); // ~60fps
    }

    // Handle resize events
    function handleResize() {
        // Recalculate fern positions when screen size changes
        ferns.forEach(fern => {
            const currentOpacity = fern.style.opacity;
            const isVisible = currentOpacity === '0.8' || currentOpacity === '1';

            if (isVisible) {
                // Update to new final position
                fern.style.transform = getFinalTransform(fern);
            } else {
                // Update to new initial position
                fern.style.transform = getInitialTransform(fern, 0);
            }
        });
    }

    // Initialize when DOM is ready
    init();
}); 