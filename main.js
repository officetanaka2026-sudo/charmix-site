(function () {
  var CATS = { keyring: "KEYRING", necklace: "NECKLACE", bracelet: "BRACELET" };
  var CATS_JA = { keyring: "キーリング", necklace: "ネックレス", bracelet: "ブレスレット" };
  var products = window.CHARMIX_PRODUCTS || [];
  var events = window.CHARMIX_EVENTS || [];
  var info = window.CHARMIX_INFO || {};
  var BASE = window.CHARMIX_BASE || "";

  function esc(s) {
    return String(s).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }
  function src(path) {
    if (!path) return "";
    if (/^https?:\/\//.test(path)) return path;
    return BASE + (path.indexOf("images/") === 0 ? path : "images/" + path);
  }
  function img(path, alt) {
    if (!path) return '<span class="ph">✦</span>';
    return '<img src="' + esc(src(path)) + '" alt="' + esc(alt || "") + '" loading="lazy" onerror="this.replaceWith(Object.assign(document.createElement(\'span\'),{className:\'ph\',textContent:\'✦\'}))">';
  }

  function renderProducts(filter) {
    var grid = document.getElementById("product-grid");
    if (!grid) return;
    grid.innerHTML = products
      .filter(function (p) { return filter === "all" || p.category === filter; })
      .map(function (p) {
        var action = p.stripeLink
          ? '<a class="btn btn-primary btn-buy" href="' + esc(p.stripeLink) + '" target="_blank" rel="noopener">購入する</a>'
          : '<span class="badge">ポップアップ会場で販売中</span>';
        return (
          '<article class="card">' +
          '<div class="card-img" style="--tint:' + esc(p.color || "#FFC2D6") + '">' + img(p.image, p.name) + "</div>" +
          '<div class="card-body">' +
          '<div class="card-cat">' + (CATS[p.category] || "") + "</div>" +
          '<div class="card-name">' + esc(p.name) + "</div>" +
          '<div class="card-price">¥' + Number(p.price).toLocaleString("ja-JP") + '<small>（税込）</small></div>' +
          action +
          "</div></article>"
        );
      })
      .join("");
  }

  function renderEvents() {
    var list = document.getElementById("event-list");
    if (!list) return;
    var today = new Date();
    today.setHours(0, 0, 0, 0);
    var sorted = events.slice().sort(function (a, b) { return a.date < b.date ? -1 : 1; });
    if (!sorted.length) {
      list.innerHTML = '<li class="note">次回の出店は準備中です。</li>';
      return;
    }
    list.innerHTML = sorted.map(function (e) {
      var d = new Date(e.date + "T00:00:00");
      var past = d < today;
      return (
        '<li class="event' + (past ? " past" : "") + '">' +
        '<div class="event-date"><span class="m">' + (d.getMonth() + 1) + "月</span>" +
        '<span class="d">' + d.getDate() + "</span></div>" +
        '<div class="event-info">' +
        '<div class="event-place">' + esc(e.place) + (past ? "（終了）" : "") + "</div>" +
        '<div class="event-meta">' + esc(e.area) + (e.note ? " ・ " + esc(e.note) : "") + "</div>" +
        "</div></li>"
      );
    }).join("");
  }

  document.querySelectorAll(".chip").forEach(function (btn) {
    btn.addEventListener("click", function () {
      document.querySelectorAll(".chip").forEach(function (b) { b.classList.remove("active"); });
      btn.classList.add("active");
      renderProducts(btn.dataset.filter);
    });
  });

  document.querySelectorAll("[data-hero]").forEach(function (el) {
    var p = (info.heroPhotos || [])[Number(el.dataset.hero)];
    if (p) el.innerHTML = img(p, "Charmix");
  });
  var name = document.getElementById("owner-name");
  if (name && info.ownerName) name.textContent = info.ownerName;
  var photo = document.getElementById("owner-photo");
  if (photo && info.ownerPhoto) photo.innerHTML = img(info.ownerPhoto, info.ownerName);
  var ig = document.getElementById("ig-link");
  if (ig && info.instagram) ig.href = info.instagram;
  var year = document.getElementById("year");
  if (year) year.textContent = new Date().getFullYear();

  window.CHARMIX_CATS_JA = CATS_JA;
  renderProducts("all");
  renderEvents();
})();
