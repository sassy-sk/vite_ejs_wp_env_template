## ファイルの特徴
- EJS兼WordPress用vite環境ファイル
- 最初に必ずdev.config.jsonを編集してejsかWordPressかを設定してください
- EJSの場合はsrcのejs,scss,jsを編集、distにコンパイルされる
- WordPressの場合はsrcのscss.jsを編集、wp/wp-content/themes/テーマにコンパイルされる。phpはwp/wp-content/themes/テーマを直接編集  
- 画像はpublicフォルダに格納、デフォではbuild時にwebpに変換されます。
- WordPressはdocker及びwp-envを使用する前提で調整しています。docker以外の場合はフォルダ構成を変更する必要があります。
- GitHubActions自動デプロイ対応

## ファイル構成   
∟ dist ・・・本番用（ejs）  
　∟ assets  
　　∟ css  
　　∟ images  
　　∟ js  
　∟ index.html

∟ src ・・・開発用  
　∟ index.html  
　∟ common ・・・EJS共通ファイル  
　∟ parts ・・・EJSパーツファイル  
　∟ images  
　∟ js  
　∟ sass  
　　∟ base ・・・リセット系    
　　∟ utility ・・・共通SCSS  
　　∟ object ・・・FLOCSS対応  
　　∟ styles.scss ・・・インクルード用SCSS  
∟ wp ・・・WordPressテンプレートファイル   
∟ public ・・・viteで加工不要のファイル（画像など）  
∟ buildScript ・・・build用のnodeファイル  
∟ dev.config.json ・・・開発用設定ファイル  
∟ vite.config.js ・・・vite設定ファイル  
∟ postcss.config.cjs ・・・postcss設定ファイル  
∟ .wp-env.json ・・・docker・WordPress設定用  
∟ wp-setting.sh ・・・wp初期設定用  
∟ package.json ・・・npmパッケージ管理用  
∟ .github ・・・GitHub Actions用ymlファイル  

## このコーディングファイルの使い方
まず、以下に書いてある内容を必ずお読みください
この中身で分かることは以下のとおりです

- 使用環境
- 使い方および操作方法
- 画像出力について 

## 使用環境
- Node.js バージョン14系以上（現状検証してないので不明、とりあえず23.11.0で動作してます）
- npm バージョン8以上（現状検証してないので不明、とりあえず10.9.2で動作してます）
- バージョン確認方法：※ターミナル上でコマンドを入力すること
  - `node -v`
  - `npm -v`
- コマンドを入力後、数字がでてくれば大丈夫です
## 使い方および操作方法  
### 前提  
- dev.config.jsonで各種設定を行います
```
{
  "wordpress": true, 
  WordPressテーマファイルを使用するかどうか

  "WordPressPort": 9092,
  WordPressテーマファイルを使用する場合はポート番号を指定

  "WordPressThemeName": "test", 
  WordPressテーマファイルを使用する場合はテーマ名を指定

  "fallbackImage": false 
  画像フォールバックを使用するかどうか。falseがデフォルト。基本はコマンド操作するので直接変更はしない
}
```  
- ビルドした際はjpgやpngをwebpに変換する仕様となります。
### EJSの場合  
- ページファイルはhtml拡張子を使用、パーツファイルはejs拡張子を使用してます（viteプラグインの使用上、html拡張子ではないと認識しないため）
1. dev.config.jsonで`"wordpress": false,`に設定
2. ターミナルを開く
3. `npm i`をターミナルへ入力
4. `npm run dev`で開発ブラウザが起動します
- `npm run build`でファイルを書き出す  

以下仕様に合わせて使い分けてください
- `npm run build-format`でファイルを書き出しHTMLの整形とcssにパラメーターを付与（デフォだとbuild時にejsコード部分が空白になってしまうので使用）
- `npm run build-fallback`でファイルを書き出し、再度webpに変換せずに画像を書き出します。フォールバックをつけたい場合はこちらを使用
- `npm run build-fallback-format`で上記全てを実行  
#### 注意点 
- 新規ファイルを作成、画像ファイルを追加した場合などはviteの仕様上か認識しない時があるので、その場合は`npm run dev`を実行しvite再起動を行ってください。（改善思案中）

