// 分類・NEW判定・更新履歴の組み立て（画面には触らない）
// ブラウザでは window.Logic、Node（テスト）では module.exports から使う。
(function (root) {
  // 公開日から何日未満を NEW とするか
  const NEW_DAYS = 30;

  const CATEGORY_LABELS = {
    game: "ゲーム",
    web: "Webサイト",
  };

  // "YYYY-MM-DD" を日数の通し番号にする（タイムゾーンの影響を受けないよう UTC で数える）
  function toDayNumber(dateStr) {
    const [y, m, d] = dateStr.split("-").map(Number);
    return Date.UTC(y, m - 1, d) / 86400000;
  }

  function todayNumber(today) {
    return Date.UTC(today.getFullYear(), today.getMonth(), today.getDate()) / 86400000;
  }

  function isNew(dateStr, today = new Date()) {
    if (!dateStr) return false;
    return todayNumber(today) - toDayNumber(dateStr) < NEW_DAYS;
  }

  function byDateDesc(a, b) {
    return a.date < b.date ? 1 : a.date > b.date ? -1 : 0;
  }

  function worksByCategory(works, category) {
    return works.filter((w) => w.category === category).sort(byDateDesc);
  }

  function latestWorks(works, count) {
    return works.slice().sort(byDateDesc).slice(0, count);
  }

  function buildHistory(works, news) {
    const releases = works.map((w) => ({
      date: w.date,
      text: `${CATEGORY_LABELS[w.category] || "作品"}『${w.title}』を公開しました`,
    }));
    return releases.concat(news.map((n) => ({ date: n.date, text: n.text }))).sort(byDateDesc);
  }

  // 各SNSの投稿画面を開くURL（公式スクリプトは使わず、ただのリンクにする）
  function buildShareUrls(pageUrl, text) {
    const u = encodeURIComponent(pageUrl);
    const t = encodeURIComponent(text);
    return {
      x: `https://x.com/intent/tweet?text=${t}&url=${u}`,
      line: `https://social-plugins.line.me/lineit/share?url=${u}`,
      bluesky: `https://bsky.app/intent/compose?text=${t}%20${u}`,
      note: `https://note.com/intent/post?url=${u}`,
    };
  }

  function formatDate(dateStr) {
    return dateStr.replace(/-/g, "/");
  }

  const api = {
    NEW_DAYS,
    CATEGORY_LABELS,
    isNew,
    worksByCategory,
    latestWorks,
    buildHistory,
    buildShareUrls,
    formatDate,
  };

  if (typeof module !== "undefined" && module.exports) {
    module.exports = api;
  } else {
    root.Logic = api;
  }
})(this);
