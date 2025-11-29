<?php

/**
 * 各種Path設定
 */

//localhostの場合のみ開発モードを有効にする
define('WORDPRESS_DEV', in_array($_SERVER['HTTP_HOST'], ['localhost', '127.0.0.1', 'localhost:8080', 'localhost:3000']) || strpos($_SERVER['HTTP_HOST'], 'localhost:') === 0);

// 画像path設定
function my_image_path()
{
	if (WORDPRESS_DEV) {
		return get_template_directory_uri() . '/assets/images/';
	} else {
		return get_template_directory_uri() . '/assets/images/';
	}
}
