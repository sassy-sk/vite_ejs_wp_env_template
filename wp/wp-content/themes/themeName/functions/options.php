<?php
/**
 * 管理画面にページを作成
 */
function my_setting_admin_sidebar_banner_path() {
  require get_theme_file_path('/admin-sidebar.php');
}
add_action('admin_menu', 'my_add_admin_sidebar_banner_page');
function my_add_admin_sidebar_banner_page() {
  add_menu_page('サイドバー設定', 'サイドバー設定', 'manage_options', 'sidebar-banner', 'my_setting_admin_sidebar_banner_path', 'dashicons-search', 90);
  add_action('admin_init', 'my_register_setting');
}
function my_register_setting() {
  // 必要に応じて設定を登録してください。
  // 例:
  // register_setting('sidebar_banner_group', 'sidebar_banner_options');
}

add_filter('acf/location/rule_values/options_page', function($choices){
  $choices['sidebar-banner'] = 'サイドバー設定';
  return $choices;
});
add_filter('acf/location/rule_match/options_page', function($match, $rule, $screen){
  $current = isset($_GET['page']) ? $_GET['page'] : '';
  if ($rule['operator'] === '==') return $current === $rule['value'];
  if ($rule['operator'] === '!=') return $current !== $rule['value'];
  return $match;
}, 10, 3);