<?php get_header(); ?>
<main>
  <div class="siteWrapper">
    <?php if(is_page('contact')): ?>
      <?php get_template_part('template-parts/form'); ?>
    <?php endif ?>
  </div>
</main>
<?php get_footer(); ?>