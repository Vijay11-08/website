/* ═══════════════════════════════════════════
   NATURE'S NEST — FARM CHATBOT ENGINE
═══════════════════════════════════════════ */

(function() {
  'use strict';

  // Inject Chatbot HTML into the DOM on any page
  function initChatbotHTML() {
    if (document.getElementById('farm-chatbot-wrapper')) return;

    var wrapper = document.createElement('div');
    wrapper.id = 'farm-chatbot-wrapper';
    wrapper.className = 'chatbot-wrapper';
    wrapper.innerHTML = `
      <div class="chatbot-box" id="chatbot-box" role="dialog" aria-label="Farm Advisor Chatbot">
        <div class="chatbot-header">
          <div class="chatbot-header-info">
            <div class="chatbot-avatar">
              <i class="fa-solid fa-leaf"></i>
            </div>
            <div class="chatbot-title-area">
              <h4>Farm Advisor AI</h4>
              <span class="chatbot-status"><span class="status-dot"></span> Online &bull; Direct Farm Desk</span>
            </div>
          </div>
          <button class="chatbot-close" id="chatbot-close" aria-label="Close Chat">&times;</button>
        </div>

        <div class="chatbot-banner">
          <i class="fa-solid fa-sun"></i>
          <span>Morning Harvest Active &bull; Dispatches Daily Across Gujarat</span>
        </div>

        <div class="chatbot-messages" id="chatbot-messages">
          <!-- Intro Bot Message -->
          <div class="chat-msg bot">
            <div class="chat-bubble">
              Hello! I am your <strong>Nature's Nest Farm Advisor</strong>. Ask me what produce is fresh right now, get customized health &amp; diet recommendations, or let me assist your order!
            </div>
            <div class="chat-time">Just now</div>
          </div>

          <!-- Quick Suggestion Chips -->
          <div class="chatbot-suggestions" id="chat-suggestions">
            <button class="chip-btn" data-query="what is happening at the farm"><i class="fa-solid fa-tractor"></i> Farm Harvest Schedule</button>
            <button class="chip-btn" data-query="what to eat for diabetes"><i class="fa-solid fa-heart-pulse"></i> Blood Sugar Care</button>
            <button class="chip-btn" data-query="best fruits for immunity"><i class="fa-solid fa-shield-halved"></i> Immunity Boosters</button>
            <button class="chip-btn" data-query="how to order fresh produce"><i class="fa-brands fa-whatsapp"></i> How to Order</button>
            <button class="chip-btn" data-query="tell me about sitafal and dragon fruit"><i class="fa-solid fa-apple-whole"></i> Sitafal &amp; Dragon Fruit</button>
          </div>
        </div>

        <form class="chatbot-footer" id="chatbot-form">
          <input type="text" class="chatbot-input" id="chatbot-input" placeholder="Ask about fruits, vegetables, health or farm..." autocomplete="off" />
          <button type="submit" class="chatbot-send" aria-label="Send Message">
            <i class="fa-solid fa-paper-plane"></i>
          </button>
        </form>
      </div>

      <button class="chatbot-trigger" id="chatbot-trigger" aria-label="Open Farm Advisor Chat">
        <span class="chatbot-badge-pulse"></span>
        <i class="fa-solid fa-comments"></i>
        <span class="chatbot-label-tooltip">Ask Farm Advisor</span>
      </button>
    `;

    document.body.appendChild(wrapper);
    bindChatEvents();
  }

  // Knowledge Base Responses
  var farmKnowledge = [
    {
      keywords: ['happen', 'happening', 'schedule', 'routine', 'timing', 'harvest', 'farm process'],
      response: "<strong>What happens at Nature's Nest Farm daily:</strong><br/>" +
                "&bull; <strong>6:00 AM:</strong> Field inspection & soil moisture assessment.<br/>" +
                "&bull; <strong>7:00 AM – 11:00 AM:</strong> Fresh morning harvest of leafy vegetables & ripe fruits at peak nutrient density.<br/>" +
                "&bull; <strong>100% Pesticide-Free:</strong> We use bio-compost, neem extracts, and drip irrigation.<br/>" +
                "&bull; <strong>12:00 PM:</strong> Sorting, eco-packaging, and dispatch across Gujarat for same-day freshness!"
    },
    {
      keywords: ['diabetes', 'sugar', 'glycemic', 'karela', 'jamun'],
      response: "<strong>Best Organic Produce for Blood Sugar &amp; Diabetes:</strong><br/>" +
                "1. <strong>Karela (Bitter Gourd):</strong> Natural charantin & polypeptide-p that support insulin activity.<br/>" +
                "2. <strong>Jamun (Black Plum):</strong> Revered for balancing post-meal blood sugar levels.<br/>" +
                "3. <strong>Methi (Fenugreek):</strong> High soluble fibre slows carb absorption.<br/>" +
                "4. <strong>Moringa (Sahjan):</strong> Rich in chlorogenic acid.<br/>" +
                "<div class='chat-action-card'>" +
                "  <h5><i class='fa-brands fa-whatsapp' style='color:#25d366'></i> Order Diabetic Care Basket</h5>" +
                "  <a class='chat-action-btn' target='_blank' rel='noopener' href='https://wa.me/919825638381?text=Hi!%20I%20want%20to%20order%20the%20Diabetic-Care%20Produce%20Pack%20(Karela,%20Jamun,%20Methi,%20Moringa).'>Order on WhatsApp (9825638381)</a>" +
                "</div>"
    },
    {
      keywords: ['immunity', 'vitamin c', 'dragon fruit', 'guava', 'cold', 'infection'],
      response: "<strong>Top Immunity-Boosting Harvests:</strong><br/>" +
                "&bull; <strong>Guava (Amrood):</strong> Contains <strong>4x more Vitamin C</strong> than regular oranges!<br/>" +
                "&bull; <strong>Dragon Fruit:</strong> Loaded with betalain antioxidants & prebiotic gut fibre.<br/>" +
                "&bull; <strong>Vine Tomatoes &amp; Papaya:</strong> High in bioavailable lycopene and beta-carotene.<br/>" +
                "All harvested without chemical sprays to preserve live enzymes!"
    },
    {
      keywords: ['order', 'buy', 'price', 'delivery', 'whatsapp', 'call', 'cost'],
      response: "<strong>How to Place an Order:</strong><br/>" +
                "1. Choose items from our <strong>Fruits</strong> or <strong>Vegetables</strong> catalog.<br/>" +
                "2. Tap the WhatsApp or Call button (<strong>+91 98256 38381</strong>).<br/>" +
                "3. We confirm daily harvest availability and dispatch directly to your home in Gujarat!<br/>" +
                "<div class='chat-action-card'>" +
                "  <h5><i class='fa-brands fa-whatsapp' style='color:#25d366'></i> Direct WhatsApp Chat</h5>" +
                "  <a class='chat-action-btn' target='_blank' rel='noopener' href='https://wa.me/919825638381?text=Hello!%20Please%20share%20today%27s%20fresh%20harvest%20price%20list%20and%20delivery%20options.'>Message Farm Now (9825638381)</a>" +
                "</div>"
    },
    {
      keywords: ['sitafal', 'custard apple', 'dragon'],
      response: "<strong>About Sitafal &amp; Dragon Fruit:</strong><br/>" +
                "&bull; <strong>Sitafal (Custard Apple):</strong> Hand-picked only when tree-ripe. It has a velvety, creamy sweetness with high magnesium for heart and muscle wellness.<br/>" +
                "&bull; <strong>Dragon Fruit:</strong> Grown directly in Gujarat sun. Crisp, mildly sweet speckled flesh that supports gut microbiome and natural energy.<br/>" +
                "<div class='chat-action-card'>" +
                "  <h5><i class='fa-solid fa-apple-whole' style='color:#40916c'></i> View Produce Details</h5>" +
                "  <a class='chat-action-btn' href='product-detail.html?id=sitafal'>See Sitafal Profile</a>" +
                "</div>"
    },
    {
      keywords: ['location', 'visit', 'address', 'where', 'map', 'directions'],
      response: "<strong>Farm Location &amp; Visiting:</strong><br/>" +
                "Nature's Nest Organic Farm is located in <strong>Gujarat, India</strong>.<br/>" +
                "&bull; Visitors &amp; families are welcome with prior appointment.<br/>" +
                "&bull; You can pick up harvest directly from our farm packing station.<br/>" +
                "Check out our <a href='contact.html' style='color:#2d6a4f;text-decoration:underline;font-weight:700;'>Visit &amp; Contact Page</a> for interactive Google Maps directions."
    },
    {
      keywords: ['iron', 'calcium', 'spinach', 'moringa', 'bone'],
      response: "<strong>Top Produce for Iron &amp; Bone Strength:</strong><br/>" +
                "&bull; <strong>Moringa Drumstick (Sahjan):</strong> Exceptional plant calcium and essential amino acids.<br/>" +
                "&bull; <strong>Palak (Spinach):</strong> Morning-cut fresh iron, folate, and Vitamin K.<br/>" +
                "&bull; <strong>Curry Leaves (Kadi Patta):</strong> Traditional iron & bioflavonoid powerhouse."
    },
    {
      keywords: ['digestion', 'stomach', 'gut', 'lauki', 'papaya'],
      response: "<strong>Digestive &amp; Cooling Recommendations:</strong><br/>" +
                "&bull; <strong>Lauki (Bottle Gourd):</strong> Over 92% natural water, cooling for summer, great for hydration and liver.<br/>" +
                "&bull; <strong>Papaya:</strong> Contains the active papain enzyme which assists protein digestion and intestinal motility.<br/>" +
                "&bull; <strong>Bhindi (Okra):</strong> Gentle mucilaginous fibre that coats and soothes the digestive tract."
    }
  ];

  function getBotReply(userText) {
    var lower = userText.toLowerCase().trim();
    for (var i = 0; i < farmKnowledge.length; i++) {
      var item = farmKnowledge[i];
      for (var k = 0; k < item.keywords.length; k++) {
        if (lower.indexOf(item.keywords[k]) !== -1) {
          return item.response;
        }
      }
    }
    // Default reply
    return "Thank you for asking! We cultivate 8 organic exotic fruits and 12 fresh vegetables right here in Gujarat without any synthetic chemicals. " +
           "You can ask me about: <em>'what is happening at the farm'</em>, <em>'diabetes-friendly foods'</em>, <em>'immunity fruits'</em>, or tap below to order directly on WhatsApp!";
  }

  function appendMessage(sender, text) {
    var container = document.getElementById('chatbot-messages');
    if (!container) return;

    var msgDiv = document.createElement('div');
    msgDiv.className = 'chat-msg ' + sender;
    msgDiv.innerHTML = `
      <div class="chat-bubble">${text}</div>
      <div class="chat-time">Just now</div>
    `;
    container.appendChild(msgDiv);
    container.scrollTop = container.scrollHeight;
  }

  function showTypingIndicator() {
    var container = document.getElementById('chatbot-messages');
    if (!container) return null;

    var typingDiv = document.createElement('div');
    typingDiv.className = 'chat-msg bot typing-msg';
    typingDiv.innerHTML = `
      <div class="typing-dots">
        <span class="typing-dot"></span>
        <span class="typing-dot"></span>
        <span class="typing-dot"></span>
      </div>
    `;
    container.appendChild(typingDiv);
    container.scrollTop = container.scrollHeight;
    return typingDiv;
  }

  function handleUserInput(query) {
    if (!query || !query.trim()) return;

    appendMessage('user', query);
    var typing = showTypingIndicator();

    setTimeout(function() {
      if (typing && typing.parentNode) {
        typing.parentNode.removeChild(typing);
      }
      var reply = getBotReply(query);
      appendMessage('bot', reply);
    }, 600);
  }

  function bindChatEvents() {
    var trigger = document.getElementById('chatbot-trigger');
    var box = document.getElementById('chatbot-box');
    var closeBtn = document.getElementById('chatbot-close');
    var form = document.getElementById('chatbot-form');
    var input = document.getElementById('chatbot-input');
    var suggestions = document.getElementById('chat-suggestions');

    if (trigger && box) {
      trigger.addEventListener('click', function() {
        var isOpen = box.classList.toggle('active');
        if (isOpen && input) {
          setTimeout(function() { input.focus(); }, 200);
        }
      });
    }

    if (closeBtn && box) {
      closeBtn.addEventListener('click', function() {
        box.classList.remove('active');
      });
    }

    if (form && input) {
      form.addEventListener('submit', function(e) {
        e.preventDefault();
        var val = input.value;
        input.value = '';
        handleUserInput(val);
      });
    }

    if (suggestions) {
      suggestions.addEventListener('click', function(e) {
        var btn = e.target.closest('.chip-btn');
        if (btn) {
          var q = btn.dataset.query;
          handleUserInput(q);
        }
      });
    }
  }

  // Auto-initialize when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initChatbotHTML);
  } else {
    initChatbotHTML();
  }

  console.log("[Nature's Nest] Farm Advisor Chatbot initialized.");
})();
