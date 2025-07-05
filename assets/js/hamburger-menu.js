document.addEventListener('DOMContentLoaded', function () {
    const hamburgerBtn = document.querySelector('.hamburger-btn');
    const overlay = document.getElementById('hamburger-menu-overlay');
    const closeBtn = document.querySelector('.hamburger-close');
    const body = document.body;

    function openMenu() {
        overlay.classList.add('open');
        overlay.setAttribute('aria-hidden', 'false');
        hamburgerBtn.setAttribute('aria-expanded', 'true');
        body.style.overflow = 'hidden';
    }

    function closeMenu() {
        overlay.classList.remove('open');
        overlay.setAttribute('aria-hidden', 'true');
        hamburgerBtn.setAttribute('aria-expanded', 'false');
        body.style.overflow = '';
    }

    hamburgerBtn.addEventListener('click', openMenu);
    closeBtn.addEventListener('click', closeMenu);

    // Close on ESC
    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape' && overlay.classList.contains('open')) {
            closeMenu();
        }
    });

    // Close when clicking outside menu content
    overlay.addEventListener('click', function (e) {
        if (e.target === overlay) {
            closeMenu();
        }
    });
}); 