<?php get_header(); ?>
<main>
  <div class="siteWrapper">

    <div class="l-inner">
      <div class="">
        <h1 class=""><?php the_title(); ?></h1>
        <figure class="">
          <?php if (has_post_thumbnail()) : ?>
            <?php the_post_thumbnail('full', array('alt' => $thumbnail_caption ?: get_the_title())); ?>
          <?php else : ?>
            <img src="<?php echo get_template_directory_uri(); ?>/assets/images/common/noImg.webp" alt="">
          <?php endif; ?>
        </figure>
        <div class="">
          <?php the_content(); ?>
        </div>
      </div>
    </div>
    
  </div>
</main>
<?php get_footer(); ?>