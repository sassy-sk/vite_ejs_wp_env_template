<?php get_header(); ?>
<main>
  <div class="siteWrapper">

    <div class="test">
      <div class="l-inner">

      <h1>トップページ</h1>

        <img src="<?= image_path_webp('common/noImg.jpg') ?>" alt="">

        <hr />

        <!-- リストブロック -->
        <div class="c-listWrap">
          <?php get_template_part('parts/c-list'); ?>
        </div>

        <hr />

        <!-- カードブロック -->
        <div class="c-cardWrap">
          <?php get_template_part('parts/c-card'); ?>
        </div>

        <hr />

        <!-- タブブロック -->
        <?php $tabs = [
          ['title' => 'タブタイトル', 'tab' => '01'],
          ['title' => 'タブタイトル', 'tab' => '02'],
          ['title' => 'タブタイトル', 'tab' => '03'],
        ] ?>
        <div class="p-tab js-tab">
          <div class="p-tab__head">
            <?php foreach ($tabs as $tab) : ?>
              <button class="c-tabBtn js-tabBtn" data-tab="<?= $tab['tab'] ?>" aria-expanded="false" aria-label="タブの開閉ボタン"><?= $tab['title'] ?></button>
            <?php endforeach; ?>
          </div>
          <div class="p-tab__body">
            <?php foreach ($tabs as $tab) : ?>
              <div class="p-tab__panel js-tab-panel" data-tab-panel="<?= $tab['tab'] ?>">
                <!-- カードブロック -->
                <div class="c-cardWrap">
                  <?php get_template_part('parts/c-card'); ?>
                </div>
                <span><?= $tab['tab'] ?></span>
              </div>
            <?php endforeach; ?>
          </div>
        </div>

        <!-- アコーディオンブロック -->
        <details class="c-details js_accordion">
          <summary class="c-details__btn js_accordion_summary">続きを見る</summary>
          <div class="c-details__body js_accordion_body">
            <div class="c-details__inner">
              <p>記事ブロックの表示を、表示・非表示の設定ができます。<br>説明文がここに入ります。説明文がここに入ります。説明文がここに入ります。説明文がここに入ります。説明文がここに入ります。説明文がここに入ります。説明文がここに入ります。説明文がここに入ります。説明文がここに入ります。説明文がここに入ります。説明文がここに入ります。説明文がここに入ります。</p>
              <p>説明文がここに入ります。説明文がここに入ります。説明文がここに入ります。説明文がここに入ります。説明文がここに入ります。説明文がここに入ります。説明文がここに入ります。説明文がここに入ります。説明文がここに入ります。説明文がここに入ります。説明文がここに入ります。説明文がここに入ります。説明文がここに入ります。</p>
            </div>
            <button class="c-details__close js_accordion__close">閉じる</button>
          </div>
        </details>

        <hr />

        <!-- アコーディオンブロック -->
        <div class="c-accordion">
          <button class="c-accordion__btn js-accordion__btn" aria-expanded="false" aria-label="質問欄の開閉ボタン">Q. 質問文</button>
          <div class="c-accordion__body" aria-hidden="true">
            <div>
              <p class="c-accordion__answer c-text-l">
                回答文
              </p>
            </div>
          </div>
        </div>

        <hr />


        <!-- モーダルボタンブロック -->
        <?php $modals = [
          [
            'target' => 'modal01',
            'btnImg' => 'common/noImg.jpg',
            'btnAlt' => 'モーダルボタン画像',
            'btnText' => 'モーダルボタンテキスト01',
            'modalTitle' => 'モーダルタイトル01',
            'modalImg' => 'common/noImg.jpg',
            'modalAlt' => 'モーダル画像',
            'modalText' => 'モーダルテキスト01',
          ],
          [
            'target' => 'modal02',
            'btnImg' => 'common/noImg.jpg',
            'btnAlt' => 'モーダルボタン画像',
            'btnText' => 'モーダルボタンテキスト02',
            'modalTitle' => 'モーダルタイトル02',
            'modalImg' => 'common/noImg.jpg',
            'modalAlt' => 'モーダル画像',
            'modalText' => 'モーダルテキスト02',
          ],
          [
            'target' => 'modal03',
            'btnImg' => 'common/noImg.jpg',
            'btnAlt' => 'モーダルボタン画像',
            'btnText' => 'モーダルボタンテキスト03',
            'modalTitle' => 'モーダルタイトル03',
            'modalImg' => 'common/noImg.jpg',
            'modalAlt' => 'モーダル画像',
            'modalText' => 'モーダルテキスト03',
          ],
        ] ?>
        <div class="c-modalBtnWrap">
          <?php foreach ($modals as $modal) : ?>
            <button class="c-modalBtn" data-modal-open="<?= $modal['target'] ?>">
              <span class="c-modalBtn__img">
                <img src="<?= image_path_webp($modal['btnImg']) ?>" alt="<?= $modal['btnAlt'] ?>">
              </span>
              <span class="c-modalBtn__text"><?= $modal['btnText'] ?></span>
            </button>
            <dialog id="<?= $modal['target'] ?>" class="c-modal js-modalDialog" aria-labelledby="<?= $modal['modalTitle'] ?>" aria-describedby="<?= $modal['modalText'] ?>" autofocus>
              <div class="c-modal__container js-modalContainer">
                <div class="c-modal__inner">
                  <div class="c-modal__img">
                    <img src="<?= image_path_webp($modal['modalImg']) ?>" alt="<?= $modal['modalAlt'] ?>">
                  </div>
                  <div class="c-modal__head">
                    <p id="<?= $modal['modalTitle'] ?>" class="c-modal__title"><?= $modal['modalTitle'] ?></p>
                  </div>
                  <div class="c-modal__body">
                    <p id="<?= $modal['modalText'] ?>" class="c-modal__text c-text">
                      <?= $modal['modalText'] ?>
                    </p>
                  </div>
                  <button class="c-modal__close" type="button" aria-label="モーダルを閉じる" data-modal-close></button>
                </div>
              </div>
            </dialog>
          <?php endforeach; ?>
        </div>


        <hr />

        <?php get_template_part('parts/form'); ?>


        <div class="" style="margin-bottom: 300px;"></div>

      </div>
    </div>

  </div>
</main>
<?php get_footer(); ?>