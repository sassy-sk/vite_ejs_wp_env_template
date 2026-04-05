# コーディングルール

---

## プロジェクト構造

```
src/
  index.html          # EJSエントリーポイント（ページごとに配置）
  common/             # _head.ejs / _header.ejs / _footer.ejs
  parts/              # 再利用パーツ（_c-xxx.ejs / _p-xxx.ejs）
  js/                 # script.js（エントリー）+ _xxx.js（機能別）
  sass/
    styles.scss       # エントリー（@use でglobal/base/objectを読み込む）
    global/           # _setting.scss / _breakpoints.scss / _function.scss / _index.scss
    base/             # _reset.scss / _base.scss
    object/
      layout/         # _l-xxx.scss
      component/      # _c-xxx.scss
      project/        # _p-xxx.scss
      utility/        # _utilitySet.scss / _keyframes.scss

wp/wp-content/themes/themeName/
  functions.php       # require_onceで各機能ファイルを読み込むだけ
  functions/          # init / script / link / path / admin / security など
  parts/              # c-list.php / c-card.php / form.php / picture.php など
  front-page.php / page.php / single.php / archive.php など
```

---

## EJS ルール

### ファイル命名

- パーツファイルはアンダースコア始まり：`_c-card.ejs`、`_p-header.ejs`
- コンポーネント系は `_c-`、プロジェクト固有は `_p-`、共通は `common/` 配下

### データの渡し方

- ページ固有データはページ先頭でEJS変数として定義し、`include` 時に渡す
- `baseMeta` オブジェクトに `title / desc / path / incPath / page / image` を持たせる

```ejs
<% baseMeta = {
  title: 'ページタイトル',
  desc: 'ディスクリプション',
  path: './',
  incPath: '',
  page: 'top',
  image: './assets/images/',
}; %>

<%- include(baseMeta.incPath + 'common/_head', { baseMeta }) %>
<%- include(baseMeta.incPath + 'parts/_c-card', { link: '#', title: 'タイトル' }) %>
```

### EJS構文

- 出力（エスケープあり）：`<%= value %>`
- 出力（エスケープなし）：`<%- include(...) %>`
- ロジック：`<% if / forEach %>`
- コメント：`<%# コメント %>`
- `forEach` でループ、`if` で条件分岐

### パス

- `baseMeta.path` で相対パスのルートを統一（深い階層でも `../../` を避ける）
- 画像は `baseMeta.image + 'common/noImg.jpg'` の形式

---

## SCSS ルール

### グローバル参照

- 各SCSSファイル先頭に `@use '../../global' as *;` を記述
- `global/_index.scss` が `_setting.scss / _breakpoints.scss / _function.scss` を転送

### BEM命名規則

- Block: `.c-card` / `.p-header` / `.l-inner`
- Element: `.c-card__img` / `.c-card__title`
- Modifier: `.c-btn--lg` / `.is-active`（状態変化は `is-` プレフィックス）

### SCSSのネスト記法

- **ブロックの中にエレメントを入れ子で書く**（1つのコンポーネントとして視覚的にまとまりを持たせる）
- エレメントの中にエレメントは入れ子しない（階層が深くなるため）
- `&__` などクラス名の省略はしない（検索性・可読性のため、フルクラス名で書く）
- 擬似要素・擬似クラスは `&` を使ってOK

```scss
.c-list {
  display: grid;

  // 擬似要素は & でOK
  &::after {
    content: '';
    display: block;
  }

  // メディアクエリも & でOK
  @include mq(md) {
    grid-column: span 1;
  }

  // エレメントはブロックの中に入れ子（フルクラス名で書く）
  .c-list__meta {
    display: flex;
  }

  .c-list__title {
    font-size: rem(18);
  }

  // エレメントの中にエレメントは入れ子しない
  // .c-list__meta {
  //   .c-list__time { } // NG
  // }
}
```

### モディファイアとdata属性

- モディファイア（`--`）の使用は最小限にする
- 同じコンポーネントのレイアウトパターン違いは `data-` 属性でCSSを切り替える

```html
<!-- 悪い例：モディファイアで管理 -->
<div class="c-card c-card--horizontal">...</div>
<div class="c-card c-card--vertical">...</div>

<!-- 良い例：data属性で管理 -->
<div class="c-card" data-layout="horizontal">...</div>
<div class="c-card" data-layout="vertical">...</div>
```

```scss
.c-card {
  display: grid;

  // デフォルト（縦並び）
  grid-template-columns: 1fr;

  // 横並びパターン
  &[data-layout="horizontal"] {
    grid-template-columns: 40% 1fr;
  }

  // 画像なしパターン
  &[data-type="text-only"] {
    .c-card__img {
      display: none;
    }
  }
}
```

### プレフィックス規則


