// ----------------------
// タブ制御
// ----------------------
document.addEventListener('DOMContentLoaded', function () {
  const tabs = document.querySelectorAll('.js-tab');

  tabs.forEach((tab) => {
    const tabBtns = tab.querySelectorAll('.js-tabBtn');
    const tabPanels = tab.querySelectorAll('.js-tab-panel');

    // 最初のタブボタンとパネルをアクティブにする
    if (tabBtns.length > 0 && tabPanels.length > 0) {
      tabBtns[0].classList.add('is_active');
      tabBtns[0].setAttribute('aria-expanded', 'true');
      tabPanels[0].classList.add('is_active');
    }

    // 各タブボタンにクリックイベントを追加
    tabBtns.forEach((btn) => {
      btn.addEventListener('click', function () {
        const targetTab = this.getAttribute('data-tab');

        // すべてのタブボタンとパネルからis_activeクラスを削除
        tabBtns.forEach((b) => {
          b.classList.remove('is_active');
          b.setAttribute('aria-expanded', 'false');
        });
        tabPanels.forEach((p) => {
          p.classList.remove('is_active');
        });

        // クリックされたタブボタンと対応するパネルにis_activeクラスを追加
        this.classList.add('is_active');
        this.setAttribute('aria-expanded', 'true');
        const targetPanel = tab.querySelector(`[data-tab-panel="${targetTab}"]`);
        if (targetPanel) {
          targetPanel.classList.add('is_active');
        }
      });
    });
  });
});