// js/logic.js で組み立てたデータを HTML に描画する
(function () {
  const { isNew, worksByCategory, latestWorks, buildHistory, buildShareUrls, formatDate } =
    window.Logic;
  const works = window.WORKS || [];
  const news = window.NEWS || [];

  // 共有するのは常に公開URL（ローカルで開いたときに file:// を共有しないため）
  const SITE_URL = "https://sakuichi.github.io/portfolio/";
  const SHARE_TEXT = "おもしろゲーム倉庫 ～ 遊んで笑えるゲームがいっぱい！ ～";

  function el(tag, className, text) {
    const node = document.createElement(tag);
    if (className) node.className = className;
    if (text !== undefined) node.textContent = text;
    return node;
  }

  function newMark() {
    return el("span", "new-mark", "NEW!");
  }

  function thumbnail(work) {
    const link = el("a", "thumb");
    link.href = work.url;
    link.target = "_blank";
    link.rel = "noopener";
    if (work.thumb) {
      const img = el("img");
      img.src = work.thumb;
      img.alt = work.title;
      img.loading = "lazy";
      link.appendChild(img);
    } else {
      link.appendChild(el("span", "no-image", "NO IMAGE"));
    }
    return link;
  }

  function workRow(work) {
    const row = el("div", "work");
    row.appendChild(thumbnail(work));

    const body = el("div", "work-body");
    const title = el("div", "work-title");
    const link = el("a", null, work.title);
    link.href = work.url;
    link.target = "_blank";
    link.rel = "noopener";
    title.appendChild(link);
    if (isNew(work.date)) title.appendChild(newMark());
    body.appendChild(title);

    body.appendChild(el("p", "work-desc", work.description));

    const meta = el("div", "work-meta");
    meta.appendChild(el("span", "platform", work.platform));
    meta.appendChild(el("span", "date", `公開日：${formatDate(work.date)}`));
    body.appendChild(meta);

    row.appendChild(body);
    return row;
  }

  function renderWorkList(containerId, list) {
    const container = document.getElementById(containerId);
    if (list.length === 0) {
      container.appendChild(el("p", "empty", "ただいま準備中です…"));
      return;
    }
    list.forEach((work) => container.appendChild(workRow(work)));
  }

  function renderHistory(history) {
    const list = document.getElementById("history-list");
    history.forEach((item) => {
      const li = el("li");
      li.appendChild(el("span", "history-date", formatDate(item.date)));
      li.appendChild(document.createTextNode(item.text));
      if (isNew(item.date)) li.appendChild(newMark());
      list.appendChild(li);
    });
  }

  function showShareMessage(text) {
    const message = document.getElementById("share-message");
    message.textContent = text;
    clearTimeout(showShareMessage.timer);
    showShareMessage.timer = setTimeout(() => (message.textContent = ""), 3000);
  }

  // Clipboard API が使えない環境（古いブラウザなど）では execCommand で代用する
  function copyText(text) {
    if (navigator.clipboard && window.isSecureContext) {
      return navigator.clipboard.writeText(text);
    }
    return new Promise((resolve, reject) => {
      const area = el("textarea");
      area.value = text;
      area.setAttribute("readonly", "");
      area.style.position = "fixed";
      area.style.opacity = "0";
      document.body.appendChild(area);
      area.select();
      const ok = document.execCommand("copy");
      area.remove();
      ok ? resolve() : reject(new Error("copy failed"));
    });
  }

  function setupShare() {
    const urls = buildShareUrls(SITE_URL, SHARE_TEXT);
    document.getElementById("share-x").href = urls.x;
    document.getElementById("share-line").href = urls.line;
    document.getElementById("share-bluesky").href = urls.bluesky;
    document.getElementById("share-note").href = urls.note;

    document.getElementById("share-copy").addEventListener("click", () => {
      copyText(SITE_URL).then(
        () => showShareMessage("コピーしました！"),
        () => showShareMessage("コピーできませんでした…")
      );
    });

    // 端末の共有メニュー（主にスマホ）。対応していない環境ではボタンを出さない
    if (navigator.share) {
      const nativeButton = document.getElementById("share-native");
      nativeButton.hidden = false;
      nativeButton.addEventListener("click", () => {
        navigator.share({ title: document.title, text: SHARE_TEXT, url: SITE_URL }).catch(() => {});
      });
    }
  }

  const history = buildHistory(works, news);

  renderWorkList("latest-list", latestWorks(works, 3));
  renderWorkList("game-list", worksByCategory(works, "game"));
  renderWorkList("web-list", worksByCategory(works, "web"));
  renderHistory(history);
  setupShare();

  document.getElementById("work-count").textContent = works.length;
  if (history.length > 0) {
    document.getElementById("last-updated").textContent = formatDate(history[0].date);
  }
})();
