// Projects Page JavaScript

document.addEventListener('DOMContentLoaded', function () {
    const modal = document.getElementById('projectModal');
    const modalClose = document.getElementById('modalClose');
    const modalOverlay = document.querySelector('.project-modal__overlay');
    const projectItems = document.querySelectorAll('.project-item');

    let currentProject = null;
    let currentImageIndex = 0;
    let projectData = {};

    // Load project data
    loadProjectData();

    // Event listeners for project items
    projectItems.forEach(item => {
        item.addEventListener('click', function () {
            const projectSlug = this.dataset.project;
            openProjectModal(projectSlug);
        });
    });

    // Event listeners for modal
    modalClose.addEventListener('click', closeModal);
    modalOverlay.addEventListener('click', closeModal);

    // Keyboard navigation
    document.addEventListener('keydown', function (e) {
        if (modal.classList.contains('active')) {
            if (e.key === 'Escape') {
                closeModal();
            } else if (e.key === 'ArrowLeft') {
                navigateImage('prev');
            } else if (e.key === 'ArrowRight') {
                navigateImage('next');
            }
        }
    });

    // Image navigation
    const prevBtn = document.getElementById('prevImage');
    const nextBtn = document.getElementById('nextImage');

    prevBtn.addEventListener('click', () => navigateImage('prev'));
    nextBtn.addEventListener('click', () => navigateImage('next'));

    // Load project data from the page
    function loadProjectData() {
        projectItems.forEach(item => {
            const projectSlug = item.dataset.project;
            const title = item.querySelector('.project-item__title').textContent;
            const image = item.querySelector('.project-item__image');

            projectData[projectSlug] = {
                title: title,
                location: getLocationFromTitle(title),
                description: getDescriptionFromTitle(title),
                images: image ? [image.src] : []
            };
        });
    }

    // Helper function to get location from title
    function getLocationFromTitle(title) {
        const locations = {
            'ryde': 'Ryde',
            'castle hill': 'Castle Hill',
            'parramatta': 'Parramatta',
            'lane cove': 'Lane Cove',
            'oatlands': 'Oatlands'
        };
        return locations[title.toLowerCase()] || title;
    }

    // Helper function to get description from title
    function getDescriptionFromTitle(title) {
        const descriptions = {
            'ryde': 'Outdoor kitchen and bar area with pergola and seating',
            'castle hill': 'Outdoor kitchen and bar setup with stepping stones in a garden',
            'parramatta': 'Modern exterior with large windows and minimalist front garden',
            'lane cove': 'Sunken outdoor lounge area with fire pit and white built-in seating',
            'oatlands': 'Desert-style garden featuring various cacti and succulents around a circular fire pit'
        };
        return descriptions[title.toLowerCase()] || 'A beautiful landscape design project.';
    }

    // Open project modal
    function openProjectModal(projectSlug) {
        const project = projectData[projectSlug];
        if (!project) return;

        currentProject = projectSlug;
        currentImageIndex = 0;

        // Update modal content
        document.getElementById('modalTitle').textContent = project.title;
        document.getElementById('modalLocation').textContent = project.location;
        document.getElementById('modalDescription').textContent = project.description;

        updateModalImage();
        updateImageCounter();
        updateNavigationButtons();

        // Show modal
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    // Close modal
    function closeModal() {
        modal.classList.remove('active');
        document.body.style.overflow = '';
        currentProject = null;
        currentImageIndex = 0;
    }

    // Update modal image
    function updateModalImage() {
        const project = projectData[currentProject];
        if (!project || !project.images.length) return;

        const modalImage = document.getElementById('modalImage');
        modalImage.src = project.images[currentImageIndex];
        modalImage.alt = `${project.title} - Image ${currentImageIndex + 1}`;
    }

    // Update image counter
    function updateImageCounter() {
        const project = projectData[currentProject];
        if (!project) return;

        document.getElementById('currentImageIndex').textContent = currentImageIndex + 1;
        document.getElementById('totalImages').textContent = project.images.length;
    }

    // Update navigation buttons
    function updateNavigationButtons() {
        const project = projectData[currentProject];
        if (!project) return;

        const prevBtn = document.getElementById('prevImage');
        const nextBtn = document.getElementById('nextImage');

        prevBtn.disabled = currentImageIndex === 0;
        nextBtn.disabled = currentImageIndex === project.images.length - 1;
    }

    // Navigate images
    function navigateImage(direction) {
        const project = projectData[currentProject];
        if (!project || !project.images.length) return;

        if (direction === 'prev' && currentImageIndex > 0) {
            currentImageIndex--;
        } else if (direction === 'next' && currentImageIndex < project.images.length - 1) {
            currentImageIndex++;
        }

        updateModalImage();
        updateImageCounter();
        updateNavigationButtons();
    }

    // Touch/swipe support for mobile
    let touchStartX = 0;
    let touchEndX = 0;

    modal.addEventListener('touchstart', function (e) {
        touchStartX = e.changedTouches[0].screenX;
    });

    modal.addEventListener('touchend', function (e) {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    });

    function handleSwipe() {
        const swipeThreshold = 50;
        const diff = touchStartX - touchEndX;

        if (Math.abs(diff) > swipeThreshold) {
            if (diff > 0) {
                // Swipe left - next image
                navigateImage('next');
            } else {
                // Swipe right - previous image
                navigateImage('prev');
            }
        }
    }
}); 