| プレフィックス | 用途                                 |
| ------- | ---------------------------------- |
| `l-`    | レイアウト（`.l-inner`）                  |
| `c-`    | 汎用コンポーネント（`.c-btn`, `.c-card`）     |
| `p-`    | プロジェクト固有（`.p-header`, `.p-tab`）    |
| `u-`    | ユーティリティ（`.u-desktop`, `.u-mobile`） |
| `js-`   | JSフック用クラス（スタイルは当てない）               |


### メディアクエリ

- デフォルトは **PCファースト**（`$startFrom: pc`）
- `@include mq()` で指定（デフォルトは `md = 767px`）
- SP向け：`@include mq(md) { }` / PC限定：`@include mq(mdOut) { }`

```scss
.c-card {
  display: grid;
  @include mq(md) {
    // 767px以下（SP）
  }
}
```

### レスポンシブ対応（横並びセクション）

- 横並びレイアウトは基本 `display: grid` を使用
- **優先①** `auto-fill` / `auto-fit` + `minmax()` でメディアクエリなしにレスポンシブ対応する
- **優先②** それが難しいレイアウトの場合は、`@include mq()` またはコンテナクエリで対応する

#### 優先①：auto-fill / auto-fit（メディアクエリ不要）

カード一覧など、均等幅の繰り返しレイアウトに使う。

```scss
// auto-fill：列数を埋められるだけ埋める（空列が残ることがある）
.c-cardWrap {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 24px;
}

// auto-fit：空列を詰めて伸ばす（要素が少ない場合に均等に広がる）
.c-cardWrap {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 24px;
}
```

> `minmax()` の最小値はデザインカンプの要素幅 × 0.7 を目安にする。

#### 優先②：メディアクエリ / コンテナクエリ

画像＋テキストの横並びなど、列比率が異なるレイアウトに使う。

- 固定側をパーセント指定・可変側を `1fr` にする（`grid-template-columns: 40% 1fr`）
- それぞれの要素がデザインカンプサイズの **70%より小さくなる地点** で縦並びに変更する
- 既存ブレークポイント（`sm / md / lg / xl`）に合う場合は `@include mq()` を使う
- 合わない場合は `@media` を直接書かず、**コンテナクエリ**で対応する
- コンテナ名は必ず付ける。命名は `--` プレフィックスのケバブケース（例：`--media-box`）
- `container` ショートハンドで名前とタイプをまとめて指定する

```scss
// @include mq() で対応できる場合
.p-media {
  display: grid;
  grid-template-columns: 40% 1fr;
  gap: 40px;

  @include mq(md) {
    grid-template-columns: 1fr;
  }
}

// 既存ブレークポイントと合わない場合はコンテナクエリ
.p-media-wrap {
  container: --media-box / inline-size;
}

.p-media {
  display: grid;
  grid-template-columns: 40% 1fr;
  gap: 40px;

  @container --media-box (max-width: 680px) {
    grid-template-columns: 1fr;
  }
}
```

### CSS変数（`:root`で定義済み）

```
--inner: 1100px相当          インナー幅
--padding-pc: 25px           PCパディング
--padding-sp: 20px           SPパディング
--base-color: #666           基本文字色
--base-background: #fff
--duration: 0.3s ease        トランジション
--leading-trim: ...          行間の余白補正
```

### ユーティリティ関数

```scss
rem(16)          // 16px → rem換算
vw(1440, 100)    // 100 / 1440 * 100vw
rfz(14, 18, 375, 1440)  // レスポンシブ可変フォントサイズ
```

### SCSSファイル追加時

- `styles.scss` の `@use "./object/**/*"` がglobで自動読み込みされるため、`object/` 配下に作成すれば自動で反映される
- `global/` に追加した場合は `_index.scss` への `@forward` を忘れずに

### 保守性ルール

#### 画像の指定

- `width` を指定し、`height` は `auto`
- 縦横比は `aspect-ratio` で指定する
- `img` には必ず `object-fit: cover` を指定する

```scss
img {
  width: 100%;
  height: auto;
  aspect-ratio: 16 / 9;
  object-fit: cover;
}
```

#### 高さの指定

- 全ての要素に対して極力 `height` は指定しない
- 要素の高さは**コンテンツの分量で決まる**ものとする
- 高さが必要な場合は `padding` で対応する

#### 差し替え・追加削除への対応

- 画像・テキストの差し替え、要素の追加・削除が起きても崩れない構造にする
- 固定値で要素を配置せず、フレキシブルな設計を優先する

### 論理プロパティ（Logical Properties）

`top / bottom / left / right` は使わず、論理プロパティを使用する。


| 使わない書き方          | 使う書き方                  |
| ---------------- | ---------------------- |
| `padding-top`    | `padding-block-start`  |
| `padding-bottom` | `padding-block-end`    |
| `padding-left`   | `padding-inline-start` |
| `padding-right`  | `padding-inline-end`   |
| `margin-top`     | `margin-block-start`   |
| `margin-bottom`  | `margin-block-end`     |
| `margin-left`    | `margin-inline-start`  |
| `margin-right`   | `margin-inline-end`    |


