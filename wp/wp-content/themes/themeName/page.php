<?php get_header(); ?>
<main>
  <div class="siteWrapper">

    <?php if(is_page('about')): ?>
      <?php get_template_part('page/top'); ?>
    <?php endif ?>

    <?php if(is_page('contact')): ?>
      <?php get_template_part('parts/form'); ?>
    <?php endif ?>
    
  </div>
</main>
<?php get_footer(); ?>