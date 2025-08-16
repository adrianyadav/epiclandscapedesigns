// Simple Theme Loader for Epic Landscapes
// Loads theme settings and applies them to CSS custom properties

document.addEventListener('DOMContentLoaded', function () {
    console.log('Theme loader starting...');
    loadThemeSettings();
    if (window.location.hash === '#contact') {
        window.location.href = '/contact';
    }
});

function loadThemeSettings() {
    console.log('Loading theme settings...');

    // Check if theme data is available from Jekyll
    if (typeof window.themeData !== 'undefined') {
        console.log('Theme data found:', window.themeData);
        applyTheme(window.themeData);
    } else {
        console.log('No theme data found, using defaults');
        // Apply default theme
        applyTheme({
            navigation: {
                nav_bg: "#f1f1f2",
                nav_text_color: "#545454",
                hamburger_icon_color: "#000000",
                close_icon_color: "#000000"
            },
            body: { body_bg: "#f1f1f2" },
            home: { home_bg: "#fff4c9" },
            heading: { heading_color: "#ffae4e" },
            body_text: { body_text_color: "#3b3d41" },
            footer: { footer_bg: "#f1f1f2", footer_text_color: "#545454" },
            homepage: {
                hero_tagline: "Crafting Nature's Masterpieces, One Epic Landscape at a Time",
                logo_desktop: "/assets/img/logo.svg",
                logo_mobile: "/assets/img/logo-mobile.svg",
                logo_alt_text: "Epic Landscape Designs Logo",
                nav_logo: "/assets/img/logo-sm.svg",
                nav_logo_alt_text: "Epic Landscape Designs Logo"
            },
            navigation_menu: {
                link_1: "Home",
                link_2: "Projects",
                link_3: "Process",
                link_4: "Contact"
            },
            contact_info: {
                phone: "0402 263 190",
                email: "info@epiclandscapedesigns.com.au",
                phone_link: "tel:0402263190",
                email_link: "mailto:info@epiclandscapedesigns.com.au"
            }
        });
    }
}

function applyTheme(themeData) {
    console.log('Applying theme:', themeData);
    const root = document.documentElement;

    // Apply navigation color
    if (themeData.navigation && themeData.navigation.nav_bg) {
        root.style.setProperty('--color-nav', themeData.navigation.nav_bg);
        console.log('Navigation color set to:', themeData.navigation.nav_bg);
    }

    // Apply navigation text color
    if (themeData.navigation && themeData.navigation.nav_text_color) {
        root.style.setProperty('--color-nav-text', themeData.navigation.nav_text_color);
        console.log('Navigation text color set to:', themeData.navigation.nav_text_color);
    }

    // Apply hamburger icon color
    if (themeData.navigation && themeData.navigation.hamburger_icon_color) {
        root.style.setProperty('--color-hamburger-icon', themeData.navigation.hamburger_icon_color);
        console.log('Hamburger icon color set to:', themeData.navigation.hamburger_icon_color);
    }

    // Apply close icon color
    if (themeData.navigation && themeData.navigation.close_icon_color) {
        root.style.setProperty('--color-close-icon', themeData.navigation.close_icon_color);
        console.log('Close icon color set to:', themeData.navigation.close_icon_color);
    }

    // Apply body background
    if (themeData.body && themeData.body.body_bg) {
        root.style.setProperty('--color-body', themeData.body.body_bg);
        console.log('Body background set to:', themeData.body.body_bg);
    }

    // Apply home background (only on homepage)
    if (themeData.home && themeData.home.home_bg) {
        const isHomepage = window.location.pathname === '/' ||
            window.location.pathname === '/index.html' ||
            window.location.pathname.endsWith('/');

        if (isHomepage) {
            root.style.setProperty('--color-body', themeData.home.home_bg);
            console.log('Home background set to:', themeData.home.home_bg);
        } else {
            console.log('Not on homepage, using regular body background');
        }
    }

    // Apply heading color
    if (themeData.heading && themeData.heading.heading_color) {
        root.style.setProperty('--color-heading', themeData.heading.heading_color);
        console.log('Heading color set to:', themeData.heading.heading_color);
    }

    // Apply body text color
    if (themeData.body_text && themeData.body_text.body_text_color) {
        root.style.setProperty('--color-body-text', themeData.body_text.body_text_color);
        console.log('Body text color set to:', themeData.body_text.body_text_color);
    }

    // Apply footer background color
    if (themeData.footer && themeData.footer.footer_bg) {
        root.style.setProperty('--color-footer', themeData.footer.footer_bg);
        console.log('Footer background set to:', themeData.footer.footer_bg);
    }

    // Apply footer text color
    if (themeData.footer && themeData.footer.footer_text_color) {
        root.style.setProperty('--color-footer-text', themeData.footer.footer_text_color);
        console.log('Footer text color set to:', themeData.footer.footer_text_color);
    }

    console.log('Theme applied successfully!');
}

// Expose function for external use
window.updateTheme = applyTheme; 