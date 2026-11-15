/* ═══════════════════════════════════════════
   NATURE'S NEST — HOME PAGE JS
═══════════════════════════════════════════ */

(function() {
'use strict';

/* ── INTERACTIVE PARTICLES CANVAS ── */
var canvas = document.getElementById('particle-canvas');
if (canvas) {
  var ctx = canvas.getContext('2d');
  var particles = [];
  var NUM = 50;

  function resize() {
    canvas.width  = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  resize();
  window.addEventListener('resize', resize, { passive: true });

  for (var i = 0; i < NUM; i++) {
    particles.push({
      x: Math.random() * (canvas.width || 800),
      y: Math.random() * (canvas.height || 600),
      r: Math.random() * 2.2 + 0.6,
      dx: (Math.random() - 0.5) * 0.4,
      dy: (Math.random() - 0.5) * 0.4,
      alpha: Math.random() * 0.45 + 0.15
    });
  }

  function animParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach(function(p) {
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(160, 240, 190, ' + p.alpha + ')';
      ctx.fill();
      p.x += p.dx;
      p.y += p.dy;
      if (p.x < 0) p.x = canvas.width;
      if (p.x > canvas.width) p.x = 0;
      if (p.y < 0) p.y = canvas.height;
      if (p.y > canvas.height) p.y = 0;
    });
    requestAnimationFrame(animParticles);
  }
  animParticles();
}

/* ── ANIMATED STAT COUNTERS ── */
function animCount(el, target) {
  var duration = 1500;
  var startTime = null;
  function step(ts) {
    if (!startTime) startTime = ts;
    var progress = Math.min((ts - startTime) / duration, 1);
    var eased = 1 - Math.pow(1 - progress, 3);
    el.textContent = Math.floor(eased * target);
    if (progress < 1) {
      requestAnimationFrame(step);
    } else {
      el.textContent = target;
    }
  }
  requestAnimationFrame(step);
}

var statsEl = document.querySelector('.hero-stats');
if (statsEl && 'IntersectionObserver' in window) {
  var statsObs = new IntersectionObserver(function(entries) {
    if (entries[0].isIntersecting) {
      document.querySelectorAll('.hstat-n[data-target]').forEach(function(el) {
        animCount(el, parseInt(el.dataset.target, 10));
      });
      statsObs.disconnect();
    }
  }, { threshold: 0.3 });
  statsObs.observe(statsEl);
}

/* ── CATEGORY CARD SUBTLE PARALLAX ── */
document.querySelectorAll('.cat-card').forEach(function(card) {
  card.addEventListener('mousemove', function(e) {
    var rect = card.getBoundingClientRect();
    var x = (e.clientX - rect.left) / rect.width  - 0.5;
    var y = (e.clientY - rect.top)  / rect.height - 0.5;
    var img = card.querySelector('.cat-card-img');
    if (img) {
      img.style.transform = 'scale(1.08) translate(' + (x * 8).toFixed(1) + 'px,' + (y * 5).toFixed(1) + 'px)';
    }
  });
  card.addEventListener('mouseleave', function() {
    var img = card.querySelector('.cat-card-img');
    if (img) img.style.transform = '';
  });
});

/* ── WELCOME TOAST NOTIFICATION ── */
setTimeout(function() {
  var toast = document.createElement('div');
  toast.style.cssText = 'position:fixed;bottom:90px;left:50%;transform:translateX(-50%) translateY(16px);background:rgba(7,26,18,0.96);color:#fff;padding:12px 24px;border-radius:50px;font-size:13px;font-weight:600;box-shadow:0 8px 30px rgba(0,0,0,0.25);z-index:9998;opacity:0;transition:all 0.4s cubic-bezier(0.16,1,0.3,1);white-space:nowrap;max-width:92vw;text-align:center;border:1px solid rgba(82,183,136,0.35);pointer-events:none;display:inline-flex;align-items:center;gap:10px;';
  toast.innerHTML = '<i class="fa-solid fa-leaf" style="color:#52b788"></i> Fresh organic produce available &bull; Order via WhatsApp: +91 8320852144';
  document.body.appendChild(toast);

  requestAnimationFrame(function() {
    requestAnimationFrame(function() {
      toast.style.opacity = '1';
      toast.style.transform = 'translateX(-50%) translateY(0)';
    });
  });

  setTimeout(function() {
    toast.style.opacity = '0';
    toast.style.transform = 'translateX(-50%) translateY(16px)';
    setTimeout(function() {
      if (toast.parentNode) toast.parentNode.removeChild(toast);
    }, 450);
  }, 5000);
}, 1400);

console.log("[Nature's Nest] Home modules active.");

})();
