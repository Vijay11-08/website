/* ═══════════════════════════════════════════
   NATURE'S NEST — PRODUCTS PAGE JS (Fruits & Vegetables)
═══════════════════════════════════════════ */

(function() {
'use strict';

/* ── LIVE CATEGORY FILTER SYSTEM ── */
var filterBtns = document.querySelectorAll('.filter-btn');
var prodGrid   = document.getElementById('prod-grid');
var countEl    = document.getElementById('product-count');

if (filterBtns.length && prodGrid) {
  filterBtns.forEach(function(btn) {
    btn.addEventListener('click', function() {
      var filter = this.dataset.filter;

      // Update active button state
      filterBtns.forEach(function(b) { b.classList.remove('active'); });
      this.classList.add('active');

      // Filter catalog cards
      var allCards = prodGrid.querySelectorAll('.prod-card');
      var visible = 0;
      allCards.forEach(function(card) {
        var cats = (card.dataset.category || '').split(' ');
        var show = (filter === 'all') || (cats.indexOf(filter) !== -1);
        if (show) {
          card.style.display = 'flex';
          visible++;
          card.style.opacity = '0';
          card.style.transform = 'translateY(16px)';
          setTimeout(function() {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
          }, 30);
        } else {
          card.style.display = 'none';
        }
      });
      if (countEl) {
        countEl.textContent = visible;
      }
    });
  });
}

/* ── CARD 3D TILT EFFECT ── */
document.querySelectorAll('.prod-card').forEach(function(card) {
  card.addEventListener('mousemove', function(e) {
    var rect   = card.getBoundingClientRect();
    var x      = e.clientX - rect.left - rect.width / 2;
    var y      = e.clientY - rect.top  - rect.height / 2;
    var tiltX  = -(y / rect.height) * 5;
    var tiltY  =  (x / rect.width)  * 5;
    card.style.transform = 'translateY(-8px) rotateX(' + tiltX.toFixed(2) + 'deg) rotateY(' + tiltY.toFixed(2) + 'deg)';
  });
  card.addEventListener('mouseleave', function() {
    card.style.transform = '';
  });
});

console.log("[Nature's Nest] Products catalog initialized.");

})();
