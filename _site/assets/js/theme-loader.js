// Simple Theme Loader for Epic Landscapes
// Loads theme settings and applies them to CSS custom properties

document.addEventListener('DOMContentLoaded', function () {
    console.log('Theme loader starting...');
    loadThemeSettings();
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
            navigation: { nav_bg: "#f1f1f2" },
            body: { body_bg: "#f1f1f2" },
            home: { home_bg: "#fff4c9" }
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

    console.log('Theme applied successfully!');
}

// Expose function for external use
window.updateTheme = applyTheme; 