### WordPressの場合（docker、wp-env使用）  
- dockerの使用が前提となっているので、事前にdockerをインストールしてください  
https://www.docker.com/ja-jp/
1. .wp-env.json：WordPressの設定を確認（WordPressVer. PHPVer. ポートNo. プラグイン）
2. dev.config.jsonで`"wordpress": true,`に設定し、`WordPressPort`を.wp-env.jsonで設定したポートに合わせる、`WordPressThemeName`を指定  
3. wp/wp-content/themes/直下のフォルダを`WordPressThemeName`で設定した名前に変更（style.css内記載のテーマ名も変更）  
4. `npm i`をターミナルへ入力しパッケージをダウンロード　
```
npm i
```
5. ターミナルを開きWordPressコンテナを起動 （Dockerがは起動しておくこと） 
```
npm run wp-env start
```

6. WordPress初期設定用wp-setting.shを起動させる
```
chmod +x ./wp-setting.sh
./wp-setting.sh
```  


7. `npm run dev`で開発ブラウザが起動します
8. WordPressの管理画面（/wp-admin）に入り、テーマを開発中のものに変更（初期ユーザー名`admin`、初期パス`password`）  

上記手順1,2,3,6については初期設定となるので最初にプロジェクトファイルを作成する時のみ行ってください。  
2回目以降や初期設定が終わっているものをgitで共有された場合は4,5,7を実行すれば良い（npm i, npm run wp-env start, npm run dev）

- `npm run build`でscss,js,画像がビルドされます  

以下用途に合わせて使い分けてください  
- `npm run restart`でbuildを行い、再度viteを起動します。（build + devと同じ動き）
- `npm run build-fallback`でファイルを書き出し、再度webpに変換せずに画像を書き出します。画像をwebpだけでなく、jpgやpngとしても使う、フォールバックをつけたい場合はこちらを使用  
 

#### 注意点  
- 新規ファイルを作成した場合などはviteの仕様上か認識しない時があるので、その場合は`npm run dev`を実行しvite再起動を行ってください。（改善思案中）
- `functions/script.php`で開発サーバーと本番環境でcss、jsを切り替えて読み込むようにしているのでデプロイ時には必ず`define('WORDPRESS_DEV', false);`にし設定しアップしてください。  
- 画像は開発時はpublicフォルダの画像、本番時はビルドされた画像を読み込むように切り替えているので以下の関数を使用してください  
```
<?= image_path_webp('common/noImg.jpg'); ?>
```

#### コマンド
- WordPressコンテナを起動  
```
npm run wp-env start
```
- WordPressコンテナを停止  
```
npm run wp-env stop
```
- wp-env.jsonの内容を更新したときの再起動 
```
npm run wp-env start --update
```
- wp-env、dockerのWordPressを削除 
```
npm run wp-env destroy
```

## データベース更新するときの手順
__1人での開発の場合は任意のタイミングで手順3と4を行えばOK__
1. チームメンバーがデータベースを触っていないことを確認
2. データベースを更新
3. データベースをエクスポート
```
npm run wp-env run cli wp db export sql/wpenv.sql
```
4. Gitにあげる
5. チームメンバーに更新したことを伝える
6. チームメンバーはデータベースを更新されたデータベースをインポートする
```
npm run wp-env run cli wp db import sql/wpenv.sql
```

## 画像出力について

- 画像効率化の観点よりテンプレートを組んでいますので、以下の様式を使用してください。 （レスポンシブ、webp 対応）（現在あまり使ってません）

EJS

```
<%- include(baseMeta.path +'common/_picture', 
  { 
    baseMeta:baseMeta, 
    img:'common/image1', 
    spImg:'true', 
    spImgName:'_sp', 
    file:'.jpg',  
    alt:'ダミー画像', 
    webp:'true',
    pcWidth : '800',
    pcHeight : '800',
    spWidth : '300',
    spHeight : '300',
    async:'true', 
    lazy:'true', 
  }
) %>
```

WordPress

```
<?php
    $args = [
      'pictureImg' => 'common/image',
      'spImg' => 'true',
      'spImgName' => '',
      'alt' => '',
      'file' => '.jpg',
      'webp' => 'true',
      'pcWidth' => '850',
      'pcHeight' => '567',
      'spWidth' => '390',
      'spHeight' => '260',
      'async' => 'true',
      'lazy' => 'true',
    ];
    get_template_part('tmp/picture', null, $args);
?>
```  

# wp-env プラグイン再インストール問題の解決方法

## 問題の概要

wp-envで構築したWordPress環境で、管理画面からプラグインを削除した後、再インストールしようとすると以下のエラーが発生する：

