/**
 * DO MORE MEDIA - Professional Videography Website
 * JavaScript functionality
 */

// ==================== DOM Elements ====================
const navbar = document.getElementById('navbar');
const navToggle = document.getElementById('navToggle');
const navMenu = document.getElementById('navMenu');
const navLinks = document.querySelectorAll('.nav-link');
const projectButtons = document.querySelectorAll('.project-btn');
const brandItems = document.querySelectorAll('.brand-item');
const modalOverlay = document.getElementById('modalOverlay');
const modalCloseButtons = document.querySelectorAll('.modal-close');
const contactForm = document.getElementById('contactForm');
const scrollAnimateElements = document.querySelectorAll('.scroll-animate');

// ==================== Utility Functions ====================

/**
 * Debounce function to limit rate of function execution
 * @param {Function} func - Function to debounce
 * @param {number} wait - Wait time in milliseconds
 * @returns {Function} Debounced function
 */
function debounce(func, wait = 10) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

/**
 * Throttle function to limit function calls
 * @param {Function} func - Function to throttle
 * @param {number} limit - Time limit in milliseconds
 * @returns {Function} Throttled function
 */
function throttle(func, limit = 100) {
    let inThrottle;
    return function executedFunction(...args) {
        if (!inThrottle) {
            func(...args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// ==================== Navigation ====================

/**
 * Handle navbar scroll effect
 */
function handleNavbarScroll() {
    if (window.scrollY > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
}

/**
 * Toggle mobile navigation menu
 */
function toggleMobileMenu() {
    navToggle.classList.toggle('active');
    navMenu.classList.toggle('active');
    document.body.classList.toggle('modal-open');
}

/**
 * Close mobile menu
 */
function closeMobileMenu() {
    navToggle.classList.remove('active');
    navMenu.classList.remove('active');
    document.body.classList.remove('modal-open');
}

/**
 * Update active navigation link based on scroll position
 */
function updateActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const scrollPos = window.scrollY + 200;

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');

        if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });
}

/**
 * Smooth scroll to target section
 * @param {Event} e - Click event
 */
function handleNavLinkClick(e) {
    const href = this.getAttribute('href');

    if (href.startsWith('#')) {
        e.preventDefault();
        const targetSection = document.querySelector(href);

        if (targetSection) {
            const offsetTop = targetSection.offsetTop - 80;

            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }

        // Close mobile menu if open
        closeMobileMenu();
    }
}

// ==================== Modal System ====================

/**
 * Open project modal
 * @param {string} projectId - ID of the project modal to open
 */
function openModal(projectId) {
    const modal = document.getElementById(`modal-${projectId}`);

    if (modal) {
        // Show overlay and modal
        modalOverlay.classList.add('active');
        modal.classList.add('active');

        // Prevent body scroll
        document.body.classList.add('modal-open');

        // Load video iframe (lazy loading)
        const iframe = modal.querySelector('iframe');
        if (iframe && iframe.dataset.src && !iframe.src) {
            iframe.src = iframe.dataset.src;
        }

        // Focus on close button for accessibility
        const closeBtn = modal.querySelector('.modal-close');
        if (closeBtn) {
            closeBtn.focus();
        }
    }
}

/**
 * Close all modals
 */
function closeModal() {
    // Hide overlay
    modalOverlay.classList.remove('active');

    // Hide all modals and stop videos
    document.querySelectorAll('.modal').forEach(modal => {
        modal.classList.remove('active');

        // Stop video playback by clearing iframe src
        const iframe = modal.querySelector('iframe');
        if (iframe && iframe.src) {
            const src = iframe.src;
            iframe.src = '';
            iframe.dataset.src = src;
        }
    });

    // Restore body scroll
    document.body.classList.remove('modal-open');
}

/**
 * Handle click outside modal to close
 * @param {Event} e - Click event
 */
function handleOverlayClick(e) {
    if (e.target === modalOverlay) {
        closeModal();
    }
}

/**
 * Handle escape key to close modal
 * @param {KeyboardEvent} e - Keyboard event
 */
function handleEscapeKey(e) {
    if (e.key === 'Escape' && modalOverlay.classList.contains('active')) {
        closeModal();
    }
}

// ==================== Scroll Animations ====================

/**
 * Initialize Intersection Observer for scroll animations
 */
function initScrollAnimations() {
    const observerOptions = {
        root: null,
        rootMargin: '0px 0px -100px 0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // Optionally unobserve after animation
                // observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    scrollAnimateElements.forEach(element => {
        observer.observe(element);
    });
}

// ==================== Contact Form ====================

/**
 * Handle contact form submission
 * @param {Event} e - Submit event
 */
function handleFormSubmit(e) {
    e.preventDefault();

    // Gather form data
    const formData = {
        firstName: document.getElementById('firstName').value,
        lastName: document.getElementById('lastName').value,
        email: document.getElementById('email').value,
        message: document.getElementById('message').value
    };

    // Log to console (for demo purposes)
    console.log('Form submitted:', formData);

    // Show success feedback
    showFormSuccess();

    // Reset form
    contactForm.reset();
}

/**
 * Show form submission success message
 */
function showFormSuccess() {
    const submitBtn = contactForm.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;

    submitBtn.textContent = 'Message Sent!';
    submitBtn.style.backgroundColor = '#28a745';
    submitBtn.disabled = true;

    setTimeout(() => {
        submitBtn.textContent = originalText;
        submitBtn.style.backgroundColor = '';
        submitBtn.disabled = false;
    }, 3000);
}

// ==================== Lazy Loading ====================

/**
 * Initialize lazy loading for images
 */
function initLazyLoading() {
    const lazyImages = document.querySelectorAll('img[loading="lazy"]');

    if ('loading' in HTMLImageElement.prototype) {
        // Native lazy loading supported
        return;
    }

    // Fallback for browsers without native lazy loading
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src || img.src;
                imageObserver.unobserve(img);
            }
        });
    });

    lazyImages.forEach(img => imageObserver.observe(img));
}

