<?php
// カスタム投稿タイプ設定（配列ベース）
$custom_post_types = [
  'work' => [
    'label' => '実績',
    'taxonomies' => [
      'work_category' => 'カテゴリー'
    ],
  ],
  'recruit' => [
    'label' => '採用情報',
    'taxonomies' => [
      'recruit_category' => 'カテゴリー1',
      'recruit_special_category' => 'カテゴリー2',
      'recruit_course_category' => 'カテゴリー3'
    ],
    'rewrite' => [
      'slug' => 'result/recruit',
      'with_front' => false,
    ],
  ],
];

// タクソノミー設定（重複登録を防ぐため）
$registered_taxonomies = [];

// カスタム投稿タイプとタクソノミーを一括登録
add_action('init', function () use ($custom_post_types, &$registered_taxonomies) {
  foreach ($custom_post_types as $post_type => $config) {
    // カスタム投稿タイプを登録
    register_post_type($post_type, [
      'label' => $config['label'],  //管理画面表示名
      'labels' => [
        'name' => $config['label'],
        'singular_name' => $config['label'],
        'menu_name' => $config['label'],
        'all_items' => $config['label'] . '一覧',
        'add_new' => '新規追加',
        'add_new_item' => '新規' . $config['label'] . 'を追加',
        'edit_item' => $config['label'] . 'を編集',
        'new_item' => '新しい' . $config['label'],
        'view_item' => $config['label'] . 'を表示',
        'search_items' => $config['label'] . 'を検索',
        'not_found' => $config['label'] . 'が見つかりません',
        'not_found_in_trash' => 'ゴミ箱に' . $config['label'] . 'はありません',
      ],
      'public' => true,
      'supports' => ['thumbnail', 'title', 'editor', 'excerpt', 'page-attributes', 'revisions'],  //表示する内容
      'has_archive' => isset($config['has_archive']) ? $config['has_archive'] : true,
      'rewrite' => isset($config['rewrite']) ? $config['rewrite'] : true,
      'hierarchical' => true,  //階層構造（親子関係）の設定ができる　supportsにpage-attributesが必要
      'show_in_rest' => true, //ブロックエディターに対応
    ]);

    // タクソノミーを登録（設定がある場合のみ）
    if (!empty($config['taxonomies'])) {
      foreach ($config['taxonomies'] as $taxonomy_name => $taxonomy_label) {
        // 既に登録済みのタクソノミーは再登録しない（共有タクソノミー対応）
        if (!in_array($taxonomy_name, $registered_taxonomies)) {
          register_taxonomy($taxonomy_name, [$post_type], [
            'label' => $taxonomy_label,  //管理画面表示名
            'hierarchical' => true,  //階層構造（親子関係）の設定ができる 管理画面でチェックボックス形式で出せる
            'show_in_rest' => true, //ブロックエディターに対応
          ]);
          $registered_taxonomies[] = $taxonomy_name;
        } else {
          // 既存のタクソノミーに投稿タイプを追加
          register_taxonomy_for_object_type($taxonomy_name, $post_type);
        }
      }
    }
  }
});

// 投稿一覧にタクソノミーを表示（一括設定）
foreach ($custom_post_types as $post_type => $config) {
  // タクソノミー設定がある場合のみ処理
  if (!empty($config['taxonomies'])) {
    // 投稿一覧にタクソノミー列を追加
    add_filter("manage_{$post_type}_posts_columns", function ($columns) use ($config) {
      foreach ($config['taxonomies'] as $taxonomy_name => $taxonomy_label) {
        $columns[$taxonomy_name] = $taxonomy_label;
      }
      return $columns;
    });

    // タクソノミー列の内容を表示
    add_action("manage_{$post_type}_posts_custom_column", function ($column, $post_id) use ($config) {
      foreach ($config['taxonomies'] as $taxonomy_name => $taxonomy_label) {
        if ($column == $taxonomy_name) {
          $terms = get_the_terms($post_id, $taxonomy_name);
          if (!empty($terms)) {
            $out = [];
            foreach ($terms as $term) {
              $out[] = $term->name;
            }
            echo join(', ', $out);
          } else {
            echo 'なし';
          }
        }
      }
    }, 10, 2);
  }

  // 管理画面の投稿一覧を新しい順に並び替え
  // add_action('pre_get_posts', function ($query) use ($post_type) {
  //   // 管理画面の該当タイプの一覧画面の場合のみ
  //   if (is_admin() && $query->is_main_query() && $query->get('post_type') === $post_type) {
  //     $query->set('orderby', 'date');
  //     $query->set('order', 'DESC');
  //   }
  // });
}


//ACFの項目を一覧画面に表示
// function add_posts_columns( $columns ) {
//   $columns['year'] = '西暦';
//   return $columns;
// }
// function custom_posts_column( $column_name, $post_id ) {
//   if ( $column_name == 'year' ) {
//     $year = get_post_meta( $post_id, 'year', true );
//     echo ( $year ) ? $year : '－';
//   }
// }
// add_filter( 'manage_history_posts_columns', 'add_posts_columns' );
// add_action( 'manage_history_posts_custom_column', 'custom_posts_column', 10, 2 );