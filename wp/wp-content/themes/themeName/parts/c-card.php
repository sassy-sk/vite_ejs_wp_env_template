<a class="c-card" href="<?php the_permalink(); ?>">
  <figure class="c-card__img">
    <?php if (has_post_thumbnail()) : ?>
      <?php the_post_thumbnail('full', array('alt' => $thumbnail_caption ?: get_the_title())); ?>
    <?php else : ?>
      <img src="<?php echo get_template_directory_uri(); ?>/assets/images/common/noImg.webp" alt="">
    <?php endif; ?>
  </figure>
  <div class="c-card__meta">
    <time class="c-card__date" datetime="<?php the_time('Y-m-d'); ?>"><?php the_time('Y.m.d'); ?></time>
    <span class="c-card__category">
      <?php $categories = get_the_category();
      foreach ($categories as $category) { ?>
        <span class="c-card__category"><?php echo $category->name; ?></span>
      <?php } ?>
    </span>
  </div>
  <h3 class="c-card__title"><?php the_title(); ?></h3>
  <div class="c-card__body">
    <p class="c-card__text"><?php the_excerpt(); ?></p>
  </div>
</a>