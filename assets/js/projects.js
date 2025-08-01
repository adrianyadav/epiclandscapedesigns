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
    const prevBtn = document.getElementById('prevImageSide');
    const nextBtn = document.getElementById('nextImageSide');

    prevBtn.addEventListener('click', () => navigateImage('prev'));
    nextBtn.addEventListener('click', () => navigateImage('next'));

    // Load project data from the page
    function loadProjectData() {
        projectItems.forEach(item => {
            const projectSlug = item.dataset.project;
            const projectInfo = JSON.parse(item.dataset.projectInfo);

            console.log('Loading project data for:', projectSlug, projectInfo);

            projectData[projectSlug] = {
                title: projectInfo.title,
                location: projectInfo.location,
                description: projectInfo.description,
                images: projectInfo.images || []
            };
        });

        console.log('All loaded project data:', projectData);
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
        updateThumbnails();

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
        if (!project || !project.images.length) {
            console.log('No project or images found:', project);
            return;
        }

        const modalImage = document.getElementById('modalImage');
        const imageSrc = project.images[currentImageIndex];
        console.log('Setting image src:', imageSrc, 'for project:', project.title);
        modalImage.src = imageSrc;
        modalImage.alt = `${project.title} - Image ${currentImageIndex + 1}`;

        // Add error handling for image loading
        modalImage.onerror = function () {
            console.error('Failed to load image:', imageSrc);
        };
        modalImage.onload = function () {
            console.log('Successfully loaded image:', imageSrc);
        };
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

        const prevBtn = document.getElementById('prevImageSide');
        const nextBtn = document.getElementById('nextImageSide');

        // Hide/show buttons based on position
        if (currentImageIndex === 0) {
            prevBtn.classList.add('hidden');
        } else {
            prevBtn.classList.remove('hidden');
        }

        if (currentImageIndex === project.images.length - 1) {
            nextBtn.classList.add('hidden');
        } else {
            nextBtn.classList.remove('hidden');
        }

        // Also keep the disabled state for accessibility
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
        updateThumbnails();
    }

    // Update thumbnails
    function updateThumbnails() {
        const project = projectData[currentProject];
        if (!project || !project.images.length) return;

        const thumbnailsContainer = document.getElementById('modalThumbnails');
        thumbnailsContainer.innerHTML = '';

        project.images.forEach((imageSrc, index) => {
            const thumbnail = document.createElement('div');
            thumbnail.className = `project-modal__thumbnail ${index === currentImageIndex ? 'active' : ''}`;
            thumbnail.innerHTML = `<img src="${imageSrc}" alt="Thumbnail ${index + 1}">`;

            thumbnail.addEventListener('click', () => {
                currentImageIndex = index;
                updateModalImage();
                updateImageCounter();
                updateNavigationButtons();
                updateThumbnails();
            });

            thumbnailsContainer.appendChild(thumbnail);
        });
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