// ===== ここを書き換えるだけでサイトの内容が変わります =====

// 写真は今は仮（Unsplashの無料写真）。自分の写真は images/ に入れて "images/ファイル名.jpg" と書く。
function U(id) { return "https://images.unsplash.com/photo-" + id + "?w=800&q=80&auto=format&fit=crop"; }

// stripeLink は Stripe の支払いリンク（空なら「会場で販売中」と表示）。
window.CHARMIX_PRODUCTS = [
  { name: "チャーム キーリング 01", en: "charm keyring 01", category: "keyring", price: 2400, image: "images/keyring-01.jpg", stripeLink: "", color: "#FFC2D6" },
  { name: "チャーム キーリング 02", en: "charm keyring 02", category: "keyring", price: 2200, image: "images/keyring-02.jpg", stripeLink: "", color: "#FFE48A" },
  { name: "チャーム キーリング 03", en: "charm keyring 03", category: "keyring", price: 2200, image: "images/keyring-03.jpg", stripeLink: "", color: "#A8D8FF" },
  { name: "チャーム キーリング 04", en: "charm keyring 04", category: "keyring", price: 2400, image: "images/keyring-04.jpg", stripeLink: "", color: "#FF9E9E" },
  { name: "シルバーハート ネックレス", en: "heart necklace 01", category: "necklace", price: 3800, image: U("1676329947145-99145926d3eb"), stripeLink: "", color: "#D9CCFF" },
  { name: "ビーズ ネックレス", en: "beads necklace 01", category: "necklace", price: 3600, image: U("1583484370773-c1af4e528d5e"), stripeLink: "", color: "#FFD9B3" },
  { name: "ピンクハート ブレスレット", en: "heart bracelet 01", category: "bracelet", price: 3200, image: U("1676296227404-9a7c32bb826d"), stripeLink: "", color: "#FFC2D6" },
  { name: "カラフルリンク ブレスレット", en: "link bracelet 01", category: "bracelet", price: 3400, image: U("1786052345722-b8873a0f9d2e"), stripeLink: "", color: "#B8F0DC" },
];

// ポップアップ出店スケジュール（日付の古いものは自動で「終了」表示）
window.CHARMIX_EVENTS = [
  { date: "2026-11-03", place: "（会場名）", area: "東京・渋谷", note: "11:00–18:00" },
  { date: "2026-11-21", place: "（会場名）", area: "横浜", note: "2日間開催" },
  { date: "2026-12-12", place: "（会場名）", area: "東京・吉祥寺", note: "クリスマスマーケット" },
];

window.CHARMIX_INFO = {
  instagram: "https://www.instagram.com/",   // 自分のアカウントURLに変更
  ownerName: "Kento",                        // 表示する名前
  ownerPhoto: U("1772442125267-7640b4b5f2fe"), // 仮写真。自分の顔写真に差し替え
  heroPhotos: [U("1778278553445-9cb87c89c60f"), U("1676296227404-9a7c32bb826d"), U("1759493946930-150aee20977c")],
};
