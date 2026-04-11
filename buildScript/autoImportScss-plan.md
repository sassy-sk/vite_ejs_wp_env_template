# SCSS 自動インポートプラグイン 実装プラン

## 概要

`vite-plugin-sass-glob-import` を廃止し、新規 SCSS ファイル作成時に自動で `styles.scss` へ `@use` を追記するカスタム Vite プラグインを実装する。

---

## 現状の構成

- `src/sass/styles.scss` がエントリーポイント
- 現在はワイルドカードで一括インポート
  ```scss
  @use "./base/*";
  @use "./object/**/*";
  ```
- `vite-plugin-sass-glob-import` がワイルドカードを解決している

## ディレクトリ構造（インポート順序の参考）

```
src/sass/
├── global/       # mixin・変数・関数（他ファイルから参照される）
├── base/         # リセット・ベーススタイル
├── object/
│   ├── layout/   # レイアウト
│   ├── component/# コンポーネント
│   ├── project/  # ページ固有
│   └── utility/  # ユーティリティ
└── styles.scss   # エントリーポイント（自動生成対象）
```

---

## 実装内容

### 1. ファイル構成

| ファイル | 内容 |
|---|---|
| `buildScript/autoImportScss.js` | カスタム Vite プラグイン本体 |
| `src/sass/styles.scss` | 自動生成に切り替え（手動編集不要にする） |
| `vite.config.js` | プラグイン登録・`vite-plugin-sass-glob-import` を削除 |
| `package.json` | `vite-plugin-sass-glob-import` を削除 |

### 2. プラグインの動作

**起動時 (`buildStart` フック)**
- `src/sass/` 配下の `.scss` ファイルをスキャン
- 所定の順序で `styles.scss` を自動生成して上書き

**開発中 (`configureServer` フック)**
- Vite の watcher でファイル追加・削除を監視
- `.scss` ファイルが追加されたら `styles.scss` に `@use` を追記
- `.scss` ファイルが削除されたら `styles.scss` から該当行を削除

### 3. インポート順序のルール

以下の順序でグループ化して出力する（依存関係の解決のため）：

1. `global/`
2. `base/`
3. `object/layout/`
4. `object/component/`
5. `object/project/`
6. `object/utility/`

各グループ内はアルファベット順にソート。

### 4. 除外ルール

- `styles.scss` 自身は除外
- `old/` ディレクトリ配下は除外（不要なファイルが残っているため）
- 除外パスは定数として定義し、変更しやすくする

### 5. 生成される `styles.scss` のイメージ

```scss
/* このファイルは自動生成されます。直接編集しないでください。 */
/* buildScript/autoImportScss.js によって生成 */

/* global */
@use "./global/breakpoints";
@use "./global/function";
@use "./global/index";
@use "./global/setting";

/* base */
@use "./base/base";
@use "./base/reset";

/* layout */
@use "./object/layout/l-inner";
@use "./object/layout/l-pageFooter";
@use "./object/layout/l-parts";

/* component */
@use "./object/component/c-accordion";
/* ... */

/* project */
/* ... */

/* utility */
/* ... */
```

---

## vite.config.js の変更点

```js
// 削除
import viteSassGlobImports from 'vite-plugin-sass-glob-import';

// 追加
import autoImportScss from './buildScript/autoImportScss.js';
```

```js
plugins: [
  // 削除: viteSassGlobImports(),
  autoImportScss(), // 追加
  // ... 他のプラグイン
]
```

---

## package.json の変更点

```json
// 削除
"vite-plugin-sass-glob-import": "^6.0.3"
```

---

## 注意事項

- `vite build`（サーバーなし）でも動作するよう `buildStart` フックで同期処理を行う
- `styles.scss` はコミット対象に含める（CI/CD でも動作するように）
- 既存の `styles.scss` のワイルドカード記述は削除し、自動生成に完全移行する

---

## 実装時の参考コード（プラグイン骨格）

```js
// buildScript/autoImportScss.js
import fs from 'fs';
import path from 'path';
import { globSync } from 'glob';

const STYLES_PATH = './src/sass/styles.scss';
const SCAN_BASE = './src/sass';

const IMPORT_ORDER = [
  'global',
  'base',
  'object/layout',
  'object/component',
  'object/project',
  'object/utility',
];

const EXCLUDE_DIRS = ['old'];

function generateStylesContent() {
  const lines = [
    '/* このファイルは自動生成されます。直接編集しないでください。 */',
    '/* buildScript/autoImportScss.js によって生成 */',
    '',
  ];

  for (const group of IMPORT_ORDER) {
    const files = globSync(`${SCAN_BASE}/${group}/_*.scss`).sort();
    if (files.length === 0) continue;

    lines.push(`/* ${group} */`);
    for (const file of files) {
      const relative = path.relative(path.dirname(STYLES_PATH), file)
        .replace(/\\/g, '/')
        .replace(/\.scss$/, '')
        .replace(/\/_([^/]+)$/, '/$1'); // _ プレフィックス除去
      lines.push(`@use "${relative}";`);
    }
    lines.push('');
  }

  return lines.join('\n');
}

export default function autoImportScss() {
  return {
    name: 'auto-import-scss',
    buildStart() {
      fs.writeFileSync(STYLES_PATH, generateStylesContent());
    },
    configureServer(server) {
      server.watcher.on('add', (filePath) => {
        if (filePath.endsWith('.scss')) {
          fs.writeFileSync(STYLES_PATH, generateStylesContent());
        }
      });
      server.watcher.on('unlink', (filePath) => {
        if (filePath.endsWith('.scss')) {
          fs.writeFileSync(STYLES_PATH, generateStylesContent());
        }
      });
    },
  };
}
```

> **注意:** 上記は骨格コードです。`_` プレフィックスの処理・除外ディレクトリの適用・パス解決は実装時に調整してください。
