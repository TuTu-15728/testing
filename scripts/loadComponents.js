// let basePath = window.location.pathname.includes('components') ? '../' : './';
// const basePath = window.location.pathname.includes('pages') ? '../' : './';

async function loadHeader() {
  try {
    const response = await fetch(`components/header.html`);
    if (!response.ok) throw new Error('Header load failed');
    document.body.insertAdjacentHTML('afterbegin', await response.text());
    console.log('Header loaded successfully');
    return true;
  } catch (error) {
    console.error('Header error:', error);
    loadFallbackHeader();
    return false;
  }
}

async function loadFooter() {
  try {
    const response = await fetch(`components/footer.html`);
    if (!response.ok) throw new Error('Footer load failed');
    document.body.insertAdjacentHTML('beforeend', await response.text());
    console.log('Footer loaded successfully');
    
    // Update year
    const yearElement = document.getElementById('current-year');
    if (yearElement) {
      yearElement.textContent = new Date().getFullYear();
    }
  } catch (error) {
    console.error('Footer error:', error);
    loadFallbackFooter();
  }
}

function loadFallbackHeader() {
  document.body.insertAdjacentHTML('afterbegin', `
    <header class="header">
      <button id="menuBtn">
        <span class="menu-icon">☰</span>
        <span class="close-icon" style="display:none">✖</span>
      </button>
      <nav id="mobileNav" class="mobile-nav">
        <a href="#">Home</a>
        <div class="has-submenu">
          <a href="#" class="submenu-toggle">Services ▼</a>
          <div class="submenu">
            <a href="#">Service 1</a>
            <a href="#">Service 2</a>
          </div>
        </div>
      </nav>
    </header>
  `);
}

function loadFallbackFooter() {
  document.body.insertAdjacentHTML('beforeend', `
    <footer>
      <p>© ${new Date().getFullYear()} My Company</p>
    </footer>
  `);
}

async function loadComponents() {
  const headerLoaded = await loadHeader();
  await loadFooter();
  
  if (headerLoaded) {
    const script = document.createElement('script');
    script.src = `scripts/main.js`;
    document.body.appendChild(script);
  }
}

// Start loading when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', loadComponents);
} else {
  loadComponents();
}
