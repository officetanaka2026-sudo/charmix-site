// ===== ここを書き換えるだけでサイトの内容が変わります =====

// 写真は images/ に入れて "images/ファイル名.jpg" と書く。
// price は空なら表示しない（チャームビュッフェは選んだパーツで値段が変わるため）。
window.CHARMIX_PRODUCTS = [
  { name: "チャーム キーリング 01", en: "charm keyring 01", category: "keyring", image: "images/keyring-01.jpg" },
  { name: "チャーム キーリング 02", en: "charm keyring 02", category: "keyring", image: "images/keyring-02.jpg" },
  { name: "チャーム キーリング 03", en: "charm keyring 03", category: "keyring", image: "images/keyring-03.jpg" },
  { name: "チャーム キーリング 04", en: "charm keyring 04", category: "keyring", image: "images/keyring-04.jpg" },
  { name: "チャーム キーリング 05", en: "charm keyring 05", category: "keyring", image: "images/keyring-05.jpg" },
  { name: "チャーム キーリング 06", en: "charm keyring 06", category: "keyring", image: "images/keyring-06.jpg" },
  { name: "チャーム キーリング 07", en: "charm keyring 07", category: "keyring", image: "images/keyring-07.jpg" },
  { name: "チャーム キーリング 08", en: "charm keyring 08", category: "keyring", image: "images/keyring-08.jpg" },
  { name: "チャーム キーリング 09", en: "charm keyring 09", category: "keyring", image: "images/keyring-09.jpg" },
  { name: "チャーム キーリング 10", en: "charm keyring 10", category: "keyring", image: "images/keyring-10.jpg" },
  { name: "チャーム キーリング 11", en: "charm keyring 11", category: "keyring", image: "images/keyring-11.jpg" },
  { name: "チャーム ネックレス 01", en: "charm necklace 01", category: "necklace", image: "images/necklace-01.jpg" },
  { name: "チャーム ブレスレット 01", en: "charm bracelet 01", category: "bracelet", image: "images/bracelet-01.jpg" },
];

// イベント出店スケジュール（日付の古いものは自動で「終了」表示）
window.CHARMIX_EVENTS = [
  // 例：{ date: "2026-11-03", place: "会場名", area: "東京・渋谷", note: "11:00–18:00" },
];

window.CHARMIX_INFO = {
  contact: "mailto:hello@example.com", // 問い合わせ先。自分のメールアドレスに変更
};
