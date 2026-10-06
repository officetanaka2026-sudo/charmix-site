(function () {
  var products = window.CHARMIX_PRODUCTS || [];
  var events = window.CHARMIX_EVENTS || [];
  var info = window.CHARMIX_INFO || {};
  var CATS = { keyring: "KEYRING", necklace: "NECKLACE", bracelet: "BRACELET" };
  var MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

  function esc(s) {
    return String(s).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }
  function src(p) {
    if (!p) return "";
    if (/^https?:\/\//.test(p)) return p;
    return "../../" + (p.indexOf("images/") === 0 ? p : "images/" + p);
  }

  // carousel
  var carousel = document.getElementById("carousel");
  function renderCards(filter) {
    carousel.innerHTML = products
      .filter(function (p) { return !filter || p.category === filter; })
      .map(function (p, i) {
        var buy = p.stripeLink
          ? '<a class="card-buy" href="' + esc(p.stripeLink) + '" target="_blank" rel="noopener">Buy online →</a>'
          : '<span class="card-buy">Available at pop-ups</span>';
        return '<div class="card"><div class="card-img">' +
          (i < 2 && !filter ? '<span class="card-tag">New</span>' : "") +
          '<img src="' + esc(src(p.image)) + '" alt="' + esc(p.name) + '" loading="lazy"></div>' +
          '<div class="card-cat">' + (CATS[p.category] || "") + "</div>" +
          '<div class="card-name">' + esc(p.name) + "</div>" +
          '<div class="card-price">¥' + Number(p.price).toLocaleString("ja-JP") + "</div>" + buy + "</div>";
      }).join("");
    carousel.scrollLeft = 0;
    updateCount();
  }
  function perView() {
    var c = carousel.querySelector(".card");
    return c ? Math.max(1, Math.round(carousel.clientWidth / c.getBoundingClientRect().width)) : 1;
  }
  function updateCount() {
    var cards = carousel.querySelectorAll(".card");
    var c = cards[0];
    if (!c) return;
    var w = c.getBoundingClientRect().width + 24;
    var pages = Math.max(1, Math.ceil(cards.length / perView()));
    var page = Math.min(pages, Math.round(carousel.scrollLeft / (w * perView())) + 1);
    document.getElementById("count").textContent = page + " / " + pages;
  }
  carousel.addEventListener("scroll", function () { window.requestAnimationFrame(updateCount); });
  document.querySelectorAll(".arrow").forEach(function (b) {
    b.addEventListener("click", function () {
      carousel.scrollBy({ left: Number(b.dataset.dir) * carousel.clientWidth, behavior: "smooth" });
    });
  });
  document.querySelectorAll(".big-btn[data-cat]").forEach(function (b) {
    b.addEventListener("click", function () { renderCards(b.dataset.cat); });
  });
  window.addEventListener("resize", updateCount);
  renderCards();

  // before / after
  var compare = document.getElementById("compare");
  compare.querySelector("input").addEventListener("input", function (e) {
    compare.style.setProperty("--pos", e.target.value + "%");
  });

  // pop-up schedule
  var today = new Date(); today.setHours(0, 0, 0, 0);
  var sorted = events.slice().sort(function (a, b) { return a.date < b.date ? -1 : 1; });
  var next = sorted.filter(function (e) { return new Date(e.date + "T00:00:00") >= today; })[0];
  if (next) {
    var nd = new Date(next.date + "T00:00:00");
    document.getElementById("next-popup").textContent = MONTHS[nd.getMonth()] + " " + nd.getDate() + " · " + next.area;
  }
  document.getElementById("event-list").innerHTML = sorted.length ? sorted.map(function (e) {
    var d = new Date(e.date + "T00:00:00");
    var past = d < today;
    return '<li class="event' + (past ? " past" : "") + '"><div class="event-date"><span class="m">' + MONTHS[d.getMonth()] +
      '</span><span class="d">' + d.getDate() + '</span></div><div><div class="event-place">' + esc(e.place) + (past ? "（終了）" : "") +
      '</div><div class="event-meta">' + esc(e.area) + (e.note ? " ・ " + esc(e.note) : "") + "</div></div></li>";
  }).join("") : '<li class="event-meta">Coming soon!</li>';

  // about / links
  if (info.ownerName) document.getElementById("owner-name").textContent = info.ownerName;
  if (info.ownerPhoto) document.getElementById("owner-photo").innerHTML = '<img src="' + esc(src(info.ownerPhoto)) + '" alt="' + esc(info.ownerName || "") + '">';
  ["ig-link", "ig-top", "ig-foot"].forEach(function (id) {
    if (info.instagram) document.getElementById(id).href = info.instagram;
  });
  document.getElementById("year").textContent = new Date().getFullYear();
})();