---

## JavaScript ルール

### ファイル構成

- エントリー：`src/js/script.js`（`import` でまとめるだけ）
- 機能別：`src/js/_xxx.js`（アンダースコア始まり）

### 基本スタイル

- `document.addEventListener('DOMContentLoaded', () => { })` でラップ
- DOM取得後に存在チェックを入れてから処理

```js
const el = document.querySelector('.js-target');
if (el) {
  // 処理
}
```

### JSフッククラス

- JSで操作するクラスは必ず `js-` プレフィックス：`.js-tab`, `.js-modal`, `.js-accordion`
- 状態クラスは `is-active` / `is-open` / `is_active`（既存に合わせる）
- `js-` クラスにはCSSスタイルを当てない

### 状態変化の表現

- JSから `element.style.xxx` で直接CSSを操作しない
- 可能な限り、クラスまたは属性値のつけ外しで状態変化を表現し、見た目の制御はCSSに委譲する

```js
// 悪い例
el.style.display = 'none';
el.style.opacity = '0';

// 良い例（クラス）
el.classList.add('is-active');
el.classList.remove('is-active');
el.classList.toggle('is-open');

// 良い例（属性値）
el.setAttribute('aria-expanded', 'true');
el.setAttribute('aria-hidden', 'false');
el.setAttribute('data-state', 'open');
```

```scss
// CSS側で状態に応じたスタイルを定義する
.c-drawer {
  opacity: 0;
  visibility: hidden;

  &.is-open {
    opacity: 1;
    visibility: visible;
  }
}

// aria属性を使う場合
.c-accordion__body {
  display: none;

  &[aria-hidden="false"] {
    display: block;
  }
}
```

### aria属性

- インタラクティブ要素には `aria-expanded` / `aria-hidden` / `aria-label` を適切に設定
- タブ：`role="tablist"` / `role="tab"` / `role="tabpanel"`
- モーダル：`<dialog>` 要素を使用、`aria-labelledby` / `aria-describedby` を設定

### jQueryとバニラJS

- jQueryは読み込まれているが、新規コードは**バニラJSで書く**

---

## WordPress ルール

### テーマ構造（`wp/wp-content/themes/themeName/`）

- `functions.php` は `require_once` のみ。処理は `functions/` 配下に分割
- パーツは `parts/` 配下、`get_template_part('parts/c-card')` で呼び出す
- ページテンプレートは `page-{slug}.php` の命名規則

### 画像出力

- 画像は必ず `image_path_webp()` 関数を使う（開発環境 / 本番環境を自動切替）

```php
<img src="<?= image_path_webp('common/noImg.jpg') ?>" alt="">
```

### テンプレートタグ

- `get_header()` / `get_footer()` で共通パーツを読み込む
- データ出力は `<?= $var ?>` （`echo` の省略形）
- ループ処理は `foreach` の代替構文を使う

```php
<?php foreach ($items as $item) : ?>
  ...
<?php endforeach; ?>
```

### EJSとの対応

EJSテンプレートとWordPressテンプレートは同じHTML構造・CSSクラスを共有する。
EJSで作ったパーツをWPに移植する際は以下を対応させる：


| EJS                                      | WordPress                                     |
| ---------------------------------------- | --------------------------------------------- |
| `<%= value %>`                           | `<?= $value ?>`                               |
| `<%- include('parts/_c-card', {...}) %>` | `<?php get_template_part('parts/c-card'); ?>` |
| `baseMeta.image + 'path.jpg'`            | `image_path_webp('path.jpg')`                 |
| `<% arr.forEach(item => { %>`            | `<?php foreach ($arr as $item) : ?>`          |


### セキュリティ

- テンプレート内の変数出力は `esc_html()` / `esc_url()` / `esc_attr()` でエスケープ
- フォームは Contact Form 7 を使用

---

## 共通ルール

- インデント：スペース2つ
- コメントは日本語
- 変数名・関数名・クラス名は英語（キャメルケースまたはケバブケース）
- アクセシビリティ（WAI-ARIA）を意識して実装する

### セマンティックHTML

- アコーディオンは可能な限り `<details>` / `<summary>` を使う
- モーダルは可能な限り `<dialog>` 要素を使う

```html
<!-- アコーディオン -->
<details class="c-details">
  <summary class="c-details__btn">続きを見る</summary>
  <div class="c-details__body">...</div>
</details>

<!-- モーダル -->
<dialog id="modal01" class="c-modal" aria-labelledby="modal01-title">
  <div class="c-modal__inner">
    ...
    <button type="button" aria-label="モーダルを閉じる" data-modal-close></button>
  </div>
</dialog>
```

> `<dialog>` は `showModal()` / `close()` で開閉する。フォーカストラップ・ESCキー閉じはブラウザが標準で処理するため、自前で実装しない。

