<?php

/**
 * 各種Path設定
 */

// 画像path設定
function my_image_path()
{
	if (WORDPRESS_DEV) {
		return get_template_directory_uri() . '/assets/images/';
	} else {
		return get_template_directory_uri() . '/assets/images/';
	}
}
