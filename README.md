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
```  
```
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
- `functions/script.php`の`define('WORDPRESS_DEV', true);`をtrueで開発サーバー、falseで本番環境のcss、jsを読み込むようにしているのでデプロイ時には必ずfalseにしたフォイルをアップしてください。  
- 画像はpublicフォルダ内のものはWordPress側では認識されません。画像ファイルを追加した場合は`npm run build`を実行しWordPress本体に画像をコンパイルしてください。

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
# vite_ejs_wp_env_template
