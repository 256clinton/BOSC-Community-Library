// BOSC Community Library - Dark Mode Toggle
// Handles theme switching with localStorage persistence

class ThemeManager {
  constructor() {
    this.themeKey = 'bosc-theme-preference';
    this.darkThemeClass = 'dark';
    this.toggleButton = null;
    this.currentTheme = 'light';
  }

  // Initialize theme on page load
  init() {
    this.createToggleButton();
    this.loadSavedTheme();
    this.setupEventListeners();
  }

  // Create and insert the toggle button into the header
  createToggleButton() {
    const nav = document.querySelector('nav ul');
    if (!nav) return;

    const li = document.createElement('li');
    li.className = 'theme-toggle-container';
    
    this.toggleButton = document.createElement('button');
    this.toggleButton.className = 'theme-toggle';
    this.toggleButton.setAttribute('aria-label', 'Toggle dark mode');
    this.toggleButton.innerHTML = `
      <span class="toggle-icon">🌙</span>
      <span class="toggle-label">Dark Mode</span>
    `;
    
    li.appendChild(this.toggleButton);
    nav.appendChild(li);
  }

  // Load saved theme preference or check system preference
  loadSavedTheme() {
    const savedTheme = localStorage.getItem(this.themeKey);
    
    if (savedTheme) {
      this.currentTheme = savedTheme;
    } else {
      // Check system preference
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      this.currentTheme = prefersDark ? 'dark' : 'light';
    }
    
    this.applyTheme(this.currentTheme);
  }

  // Apply the theme to the document
  applyTheme(theme) {
    if (theme === 'dark') {
      document.documentElement.setAttribute('data-theme', 'dark');
      this.updateToggleButton('dark');
    } else {
      document.documentElement.removeAttribute('data-theme');
      this.updateToggleButton('light');
    }
  }

  // Update toggle button appearance
  updateToggleButton(theme) {
    if (!this.toggleButton) return;
    
    const icon = this.toggleButton.querySelector('.toggle-icon');
    const label = this.toggleButton.querySelector('.toggle-label');
    
    if (theme === 'dark') {
      icon.textContent = '☀️';
      label.textContent = 'Light Mode';
    } else {
      icon.textContent = '🌙';
      label.textContent = 'Dark Mode';
    }
  }

  // Toggle between themes
  toggleTheme() {
    this.currentTheme = this.currentTheme === 'light' ? 'dark' : 'light';
    this.applyTheme(this.currentTheme);
    localStorage.setItem(this.themeKey, this.currentTheme);
    
    // Announce theme change for accessibility
    this.announceThemeChange();
  }

  // Accessibility: Announce theme change to screen readers
  announceThemeChange() {
    const announcement = document.createElement('div');
    announcement.setAttribute('aria-live', 'polite');
    announcement.setAttribute('aria-atomic', 'true');
    announcement.className = 'sr-only'; // Screen reader only
    announcement.textContent = `Theme changed to ${this.currentTheme} mode`;
    document.body.appendChild(announcement);
    
    setTimeout(() => {
      document.body.removeChild(announcement);
    }, 1000);
  }

  // Setup event listeners
  setupEventListeners() {
    // Toggle button click
    if (this.toggleButton) {
      this.toggleButton.addEventListener('click', () => this.toggleTheme());
    }

    // Listen for system theme changes
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
      // Only auto-switch if user hasn't manually set a preference
      if (!localStorage.getItem(this.themeKey)) {
        this.currentTheme = e.matches ? 'dark' : 'light';
        this.applyTheme(this.currentTheme);
      }
    });
  }
}

// Initialize theme manager when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  const themeManager = new ThemeManager();
  themeManager.init();
});