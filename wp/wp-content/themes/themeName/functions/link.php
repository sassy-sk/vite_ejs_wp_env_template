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