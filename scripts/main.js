function setupMobileMenu() {
    const menuBtn = document.getElementById('menuBtn');
    const mobileNav = document.getElementById('mobileNav');

    if (!menuBtn || !mobileNav) {
        console.error('Mobile menu elements not found');
        return;
    }

    const menuIcon = menuBtn.querySelector('.menu-icon');
    const closeIcon = menuBtn.querySelector('.close-icon');

    function toggleMenu() {
        const isOpen = mobileNav.classList.toggle('open');
        menuIcon.style.display = isOpen ? 'none' : 'block';
        closeIcon.style.display = isOpen ? 'block' : 'none';
        document.body.style.overflow = isOpen ? 'hidden' : '';
    }

    // Submenu toggle
    document.querySelectorAll('.has-submenu > .submenu-toggle').forEach(toggle => {
        toggle.addEventListener('click', function (e) {
            // Only prevent default and toggle on mobile
            if (window.innerWidth < 769) {
                e.preventDefault();
                this.nextElementSibling.classList.toggle('show');
            }
        });
    });

    // Close when clicking outside
    document.addEventListener('click', (e) => {
        if (!e.target.closest('.header') && mobileNav.classList.contains('open')) {
            toggleMenu();
        }
    });

    // Close on Escape
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && mobileNav.classList.contains('open')) {
            toggleMenu();
        }
    });

    menuBtn.addEventListener('click', toggleMenu);
    console.log('Mobile menu setup complete');


    document.querySelectorAll('#mobileNav a:not(.submenu-toggle)').forEach(link => {
        link.addEventListener('click', () => {
          if (window.innerWidth < 769 && mobileNav.classList.contains('open')) {
            toggleMenu();
          }
        });
      });
}

// Initialize
setupMobileMenu();

function setActivePage() {
    // Get current page filename
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    
    document.querySelectorAll('.nav-link').forEach(link => {
        // Get the linked page filename
        const linkPage = link.getAttribute('href').split('/').pop();
        
        // Check if current page matches link
        if (currentPage === linkPage) {
            link.classList.add('active');
            
            // Also highlight parent menu item for subpages
            const parentItem = link.closest('.has-submenu');
            if (parentItem) {
                parentItem.querySelector('.submenu-toggle').classList.add('active');
            }
        }
    });
}

// Call this after mobile menu setup
setupMobileMenu();
setActivePage();
