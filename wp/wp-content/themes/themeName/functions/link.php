<?php 

/**
 * 各ページリンク設定
 */

function get_my_urls()
{
	return array(
		'top' => esc_url(home_url("/")),
		'about' => esc_url(home_url("/about/")),
		'solution' => esc_url(home_url("/solution/")),
		'sustainability' => esc_url(home_url("/sustainability/")),
		'news' => esc_url(home_url("/news/")),
		'contact' => esc_url(home_url("/contact/")),
		'privacy' => esc_url(home_url("/privacy/")),
		'company' => esc_url(home_url("/company/")),
		'message' => esc_url(home_url("/message/")),
		'organization' => esc_url(home_url("/organization/")),
		'officer' => esc_url(home_url("/officer/")),
		'history' => esc_url(home_url("/history/")),
		'recruit' => "",
	);
}


function get_header_menu_urls()
{
	$urls = get_my_urls();
	return array(
		['title' => '事業紹介', 'url' => $urls['solution']],
		['title' => 'サステナビリティ', 'url' => $urls['sustainability']],
		['title' => 'お知らせ', 'url' => $urls['news']],
		['title' => '採用情報', 'url' => $urls['recruit']],
		['title' => 'お問い合わせ', 'url' => $urls['contact']],
	);
}

function get_sub_menu_urls()
{
	$urls = get_my_urls();
	return array(
		['title' => '私たちについて', 'url' => $urls['about']],
		['title' => '会社概要', 'url' => $urls['company']],
		['title' => '代表挨拶', 'url' => $urls['message']],
		['title' => '組織体制', 'url' => $urls['organization']],
		['title' => '役員紹介', 'url' => $urls['officer']],
		['title' => '沿革', 'url' => $urls['history']],
	);
}