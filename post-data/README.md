# post-data

WP-CLIを使ってローカル環境（wp-env）にテスト投稿を一括作成するためのデータフォルダです。

## セットアップ

### 1. package.jsonにscriptを追加
```json
"scripts": {
  "wp-post:create": "node scripts/create-posts.js"
}
```

### 2. ファイル構成
```
post-data/
  README.md
  faq.json
scripts/
  create-posts.js  # JSONを読み込んでwp-envのWP-CLIに投稿を流し込むスクリプト
```

## 使い方
```bash
npm run wp-post:create -- post-data/[ファイル名].json
```

## JSONフォーマット
```json
{
  "config": {
    "post_type": "投稿タイプのスラッグ",
    "taxonomy": "タクソノミーのスラッグ",
    "thumbnail": "アイキャッチ画像のURL or パス（不要な場合はnull）"
  },
  "posts": [
    {
      "title": "タイトル",
      "excerpt": "抜粋（不要な場合は空文字）",
      "content": "本文（HTMLタグ使用可）",
      "category_slug": "カテゴリーのスラッグ",
      "thumbnail": true
    }
  ]
}
```

## ファイル一覧

| ファイル名 | 投稿タイプ | タクソノミー |
|---|---|---|
| faq.json | faq | faq_category |

## 注意事項

- カテゴリーは事前に管理画面で作成しておく必要があります
- `the_content()` を使用している場合、本文のpタグは不要です
- アイキャッチ画像はwp-envコンテナ内からアクセスできるパスを指定してください