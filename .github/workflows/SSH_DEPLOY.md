# SSH デプロイ仕様

SSH + rsync を使ったWordPressテーマの自動デプロイ設定です。

---

## ファイル構成

| ファイル | 対象環境 | トリガー |
|---|---|---|
| `ssh_staging.yml` | ステージング | `dev` ブランチへのプッシュ / 手動実行 |
| `ssh_production.yml` | 本番 | リリース公開 / 手動実行 |

---

## デプロイフロー

### ステージング

```
dev ブランチへプッシュ（またはマージ）
    ↓
GitHub Actions 自動起動
    ↓
npm ci → npm run build
    ↓
SSH接続 → rsync でテーマを転送
```

### 本番

```
GitHub でリリース（タグ）を公開
    ↓
GitHub Actions 自動起動
    ↓
npm ci → npm run build
    ↓
dry-run（差分確認）
    ↓
SSH接続 → rsync でテーマを転送
```

---

## 事前準備

### 1. サーバー側の確認

rsync がインストールされていること（デフォルトでは入っていない場合あり）

```bash
# インストール確認
rsync --version

# インストール（Ubuntu/Debian）
sudo apt install rsync

# インストール（CentOS/RHEL）
sudo yum install rsync
```

### 2. SSH鍵の準備

デプロイ用のSSH鍵ペアを生成

```bash
ssh-keygen -t ed25519 -C "github-actions-deploy"
```

- 秘密鍵 → GitHub Secrets に登録
- 公開鍵 → サーバーの `~/.ssh/authorized_keys` に追加

### 3. 本番用 PROD_KNOWN_HOSTS の取得

```bash
ssh-keyscan -H <サーバーのIPアドレス>
```

出力をそのまま `PROD_KNOWN_HOSTS` として GitHub Secrets に登録する

---

## GitHub Secrets の設定

GitHubリポジトリの **Settings → Secrets and variables → Actions** で登録する

### ステージング

| Secret名 | 内容 |
|---|---|
| `STAGING_SSH_KEY` | SSH秘密鍵 |
| `STAGING_SSH_HOST` | サーバーのIPアドレスまたはホスト名 |
| `STAGING_SSH_USER` | SSHユーザー名 |

### 本番

| Secret名 | 内容 |
|---|---|
| `PROD_SSH_KEY` | SSH秘密鍵 |
| `PROD_SSH_HOST` | サーバーのIPアドレスまたはホスト名 |
| `PROD_SSH_USER` | SSHユーザー名 |
| `PROD_KNOWN_HOSTS` | `ssh-keyscan` で取得したホストのfingerprint |

---

## ワークフローの設定

### テーマ名の変更

各ワークフローファイルの `env.THEME_NAME` をプロジェクトのテーマ名に変更する

```yaml
env:
  THEME_NAME: your-theme-name # ここを変更
```

**注意:** `paths` フィルターには `env` の変数が使えないため、テーマ名を変更した場合は `paths` 内のテーマ名も合わせて変更すること

```yaml
paths:
  - 'wp/wp-content/themes/your-theme-name/**' # ここも変更
```

### デプロイ先パス

デフォルトは Bitnami WordPress 構成を想定

```
/bitnami/wordpress/wp-content/themes/<THEME_NAME>/
```

環境が異なる場合はワークフローファイル内の rsync コマンドのパスを変更する

---

## 手動実行方法

1. GitHubリポジトリを開く
2. **Actions** タブをクリック
3. 左メニューから対象のワークフローを選択
4. **Run workflow** ボタンをクリック

---

## 本番 dry-run モード

手動実行時に dry-run（差分確認のみ）モードで実行できます。

1. Actions タブ → **Production Deploy** を選択
2. **Run workflow** をクリック
3. **Dry run only** にチェックを入れて実行
4. ログで差分を確認（実際のデプロイは行われない）

リリース公開時は常に通常デプロイが実行されます。

---

## 注意事項

- `--delete` オプションにより、**ローカルにないファイルはサーバーから削除される**（対象はテーマフォルダ内のみ）
- 同時デプロイは `concurrency` により防止されている（後のジョブは待機）
- ジョブは **15分でタイムアウト**（ハング防止）
- チェックアウトは浅いクローン（`fetch-depth: 1`）で高速化
