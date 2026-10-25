// 作品データ。新しい作品を出したらここに1件追加するだけでOK。
// 公開日(date)から30日間は自動で NEW! が付き、更新履歴にも自動で載る。
// サムネイルは GitHub Pages の作品は OGP 画像（1200x630）を直接参照、
// unityroom の作品はアイコンを images/thumbs/ にコピーして使っている。
window.WORKS = [
  {
    title: "回文ケンカゴマ",
    category: "game",
    platform: "ブラウザ",
    url: "https://sakuichi.github.io/kaibun-koma/",
    thumb: "https://sakuichi.github.io/kaibun-koma/ogp.png?v=2",
    description: "回文を入れると、その文字が乗ったコマがスタジアムで回る。挑戦リンクで友だちの回文コマとぶつけ合おう。",
    date: "2026-10-24",
  },
  {
    title: "いたずラッシュ大盛り！",
    category: "game",
    platform: "ブラウザ",
    url: "https://sakuichi.github.io/itazu-rush/oomori/",
    thumb: "https://sakuichi.github.io/itazu-rush/oomori/ogp.png",
    description: "何が出るか分からない、いたずら20本勝負。最後に大人の現実が待っています。",
    date: "2026-10-23",
  },
  {
    title: "いたずラッシュ",
    category: "game",
    platform: "ブラウザ",
    url: "https://sakuichi.github.io/itazu-rush/",
    thumb: "https://sakuichi.github.io/itazu-rush/ogp.png",
    description: "子どものころにやりたかったいたずらを、数秒ずつやり放題。最後に大人の現実が待っています。",
    date: "2026-10-09",
  },
  {
    title: "くしゃポイ",
    category: "game",
    platform: "ブラウザ",
    url: "https://sakuichi.github.io/kusha-poi/",
    thumb: "https://sakuichi.github.io/kusha-poi/ogp.png",
    description: "イヤなことを紙に書いて、くしゃくしゃに丸めて、ぶん投げる。ネガティブなほど遠くへ飛びます。",
    date: "2026-10-09",
  },
  {
    title: "ダジャレ布団飛ばし",
    category: "game",
    platform: "ブラウザ",
    url: "https://sakuichi.github.io/ofuton-flyer/",
    thumb: "https://sakuichi.github.io/ofuton-flyer/ogp.png",
    description: "ダジャレを入れると、出来ばえの分だけ布団がふっ飛びます。飛距離を競おう。",
    date: "2026-10-06",
  },
  {
    title: "開発あるある図鑑",
    category: "web",
    platform: "ブラウザ",
    url: "https://sakuichi.github.io/dev-sim-lab/",
    thumb: "https://sakuichi.github.io/dev-sim-lab/assets/ogp/index.png?v=1",
    description: "品質・コスト・納期、人員計画、稼働率…ソフトウェア開発でよくある誤解を、シミュレーターで体験できるシリーズサイト。",
    date: "2026-07-10",
  },
  {
    title: "徳積みゲー",
    category: "game",
    platform: "unityroom",
    url: "https://unityroom.com/games/tokutsumi",
    thumb: "images/thumbs/tokutsumi.png",
    description: "ひたすら「徳」を積むゲーム。俗世から離れてひと息つきながら、ひとりでゆっくり「徳」を積みましょう。",
    date: "2026-06-28",
  },
];
