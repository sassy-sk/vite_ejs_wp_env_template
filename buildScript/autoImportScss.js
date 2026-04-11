import fs from 'fs';
import path from 'path';
import { globSync } from 'glob';

const STYLES_PATH = 'src/sass/styles.scss';

// インポートグループ（この順序でstyles.scssに出力される）
// global/ は各ファイルが @use '../../global' as * で個別にインポートするため除外
const GROUPS = [
  { dir: 'src/sass/base', label: 'base' },
  { dir: 'src/sass/object/layout', label: 'layout' },
  { dir: 'src/sass/object/component', label: 'component' },
  { dir: 'src/sass/object/project', label: 'project' },
  { dir: 'src/sass/object/utility', label: 'utility' },
];

// styles.scssからの相対パスに変換し、_プレフィックスと拡張子を除去
function toUsePath(filePath) {
  const stylesDir = path.dirname(STYLES_PATH);
  const relative = path.relative(stylesDir, filePath).replace(/\\/g, '/');
  return './' + relative
    .replace(/\.scss$/, '')
    .replace(/\/_([^/]+)$/, '/$1'); // /_filename → /filename
}

function generateContent() {
  const lines = [
    '/* このファイルは自動生成されます。直接編集しないでください。 */',
    '/* buildScript/autoImportScss.js によって生成 */',
    '',
  ];

  for (const { dir, label } of GROUPS) {
    const files = globSync(`${dir}/_*.scss`).sort();
    if (files.length === 0) continue;
    lines.push(`/* ${label} */`);
    for (const file of files) {
      lines.push(`@use "${toUsePath(file)}";`);
    }
    lines.push('');
  }

  return lines.join('\n');
}

function regenerate() {
  fs.writeFileSync(STYLES_PATH, generateContent(), 'utf-8');
  console.log('[auto-import-scss] styles.scss を更新しました');
}

// 監視対象かどうかの判定（old/ と global/ は除外）
function isTarget(filePath) {
  return filePath.endsWith('.scss')
    && !filePath.includes('/old/')
    && !filePath.includes('/global/');
}

export default function autoImportScss() {
  return {
    name: 'auto-import-scss',
    // ビルド開始時・dev起動時に styles.scss を生成
    buildStart() {
      regenerate();
    },
    // dev サーバー起動時にファイル追加・削除を監視
    configureServer(server) {
      server.watcher.on('add', (filePath) => {
        if (isTarget(filePath)) regenerate();
      });
      server.watcher.on('unlink', (filePath) => {
        if (isTarget(filePath)) regenerate();
      });
    },
  };
}
