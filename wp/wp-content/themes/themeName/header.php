<!DOCTYPE html>
<html <?php language_attributes(); ?>>

<head prefix="og: http://ogp.me/ns# fb: http://ogp.me/ns/fb# website: http://ogp.me/ns/website#">
  <meta charset="<?php bloginfo('charset'); ?>" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <meta name="format-detection" content="telephone=no" />

  <!-- ogp -->
  <?php /*
  <?php if (is_home() || is_front_page()) : ?>
    <meta property="og:title" content="<?php bloginfo('name'); ?>">
  <?php else : ?>
    <meta property="og:title" content="<?php the_title(); ?>">
  <?php endif; ?>
  <?php if (is_home() || is_front_page() || is_page()) : ?>
    <meta property="og:type" content="website">
  <?php else : ?>
    <meta property="og:type" content="article">
  <?php endif; ?>
  <meta property="og:url" content="<?php echo get_the_permalink(); ?>">
  <?php if (has_post_thumbnail()) : ?>
    <meta property="og:image" content="<?php the_post_thumbnail_url(); ?>">
  <?php else : ?>
    <meta property="og:image" content="<?php echo get_template_directory_uri() ?>/assets/images/ogp/ogp.jpg">
  <?php endif; ?>
  <meta property="og:site_name" content="<?php bloginfo('name'); ?>">
  <meta property="og:locale" content="ja_JP">
  <meta name="twitter:card" content="summary">
  <!-- /ogp -->
  */ ?>

  <?php wp_head(); ?>
</head>

<body <?php body_class(); ?> id=" top">
  <?php wp_body_open(); ?>
  <?php get_template_part('parts/headerMenu'); ?>