// ==================== Parallax Effect (Optional) ====================

/**
 * Apply subtle parallax effect to hero image
 */
function handleParallax() {
    const heroBackground = document.querySelector('.hero-background img');

    if (heroBackground && window.scrollY < window.innerHeight) {
        const scrolled = window.scrollY;
        heroBackground.style.transform = `translateY(${scrolled * 0.3}px)`;
    }
}

// ==================== Event Listeners ====================

/**
 * Initialize all event listeners
 */
function initEventListeners() {
    // Scroll events (throttled for performance)
    window.addEventListener('scroll', throttle(() => {
        handleNavbarScroll();
        updateActiveNavLink();
        handleParallax();
    }, 50));

    // Mobile menu toggle
    if (navToggle) {
        navToggle.addEventListener('click', toggleMobileMenu);
    }

    // Navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', handleNavLinkClick);
    });

    // Smooth scroll for all anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href !== '#') {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    const offsetTop = target.offsetTop - 80;
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                    closeMobileMenu();
                }
            }
        });
    });

    // Project modal buttons
    projectButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.stopPropagation();
            const projectId = button.dataset.modal;
            openModal(projectId);
        });
    });

    // Also allow clicking on project card to open modal
    document.querySelectorAll('.project-card').forEach(card => {
        card.addEventListener('click', (e) => {
            // Don't trigger if clicking the button directly
            if (!e.target.closest('.project-btn')) {
                const projectId = card.dataset.project;
                openModal(projectId);
            }
        });
    });

    // Brand carousel item clicks
    brandItems.forEach(item => {
        item.addEventListener('click', (e) => {
            e.preventDefault();
            const videoId = item.dataset.video;
            openModal(videoId);
        });
    });

    // Modal close buttons
    modalCloseButtons.forEach(button => {
        button.addEventListener('click', closeModal);
    });

    // Close modal on overlay click
    if (modalOverlay) {
        modalOverlay.addEventListener('click', handleOverlayClick);
    }

    // Close modal on escape key
    document.addEventListener('keydown', handleEscapeKey);

    // Contact form submission
    if (contactForm) {
        contactForm.addEventListener('submit', handleFormSubmit);
    }

    // Resize handler (debounced)
    window.addEventListener('resize', debounce(() => {
        // Close mobile menu on resize to desktop
        if (window.innerWidth > 968) {
            closeMobileMenu();
        }
    }, 250));
}

// ==================== Initialization ====================

/**
 * Initialize all functionality when DOM is ready
 */
function init() {
    // Check initial scroll position for navbar
    handleNavbarScroll();

    // Initialize scroll animations
    initScrollAnimations();

    // Initialize lazy loading
    initLazyLoading();

    // Initialize all event listeners
    initEventListeners();

    console.log('Do More Media website initialized successfully');
}

// Run initialization when DOM is fully loaded
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}

// ==================== Export for testing (optional) ====================
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        debounce,
        throttle,
        openModal,
        closeModal
    };
}
