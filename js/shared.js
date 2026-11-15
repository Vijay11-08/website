/* ═══════════════════════════════════════════
   NATURE'S NEST — SHARED JS (All Pages)
═══════════════════════════════════════════ */

(function() {
'use strict';

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

console.log("[Nature's Nest] Shared assets initialized successfully.");

})();
