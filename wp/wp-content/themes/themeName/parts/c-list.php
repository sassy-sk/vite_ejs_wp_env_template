<div class="c-list">
  <div class="c-list__meta">
    <time class="c-list__time" datetime="<?php the_time('Y-m-d'); ?>"><?php the_time('Y.m.d'); ?></time>
    <div class="c-list__categories">
      <?php $categories = get_the_category();
      foreach ($categories as $category) { ?>
        <span class="c-list__category">
          <?php echo $category->name; ?>
        </span>
      <?php } ?>
    </div>
  </div>
  <div class="c-list__body">
    <a href="<?php the_permalink(); ?>">
      <h2 class="c-list__title"><?php the_title(); ?></h2>
    </a>
  </div>
</div>