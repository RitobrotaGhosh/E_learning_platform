document.addEventListener('DOMContentLoaded', () => {

    const mainContent = document.querySelector('main');
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');

    // --- Mobile Menu Toggle ---
    mobileMenuButton.addEventListener('click', () => {
        mobileMenu.classList.toggle('hidden');
    });

    // --- Page Content Store ---
    // Store the HTML for each "page" in an object for easy access.
    const pageContent = {
        index: document.getElementById('index-page').innerHTML,
        course: document.getElementById('course-page').innerHTML,
        dashboard: document.getElementById('dashboard-page').innerHTML,
        about: document.getElementById('about-page').innerHTML // Add the new about page content
    };

    // --- Page Rendering Function ---
    const renderPage = (pageName) => {
        // Set the main content to the HTML of the requested page.
        // Default to the index page if the name is not found.
        mainContent.innerHTML = pageContent[pageName] || pageContent.index;
        window.scrollTo(0, 0); // Scroll to the top of the page after navigation.
    };

    // --- Central Navigation Handler ---
    const handleNavigation = (path) => {
        // Extract the page name (e.g., "dashboard") from the path (e.g., "dashboard.html").
        const pageName = path.split('.')[0];

        // Check if it's a page we manage.
        if (pageContent.hasOwnProperty(pageName)) {
            // Update the browser's history so the URL changes without a page reload.
            window.history.pushState({ page: pageName }, pageName, `${pageName}.html`);
            renderPage(pageName);
        }
    };

    // --- Global Click Listener for Navigation ---
    document.body.addEventListener('click', (e) => {
        // Find the closest 'a' tag to where the user clicked.
        const link = e.target.closest('a');

        if (!link) {
            return; // Exit if the click was not on or inside a link.
        }

        const href = link.getAttribute('href');

        // Check if the link is one of the pages we are handling with JavaScript.
        if (href === 'index.html' || href === 'dashboard.html' || href === 'course.html' || href === 'about.html') {
            e.preventDefault(); // Stop the browser from doing a full page reload.
            handleNavigation(href);
            
            // Hide mobile menu on navigation
            if (!mobileMenu.classList.contains('hidden')) {
                mobileMenu.classList.add('hidden');
            }
        }
    });

    // --- Handle Browser Back/Forward Buttons ---
    window.addEventListener('popstate', (e) => {
        if (e.state && e.state.page) {
            renderPage(e.state.page);
        } else {
            // If there's no state, it's likely the initial page.
            renderPage('index');
        }
    });

    // --- Initial Page Load ---
    // Determine the correct page to show based on the initial URL.
    const initialPath = window.location.pathname.replace('.html', '').substring(1) || 'index';
    renderPage(initialPath);
    // Ensure the history state is correctly set on the first load.
    window.history.replaceState({ page: initialPath }, initialPath, window.location.href);

});
