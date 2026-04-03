<?php

/**
 * 各種Path設定
 */

// 画像path設定
// image_path_webp('common/noImg.jpg');
function image_path_webp($image_path = '')
{
	if (WORDPRESS_DEV) {
		// 開発環境の場合、Viteの開発サーバーからアセットを読み込む
		return 'http://localhost:3200/assets/images/' . $image_path;
	} else {
		$base_path = get_template_directory_uri() . '/assets/images/';
		// 本番環境の場合、jpg/pngをwebpに変換
		$image_path = preg_replace('/\.(jpg|jpeg|png)$/i', '.webp', $image_path);
		return $base_path . $image_path;
	}
}
