/* ═══════════════════════════════════════════
   NATURE'S NEST — SHARED JS (All Pages)
═══════════════════════════════════════════ */

(function() {
'use strict';

/* ── DUAL THEME CONTROLLER ── */
var themes = ['default', 'fruits', 'vegetables'];
var themeLabels = {
  'default': '<i class="fa-solid fa-leaf"></i> Nature Blend',
  'fruits': '<i class="fa-solid fa-apple-whole"></i> Fruits Theme',
  'vegetables': '<i class="fa-solid fa-carrot"></i> Veg Theme'
};

var savedTheme = localStorage.getItem('nature_nest_theme') || 'default';
applyTheme(savedTheme);

function applyTheme(themeName) {
  document.body.classList.remove('theme-fruits', 'theme-vegetables');
  if (themeName === 'fruits') {
    document.body.classList.add('theme-fruits');
  } else if (themeName === 'vegetables') {
    document.body.classList.add('theme-vegetables');
  }
  localStorage.setItem('nature_nest_theme', themeName);

  var btn = document.getElementById('theme-toggle-btn');
  if (btn) {
    btn.innerHTML = themeLabels[themeName] || themeLabels['default'];
  }
}

function cycleTheme() {
  var current = localStorage.getItem('nature_nest_theme') || 'default';
  var idx = themes.indexOf(current);
  var nextTheme = themes[(idx + 1) % themes.length];
  applyTheme(nextTheme);
}

/* ── LIGHT & DARK MODE CONTROLLER ── */
var isDarkMode = localStorage.getItem('nature_nest_dark_mode') === 'true';
applyDarkMode(isDarkMode);

function applyDarkMode(enableDark) {
  if (enableDark) {
    document.body.classList.add('theme-dark');
  } else {
    document.body.classList.remove('theme-dark');
  }
  localStorage.setItem('nature_nest_dark_mode', enableDark ? 'true' : 'false');

  var darkBtn = document.getElementById('dark-mode-toggle-btn');
  if (darkBtn) {
    darkBtn.innerHTML = enableDark
      ? '<i class="fa-solid fa-sun"></i> Light Mode'
      : '<i class="fa-solid fa-moon"></i> Dark Mode';
    darkBtn.setAttribute('aria-label', enableDark ? 'Switch to Light Mode' : 'Switch to Dark Mode');
  }
}

function toggleDarkMode() {
  var current = document.body.classList.contains('theme-dark');
  applyDarkMode(!current);
}

// Inject Theme & Dark Mode Toggle Buttons in Navbar
window.addEventListener('DOMContentLoaded', function() {
  var navLinks = document.getElementById('nav-links');
  if (navLinks) {
    var cta = navLinks.querySelector('.nav-cta');

    // Fruit & Veg Theme Switcher
    if (!document.getElementById('theme-toggle-btn')) {
      var themeBtn = document.createElement('button');
      themeBtn.id = 'theme-toggle-btn';
      themeBtn.className = 'theme-switch-btn';
      themeBtn.setAttribute('aria-label', 'Switch Fruit & Vegetable Theme');
      themeBtn.innerHTML = themeLabels[savedTheme] || themeLabels['default'];
      themeBtn.addEventListener('click', cycleTheme);
      if (cta) {
        navLinks.insertBefore(themeBtn, cta);
      } else {
        navLinks.appendChild(themeBtn);
      }
    }

    // Light / Dark Mode Toggle Button
    if (!document.getElementById('dark-mode-toggle-btn')) {
      var darkBtn = document.createElement('button');
      darkBtn.id = 'dark-mode-toggle-btn';
      darkBtn.className = 'dark-mode-toggle-btn';
      darkBtn.setAttribute('aria-label', isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode');
      darkBtn.innerHTML = isDarkMode
        ? '<i class="fa-solid fa-sun"></i> Light Mode'
        : '<i class="fa-solid fa-moon"></i> Dark Mode';
      darkBtn.addEventListener('click', toggleDarkMode);
      if (cta) {
        navLinks.insertBefore(darkBtn, cta);
      } else {
        navLinks.appendChild(darkBtn);
      }
    }
  }
});

/* ── PAGE LOADER DISMISS ── */
window.addEventListener('load', function() {
  setTimeout(function() {
    var loader = document.getElementById('page-loader');
    if (loader) {
      loader.classList.add('hidden');
    }
  }, 450);
});

/* ── TOP SCROLL PROGRESS BAR ── */
var progressEl = document.getElementById('scroll-progress');
if (progressEl) {
  window.addEventListener('scroll', function() {
    var total = document.documentElement.scrollHeight - window.innerHeight;
    var pct = total > 0 ? (window.scrollY / total) * 100 : 0;
    progressEl.style.width = pct + '%';
  }, { passive: true });
}

/* ── HEADER DYNAMIC SHADOW ON SCROLL ── */
var header = document.getElementById('header');
if (header) {
  window.addEventListener('scroll', function() {
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  }, { passive: true });
}

/* ── MOBILE DRAWER / HAMBURGER MENU ── */
var hamburger = document.getElementById('hamburger');
var navLinks  = document.getElementById('nav-links');
if (hamburger && navLinks) {
  hamburger.addEventListener('click', function(e) {
    e.stopPropagation();
    var isOpen = navLinks.classList.toggle('open');
    hamburger.setAttribute('aria-expanded', String(isOpen));
    var spans = hamburger.querySelectorAll('span');
    if (spans.length >= 3) {
      if (isOpen) {
        spans[0].style.transform = 'translateY(7.5px) rotate(45deg)';
        spans[1].style.opacity   = '0';
        spans[2].style.transform = 'translateY(-7.5px) rotate(-45deg)';
      } else {
        spans[0].style.transform = '';
        spans[1].style.opacity   = '';
        spans[2].style.transform = '';
      }
    }
  });

  // Close when clicking any nav link
  navLinks.querySelectorAll('a').forEach(function(link) {
    link.addEventListener('click', function() {
      navLinks.classList.remove('open');
      hamburger.setAttribute('aria-expanded', 'false');
      var spans = hamburger.querySelectorAll('span');
      if (spans.length >= 3) {
        spans[0].style.transform = '';
        spans[1].style.opacity   = '';
        spans[2].style.transform = '';
      }
    });
  });

  // Close when clicking outside
  document.addEventListener('click', function(e) {
    if (navLinks.classList.contains('open') && !navLinks.contains(e.target) && !hamburger.contains(e.target)) {
      navLinks.classList.remove('open');
      hamburger.setAttribute('aria-expanded', 'false');
      var spans = hamburger.querySelectorAll('span');
      if (spans.length >= 3) {
        spans[0].style.transform = '';
        spans[1].style.opacity   = '';
        spans[2].style.transform = '';
      }
    }
  });
}

/* ── SMOOTH SCROLL WITH OFFSET ── */
document.querySelectorAll('a[href^="#"]').forEach(function(anchor) {
  anchor.addEventListener('click', function(e) {
    var href = this.getAttribute('href');
    if (href === '#' || !href) return;
    var target = document.querySelector(href);
    if (target) {
      e.preventDefault();
      var offset = 85;
      var top = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top: top, behavior: 'smooth' });
    }
  });
});

/* ── SCROLL REVEAL ANIMATIONS ── */
var revealEls = document.querySelectorAll('.reveal-up, .reveal-left, .reveal-right');
if ('IntersectionObserver' in window && revealEls.length) {
  var revealObs = new IntersectionObserver(function(entries) {
    entries.forEach(function(entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('in');
        revealObs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });
  revealEls.forEach(function(el) { revealObs.observe(el); });
} else {
  revealEls.forEach(function(el) { el.classList.add('in'); });
}

/* ── ACTIVE NAV HIGHLIGHT ── */
var currentPath = window.location.pathname.split('/').pop() || 'index.html';
document.querySelectorAll('.nav-link').forEach(function(link) {
  var href = link.getAttribute('href');
  if (href && href.split('#')[0] === currentPath) {
    link.classList.add('active');
  } else if (!href || href === '#' || href.startsWith('#')) {
    // preserve in-page anchor links
  } else if (currentPath === '' && href === 'index.html') {
    link.classList.add('active');
  }
});

console.log("[Nature's Nest] Shared assets initialized successfully with dual theme controller.");

})();
