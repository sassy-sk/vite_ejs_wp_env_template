<?php

/**
 * CSSとJavaScriptの読み込み
 *
 * @codex https://wpdocs.osdn.jp/%E3%83%8A%E3%83%93%E3%82%B2%E3%83%BC%E3%82%B7%E3%83%A7%E3%83%B3%E3%83%A1%E3%83%8B%E3%83%A5%E3%83%BC
 */

//localhostの場合のみ開発モードを有効にする
define('WORDPRESS_DEV', in_array($_SERVER['HTTP_HOST'], ['localhost', '127.0.0.1', 'localhost:8080', 'localhost:3000']) || strpos($_SERVER['HTTP_HOST'], 'localhost:') === 0);
// define('WORDPRESS_DEV', false);

function my_script_init()
{
	wp_deregister_script('jquery');
	//フォント読み込み
	wp_enqueue_style('my-font1', '//fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@100..900&display=swap');
	// jQueryの読み込み
	wp_enqueue_script('jquery', '//cdnjs.cloudflare.com/ajax/libs/jquery/3.6.0/jquery.min.js', "", "1.0.1");
	//swiper.css読み込み
	wp_enqueue_style('my-swiper-css', '//unpkg.com/swiper@8/swiper-bundle.min.css');
	//swiper.js読み込み
	wp_enqueue_script('my-swiper', '//unpkg.com/swiper@8/swiper-bundle.min.js');
	// 環境設定に基づいてアセットを読み込む
	if (WORDPRESS_DEV) {
		// 開発環境ではViteの開発サーバーからアセットを読み込む
		wp_enqueue_script('vite-client', 'http://localhost:3200/@vite/client', [], null, false);
		wp_enqueue_style('vite-css', 'http://localhost:3200/sass/styles.scss', [], null);
		wp_enqueue_script('vite-js', 'http://localhost:3200/js/script.js', [], null, true);
		// Ajax URLをJavaScriptに渡す
		// wp_localize_script('vite-js', 'wpAjax', array(
		// 	'ajaxurl' => admin_url('admin-ajax.php')
		// ));
	} else {
		//本番環境ではビルドされたアセットを読み込む
		wp_enqueue_style('my-css', get_template_directory_uri() . '/assets/css/styles.css', array(), filemtime(get_template_directory() . '/assets/css/styles.css'), 'all');
		wp_enqueue_script('my-js', get_template_directory_uri() . '/assets/js/script.js', array(), '1.0.1', true);
		// Ajax URLをJavaScriptに渡す
		// wp_localize_script('my-js', 'wpAjax', array(
		// 	'ajaxurl' => admin_url('admin-ajax.php')
		// ));
	}
}
add_action('wp_enqueue_scripts', 'my_script_init');


if (WORDPRESS_DEV) {
	// 開発環境用 Viteのscriptタグにtype="module"を追加
	add_filter('script_loader_tag', function ($tag, $handle) {
		if (in_array($handle, ['vite-js', 'vite-client'])) {
			return str_replace('<script ', '<script type="module" ', $tag);
		}
		return $tag;
	}, 10, 2);
}