```
インストールに失敗しました: 移動先ディレクトリはすでに存在するので、削除できませんでした。
```

## 原因

wp-envはプラグインディレクトリをDockerボリュームとしてマウントしているため、WordPress管理画面から削除しても物理的なファイルが残ってしまうことがある。

## 解決方法

### 方法1: データベースをバックアップして環境を再構築（推奨）

この方法なら、確実にクリーンな状態に戻せる。

#### 1. データベースをエクスポート

```bash
npm run wp-env run cli wp db export sql/wpenv.sql
```

#### 2. 環境を破棄

```bash
npm run wp-env destroy
```

#### 3. 環境を再起動

```bash
npm run wp-env start
```

#### 4. データベースをインポート

```bash
npm run wp-env run cli wp db import sql/wpenv.sql
```

#### 5. プラグインを再インストール（.wp-env.jsonのpluginsで設定してある場合はすでにインストールされているので不要）

```bash
npm run wp-env -- run cli wp plugin install [プラグイン名] --activate
```

### 方法2: WP-CLIで直接削除してから再インストール

簡単な場合はこちらでも対応可能。

```bash
# プラグインを削除
npm run wp-env -- run cli wp plugin delete [プラグイン名]

# 再インストール
npm run wp-env -- run cli wp plugin install [プラグイン名] --activate
```

### 方法3: Docker経由で直接削除

環境を壊したくない場合の最終手段。

#### 1. 他のwp-env環境を停止（複数環境がある場合）

```bash
# 他のプロジェクトで
npm run wp-env stop
```

#### 2. コンテナ名を確認

```bash
docker ps --format "{{.Names}}" | grep wordpress
```

#### 3. プラグインディレクトリを削除

```bash
docker exec [コンテナ名] rm -rf /var/www/html/wp-content/plugins/[プラグイン名]
```

#### 4. 再インストール

```bash
npm run wp-env -- run cli wp plugin install [プラグイン名] --activate
```

## 今後の予防策

### プラグインの削除は必ずコマンドで行う

管理画面から削除せず、以下のコマンドを使用する：

```bash
npm run wp-env -- run cli wp plugin uninstall [プラグイン名] --deactivate
```

このコマンドなら、物理的なファイルも確実に削除される。

## プラグイン名（スラッグ）の確認方法

WordPress公式ディレクトリのURLから確認できる：

```
https://ja.wordpress.org/plugins/advanced-custom-fields/
                                 ^^^^^^^^^^^^^^^^^^^^^^^^
                                 これがプラグイン名（スラッグ）
```

## 注意事項

### destroyで消えるもの・消えないもの

#### ❌ 消える（コンテナ内のデータ）
- データベース（投稿、固定ページ、設定など）
- コンテナ内にインストールしたプラグイン
- アップロードしたメディアファイル

#### ✅ 消えない（プロジェクトのファイル）
- テーマファイル（`page.php`, `functions.php`など）
- プラグインの開発ファイル
- `.wp-env.json`などの設定ファイル
- プロジェクトディレクトリ内の全てのコード

### データベースのエクスポート先について

`sql/wpenv.sql` のようにテーマディレクトリ内にエクスポートすれば、ローカルのプロジェクトフォルダに保存されるため、`destroy` しても消えない。

## よく使うコマンド一覧

```bash
# 環境の起動・停止
npm run wp-env start
npm run wp-env stop
npm run wp-env destroy

# プラグイン操作
npm run wp-env -- run cli wp plugin list
npm run wp-env -- run cli wp plugin install [プラグイン名] --activate
npm run wp-env -- run cli wp plugin uninstall [プラグイン名] --deactivate
npm run wp-env -- run cli wp plugin delete [プラグイン名]

# データベース操作
npm run wp-env -- run cli wp db export [ファイル名.sql]
npm run wp-env -- run cli wp db import [ファイル名.sql]

# Docker操作
docker ps | grep wordpress
docker exec [コンテナ名] [コマンド]
```

## トラブルシューティング

### `Resource busy` エラーが出る場合

1. wp-envを停止してから再起動
2. それでもダメなら `destroy` → `start`

### 複数のwp-env環境が動いている場合

他の環境を停止してから作業すると安全：

```bash
docker ps --format "{{.Names}}" | grep wordpress
```

で確認し、不要なものは停止する。

# vite_ejs_wp_env_template
