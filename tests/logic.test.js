const test = require("node:test");
const assert = require("node:assert/strict");
const { isNew, worksByCategory, latestWorks, buildHistory, buildShareUrls, formatDate } = require("../js/logic.js");

const today = new Date(2026, 9, 25); // 2026-10-25（ローカル時刻）

test("isNew: 公開当日はNEW", () => {
  assert.equal(isNew("2026-10-25", today), true);
});

test("isNew: 29日前はNEW", () => {
  assert.equal(isNew("2026-09-26", today), true);
});

test("isNew: 30日前はNEWではない", () => {
  assert.equal(isNew("2026-09-25", today), false);
});

test("isNew: 日付が空ならNEWではない", () => {
  assert.equal(isNew("", today), false);
});

test("worksByCategory: 指定カテゴリだけを新しい順に返す", () => {
  const works = [
    { title: "A", category: "game", date: "2026-01-01" },
    { title: "B", category: "web", date: "2026-05-01" },
    { title: "C", category: "game", date: "2026-03-01" },
  ];
  assert.deepEqual(
    worksByCategory(works, "game").map((w) => w.title),
    ["C", "A"]
  );
});

test("worksByCategory: 元の配列を並べ替えない", () => {
  const works = [
    { title: "A", category: "game", date: "2026-01-01" },
    { title: "C", category: "game", date: "2026-03-01" },
  ];
  worksByCategory(works, "game");
  assert.deepEqual(works.map((w) => w.title), ["A", "C"]);
});

test("latestWorks: 全カテゴリから新しい順に指定件数を返し、同じ日付の順番は worksByCategory と揃う", () => {
  const works = [
    { title: "B", category: "game", date: "2026-10-09" },
    { title: "C", category: "game", date: "2026-10-09" },
    { title: "W", category: "web", date: "2026-10-01" },
    { title: "A", category: "game", date: "2026-10-24" },
  ];
  assert.deepEqual(latestWorks(works, 3).map((w) => w.title), ["A", "B", "C"]);
  assert.deepEqual(
    worksByCategory(works, "game").map((w) => w.title),
    ["A", "B", "C"]
  );
});

test("buildHistory: 作品公開とお知らせを新しい順に混ぜる", () => {
  const works = [
    { title: "ゲームA", category: "game", date: "2026-10-01" },
    { title: "サイトB", category: "web", date: "2026-08-01" },
  ];
  const news = [{ date: "2026-09-01", text: "サイトを開設しました" }];
  assert.deepEqual(buildHistory(works, news), [
    { date: "2026-10-01", text: "ゲーム『ゲームA』を公開しました" },
    { date: "2026-09-01", text: "サイトを開設しました" },
    { date: "2026-08-01", text: "Webサイト『サイトB』を公開しました" },
  ]);
});

test("buildShareUrls: X・LINE・Bluesky の共有URLを、文言とURLをエンコードして組み立てる", () => {
  const urls = buildShareUrls("https://example.com/a b/", "遊んで&笑える");
  assert.equal(
    urls.x,
    "https://x.com/intent/tweet?text=%E9%81%8A%E3%82%93%E3%81%A7%26%E7%AC%91%E3%81%88%E3%82%8B&url=https%3A%2F%2Fexample.com%2Fa%20b%2F"
  );
  assert.equal(
    urls.line,
    "https://social-plugins.line.me/lineit/share?url=https%3A%2F%2Fexample.com%2Fa%20b%2F"
  );
  assert.equal(
    urls.bluesky,
    "https://bsky.app/intent/compose?text=%E9%81%8A%E3%82%93%E3%81%A7%26%E7%AC%91%E3%81%88%E3%82%8B%20https%3A%2F%2Fexample.com%2Fa%20b%2F"
  );
});

test("buildShareUrls: note の共有URLを、URLをエンコードして組み立てる", () => {
  const urls = buildShareUrls("https://example.com/a b/", "遊んで&笑える");
  assert.equal(
    urls.note,
    "https://note.com/intent/post?url=https%3A%2F%2Fexample.com%2Fa%20b%2F"
  );
});

test("formatDate: YYYY/MM/DD 形式にする", () => {
  assert.equal(formatDate("2026-10-05"), "2026/10/05");
});
