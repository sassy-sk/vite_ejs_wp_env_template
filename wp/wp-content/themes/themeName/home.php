<?php get_header(); ?>
<main>
  <div class="siteWrapper">
    <div class="l-inner">

      <div class="c-listWrap">
        <?php if (have_posts()): ?>
          <?php while (have_posts()) : the_post(); ?>
            <?php get_template_part('parts/c-list'); ?>
          <?php endwhile; ?>
        <?php else: ?>
          <p>記事がありません。</p>
        <?php endif; ?>
      </div>

      <hr />

      <div class="c-cardWrap">
        <?php if (have_posts()): ?>
          <?php while (have_posts()) : the_post(); ?>
            <?php get_template_part('parts/c-card'); ?>
          <?php endwhile; ?>
        <?php else: ?>
          <p>記事がありません。</p>
        <?php endif; ?>
      </div>




      <?php echo get_template_part('parts/pagination'); ?>

    </div>



  </div>
</main>
<?php get_footer(); ?>