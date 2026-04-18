// ----------------------
// スクロールアニメーション
// ----------------------
// 対象要素に u-fadeIn / u-blurIn などのクラスを付与しておく
// 画面内に入ったタイミングで is_animate クラスを追加してアニメーション発火
// data-animate-delay="0.2s" で遅延指定可能

document.addEventListener('DOMContentLoaded', () => {
  const targets = document.querySelectorAll('[class*="u-fadeIn"], [class*="u-fadeOut"], [class*="u-blurIn"], [class*="u-blurOut"]');

  if (targets.length === 0) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;

        const el = entry.target;

        // data-animate-delay 属性で遅延指定（例: data-animate-delay="0.2s"）
        const delay = el.dataset.animateDelay;
        if (delay) {
          el.style.animationDelay = delay;
        }

        el.classList.add('is_animate');

        // 一度発火したら監視解除
        observer.unobserve(el);
      });
    },
    {
      // 要素が20%見えたタイミングで発火
      threshold: 0.8,
    }
  );

  targets.forEach((target) => {
    observer.observe(target);
  });
});
