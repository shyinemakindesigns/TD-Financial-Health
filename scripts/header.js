// Mobile navigation toggle
    document.addEventListener('DOMContentLoaded', function() {
    const mobileToggle = document.querySelector('.mobile-menu-toggle');
    const navList = document.querySelector('.primary-nav__list');
    
    if (mobileToggle && navList) {
        mobileToggle.addEventListener('click', function() {
        
        // Toggle active class on button
        this.classList.toggle('active');
        
        // Toggle active class on nav list
        navList.classList.toggle('active');
        });

// Close menu when clicking on a nav link (mobile)
        const navLinks = document.querySelectorAll('.primary-nav__link');
        navLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (window.innerWidth < 760) {
            mobileToggle.classList.remove('active');
            navList.classList.remove('active');
            }
        });
    });

// Close menu when resizing to tablet/desktop
        window.addEventListener('resize', function() {
        if (window.innerWidth >= 760) {
            mobileToggle.classList.remove('active');
            navList.classList.remove('active');
        }
        });

    }

    });