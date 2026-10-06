(function () {
  var products = window.CHARMIX_PRODUCTS || [];
  var events = window.CHARMIX_EVENTS || [];
  var info = window.CHARMIX_INFO || {};

  function esc(s) {
    return String(s).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }
  function src(p) {
    if (!p || /^https?:\/\//.test(p)) return p || "";
    return p.indexOf("images/") === 0 ? p : "images/" + p;
  }

  // mobile menu
  document.querySelector(".menu-toggle").addEventListener("click", function () {
    var open = document.body.classList.toggle("menu-open");
    this.setAttribute("aria-expanded", open);
  });
  document.querySelectorAll(".nav a").forEach(function (a) {
    a.addEventListener("click", function () { document.body.classList.remove("menu-open"); });
  });

  // hero slideshow
  var slides = document.querySelectorAll(".slide");
  var dots = document.querySelectorAll(".dots button");
  var cur = 0, timer;
  function show(i) {
    slides[cur].classList.remove("is-active"); dots[cur].classList.remove("is-active");
    cur = i;
    slides[cur].classList.add("is-active"); dots[cur].classList.add("is-active");
  }
  function start() { timer = setInterval(function () { show((cur + 1) % slides.length); }, 5000); }
  dots.forEach(function (d, i) { d.addEventListener("click", function () { clearInterval(timer); show(i); start(); }); });
  start();

  // products
  var grid = document.getElementById("grid");
  function render(cat) {
    var list = products.filter(function (p) { return !/^https?:/.test(p.image || "") && (!cat || p.category === cat); });
    if (!list.length) { grid.innerHTML = '<p class="empty">COMING SOON</p>'; return; }
    grid.innerHTML = list.map(function (p) {
      var tag = p.stripeLink ? "a" : "div";
      var href = p.stripeLink ? ' href="' + esc(p.stripeLink) + '" target="_blank" rel="noopener"' : "";
      return "<" + tag + ' class="item"' + href + '><div class="item-img"><img src="' + esc(src(p.image)) + '" alt="' + esc(p.name) + '" loading="lazy"></div>' +
        '<p class="item-name">' + esc(p.en || p.name) + "</p>" +
        '<p class="item-price">¥' + Number(p.price).toLocaleString("ja-JP") + " (tax included)</p>" +
        '<span class="item-status">' + (p.stripeLink ? "ONLINE" : "POP-UP ONLY") + "</span></" + tag + ">";
    }).join("");
  }
  document.querySelectorAll(".cats button").forEach(function (b) {
    b.addEventListener("click", function () {
      document.querySelectorAll(".cats button").forEach(function (x) { x.classList.remove("is-active"); });
      b.classList.add("is-active");
      render(b.dataset.cat);
    });
  });
  render("");

  // pop-up schedule
  var today = new Date(); today.setHours(0, 0, 0, 0);
  document.getElementById("news").innerHTML = events.slice().sort(function (a, b) { return a.date < b.date ? -1 : 1; }).map(function (e) {
    var d = new Date(e.date + "T00:00:00");
    var past = d < today;
    return '<li class="' + (past ? "past" : "") + '"><span class="date">' + e.date.replace(/-/g, ".") + "</span>" +
      '<span class="place">' + esc(e.place) + (past ? "（終了）" : "") + "</span>" +
      '<span class="area">' + esc(e.area) + (e.note ? " / " + esc(e.note) : "") + "</span></li>";
  }).join("") || '<li class="soon"><span class="place">次回の出店は決まり次第、Instagramでお知らせします。</span></li>';

  // concept / links
  if (info.instagram) {
    document.getElementById("ig-link").href = info.instagram;
    document.getElementById("ig-more").href = info.instagram;
  }
  document.getElementById("year").textContent = new Date().getFullYear();
})();
