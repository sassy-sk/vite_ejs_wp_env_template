<?php $urls = get_my_urls(); ?>
<header class="l-header p-header js-header" data-fixed-header>
  <div class="p-header__inner">
    <!-- ヘッダーロゴ -->
    <?php if (is_front_page()) : ?>
      <h1 class="p-header__logo">
        <a href="<?php echo $urls['top']; ?>">
          <img class="logo" src="<?php echo image_path_webp('common/logo_black.svg'); ?>" alt="">
        </a>
      </h1>
    <?php else : ?>
      <div class="p-header__logo">
        <a href="<?php echo $urls['top']; ?>">
          <img class="logo" src="<?php echo image_path_webp('common/logo_black.svg'); ?>" alt="">
        </a>
      </div>
    <?php endif; ?>
    <!-- ドロワーアイコン  -->
    <div class="p-header__drawerBtn">
      <button type="button" class="c-hamburger js-hamburger" aria-controls="drawer_menu" aria-expanded="false" aria-label="メニューを開閉する">
        <span class="c-hamburger__line"></span>
      </button>
    </div>
    <?php
    $headerMenuUrls = [
      ['title' => '事業紹介', 'url' => $urls['solution']],
      ['title' => 'サステナビリティ', 'url' => $urls['sustainability']],
      ['title' => 'お知らせ', 'url' => $urls['news']],
      ['title' => '採用情報', 'url' => $urls['recruit']],
      ['title' => 'お問い合わせ', 'url' => $urls['contact']],
    ];
    $subMenuUrls = [
      ['title' => '私たちについて', 'url' => $urls['about']],
      ['title' => '会社概要', 'url' => $urls['company']],
      ['title' => '代表挨拶', 'url' => $urls['message']],
      ['title' => '組織体制', 'url' => $urls['organization']],
      ['title' => '役員紹介', 'url' => $urls['officer']],
      ['title' => '沿革', 'url' => $urls['history']],
    ];
    ?>
    <!-- pcーメニュー -->
    <nav class="p-header__pc-menu p-header-menu ">
      <ul class="p-header-menu__items">
        <li class="p-header-menu__item p-header-menu__item--subMenu">企業情報
          <ul class="p-header-menu__subItems">
            <?php foreach ($subMenuUrls as $subMenuUrl) : ?>
              <li class="p-header-menu__subItem"><a href="<?php echo $subMenuUrl['url']; ?>"><?php echo $subMenuUrl['title']; ?></a></li>
            <?php endforeach; ?>
          </ul>
        </li>
        <?php foreach ($headerMenuUrls as $headerMenuUrl) : ?>
          <li class="p-header-menu__item"><a href="<?php echo $headerMenuUrl['url']; ?>"><?php echo $headerMenuUrl['title']; ?></a></li>
        <?php endforeach; ?>
      </ul>
    </nav>
    <!-- ドロワーメニュー -->
    <nav class="p-header__drawer-menu  p-drawer-menu js-drawer-menu" id="drawer_menu" aria-hidden="true">
      <ul class="p-drawer-menu__items">
        <?php foreach ($headerMenuUrls as $headerMenuUrl) : ?>
          <li class="p-drawer-menu__item"><a href="<?php echo $headerMenuUrl['url']; ?>"><?php echo $headerMenuUrl['title']; ?></a></li>
        <?php endforeach; ?>
      </ul>
    </nav>
  </div>
</header>