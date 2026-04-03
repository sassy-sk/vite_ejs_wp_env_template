const header = document.querySelector(".js-header");
const hamburger = document.querySelector(".js-hamburger");
const spHeaderMenu = document.querySelector(".js-drawer-menu");
const drawerMenuItems = document.querySelectorAll(".js-drawer-menu__item");
function toggleDrawer(isOpen) {
  const expanded = isOpen ? "false" : "true";
  const hidden = isOpen ? "true" : "false";
  hamburger.setAttribute("aria-expanded", expanded);
  spHeaderMenu.setAttribute("aria-hidden", hidden);
  header.classList.toggle("is_active", !isOpen);
}
hamburger.addEventListener("click", function() {
  const isOpen = this.getAttribute("aria-expanded") === "true";
  toggleDrawer(isOpen);
});
drawerMenuItems.forEach((item) => {
  item.addEventListener("click", () => toggleDrawer(true));
});
document.addEventListener("keydown", function(e) {
  if (e.key === "Escape") {
    toggleDrawer(true);
  }
});
let jsPageTopBtn = document.querySelector(".js-page-top");
if (jsPageTopBtn) {
  let getScrolled = function() {
    return window.pageYOffset !== void 0 ? window.pageYOffset : document.documentElement.scrollTop;
  };
  var getScrolled2 = getScrolled;
  window.onscroll = function() {
    getScrolled() > 1e3 ? jsPageTopBtn.classList.add("is-active") : jsPageTopBtn.classList.remove("is-active");
  };
}
let jsHeader = document.querySelector(".js-header");
let jsHeaderTarget = document.querySelector(".js-headerTarget");
if (jsHeader && jsHeaderTarget) {
  let getScrolled = function() {
    return window.pageYOffset !== void 0 ? window.pageYOffset : document.documentElement.scrollTop;
  };
  var getScrolled2 = getScrolled;
  window.onscroll = function() {
    getScrolled() > jsHeaderTarget.offsetTop ? jsHeader.classList.add("is-active") : jsHeader.classList.remove("is-active");
  };
}
document.addEventListener("DOMContentLoaded", () => {
  const modalTriggers = document.querySelectorAll("[data-modal-open]");
  modalTriggers.forEach((trigger) => {
    trigger.addEventListener("click", () => {
      const modalId = trigger.getAttribute("data-modal-open");
      const modal = document.getElementById(modalId);
      if (modal) {
        modal.showModal();
      }
    });
  });
  const closeButtons = document.querySelectorAll("[data-modal-close]");
  closeButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const modal = button.closest("dialog");
      if (modal) {
        modal.close();
      }
    });
  });
  const modalDialog = document.querySelectorAll(".js-modalDialog");
  modalDialog.forEach((dialog) => {
    dialog.addEventListener("click", (event) => {
      if (event.target.closest(".js-modalContainer") === null) {
        dialog.close();
      }
    });
  });
});
document.addEventListener("DOMContentLoaded", function() {
  const tabs = document.querySelectorAll(".js-tab");
  tabs.forEach((tab) => {
    const tabBtns = tab.querySelectorAll(".js-tabBtn");
    const tabPanels = tab.querySelectorAll(".js-tab-panel");
    if (tabBtns.length > 0 && tabPanels.length > 0) {
      tabBtns[0].classList.add("is_active");
      tabBtns[0].setAttribute("aria-expanded", "true");
      tabPanels[0].classList.add("is_active");
    }
    tabBtns.forEach((btn) => {
      btn.addEventListener("click", function() {
        const targetTab = this.getAttribute("data-tab");
        tabBtns.forEach((b) => {
          b.classList.remove("is_active");
          b.setAttribute("aria-expanded", "false");
        });
        tabPanels.forEach((p) => {
          p.classList.remove("is_active");
        });
        this.classList.add("is_active");
        this.setAttribute("aria-expanded", "true");
        const targetPanel = tab.querySelector(`[data-tab-panel="${targetTab}"]`);
        if (targetPanel) {
          targetPanel.classList.add("is_active");
        }
      });
    });
  });
});
function initializeSmoothScroll() {
  var anchorLinks = document.querySelectorAll('a[href*="#"]');
  if (anchorLinks.length === 0)
    return;
  anchorLinks.forEach(function(anchorLink) {
    anchorLink.addEventListener("click", handleClick, false);
  });
}
function isHeaderFixed(header2) {
  var position = window.getComputedStyle(header2).position;
  var isFixed = position === "fixed" || position === "sticky";
  return isFixed;
}
function getHeaderBlockSize() {
  var header2 = document.querySelector("[data-fixed-header]");
  var headerBlockSize = header2 && isHeaderFixed(header2) ? window.getComputedStyle(header2).blockSize : "0";
  return headerBlockSize;
}
console.log("ヘッダーの高さ" + getHeaderBlockSize());
function scrollToTarget(element) {
  var headerBlockSize = getHeaderBlockSize();
  element.style.scrollMarginBlockStart = headerBlockSize;
  var isPrefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var scrollBehavior = isPrefersReduced ? "instant" : "smooth";
  element.scrollIntoView({ behavior: scrollBehavior, inline: "end" });
}
function focusTarget(element) {
  element.focus({ preventScroll: true });
  if (document.activeElement !== element) {
    element.setAttribute("tabindex", "-1");
    element.focus({ preventScroll: true });
  }
}
function handleClick(event) {
  if (event.button !== 0)
    return;
  var currentLink = event.currentTarget;
  var hash = currentLink.hash;
  if (!currentLink || !hash || currentLink.getAttribute("role") === "tab" || currentLink.getAttribute("role") === "button" || currentLink.getAttribute("data-smooth-scroll") === "disabled")
    return;
  var target = document.getElementById(decodeURIComponent(hash.slice(1))) || hash === "#top" && document.body;
  if (target) {
    event.preventDefault();
    scrollToTarget(target);
    focusTarget(target);
    if (!(hash === "#top")) {
      history.pushState({}, "", hash);
    }
  }
}
function initializePopoverMenu(popoverElement) {
  var anchorLinks = popoverElement.querySelectorAll("a");
  if (anchorLinks.length > 0) {
    anchorLinks.forEach(function(link) {
      link.addEventListener(
        "click",
        function(event) {
          handleHashlinkClick(event, popoverElement);
        },
        false
      );
      link.addEventListener(
        "blur",
        function(event) {
          handleFocusableElementsBlur(event, popoverElement);
        },
        false
      );
    });
  }
}
function handleHashlinkClick(event, popover) {
  popover.hidePopover();
}
function handleFocusableElementsBlur(event, popover) {
  var target = event.relatedTarget;
  if (!popover.contains(target)) {
    popover.hidePopover();
  }
}
var drawer = document.getElementById("drawer");
document.addEventListener("DOMContentLoaded", function() {
  initializeSmoothScroll();
  if (drawer) {
    initializePopoverMenu(drawer);
  }
});
document.addEventListener("DOMContentLoaded", function() {
  if (document.querySelector(".js-flow-swiper")) {
    new Swiper(".js-flow-swiper", {
      width: 300,
      spaceBetween: 40,
      // スライド間の余白（px）
      speed: 300,
      // スライドアニメーションのスピード（ミリ秒）
      watchSlidesProgress: true,
      // スライドの進行状況を監視する
      grabCursor: true,
      // PCでマウスカーソルを「掴む」マークにする
      mousewheel: {
        //横スクロール有効
        forceToAxis: true,
        sensitivity: 3
      },
      breakpoints: {
        // ブレークポイント
        768: {
          // 画面幅768px以上で適用
          width: 406,
          spaceBetween: 70
          // スライド間の余白（px）
        }
      }
    });
  }
});
document.addEventListener("DOMContentLoaded", function() {
  const cardsList = document.querySelectorAll(".js-cards");
  cardsList.forEach((cards) => {
    let isDown = false;
    let startX;
    let scrollLeft;
    cards.addEventListener("mousedown", (e) => {
      isDown = true;
      cards.classList.add("active");
      startX = e.pageX - cards.offsetLeft;
      scrollLeft = cards.scrollLeft;
    });
    cards.addEventListener("mouseleave", () => {
      isDown = false;
      cards.classList.remove("active");
    });
    cards.addEventListener("mouseup", () => {
      isDown = false;
      cards.classList.remove("active");
    });
    cards.addEventListener("mousemove", (e) => {
      if (!isDown)
        return;
      e.preventDefault();
      const x = e.pageX - cards.offsetLeft;
      const walk = (x - startX) * 3;
      cards.scrollLeft = scrollLeft - walk;
    });
  });
});
if (document.querySelector(".js-accordion__btn")) {
  document.querySelectorAll(".js-accordion__btn").forEach(function(button) {
    button.addEventListener("click", function() {
      var expanded = this.getAttribute("aria-expanded") === "true" || false;
      this.setAttribute("aria-expanded", !expanded);
      var body = this.nextElementSibling;
      if (body) {
        body.setAttribute("aria-hidden", expanded);
      }
    });
  });
}
if (document.querySelector(".js_accordion")) {
  let closeAccordion = function(el, answer) {
    const closingAnim = answer.animate(closingAnimation(answer), animTiming);
    closingAnim.onfinish = () => {
      el.removeAttribute("open");
    };
  };
  var closeAccordion2 = closeAccordion;
  document.addEventListener("DOMContentLoaded", () => {
    document.querySelectorAll(".js_accordion").forEach(function(el) {
      const summary = el.querySelector(".js_accordion_summary");
      const answer = el.querySelector(".js_accordion_body");
      summary.addEventListener("click", (event) => {
        event.preventDefault();
        if (el.getAttribute("open") !== null) {
          closeAccordion(el, answer);
        } else {
          el.setAttribute("open", "true");
          answer.animate(openingAnimation(answer), animTiming);
        }
      });
      const close = el.querySelector(".js_accordion__close");
      if (close) {
        close.addEventListener("click", () => {
          closeAccordion(el, answer);
        });
      }
    });
  });
  const animTiming = {
    duration: 300,
    easing: "ease-in-out"
  };
  const closingAnimation = (answer) => [
    {
      height: answer.offsetHeight + "px",
      opacity: 1
    },
    {
      height: 0,
      opacity: 0
    }
  ];
  const openingAnimation = (answer) => [
    {
      height: 0,
      opacity: 0
    },
    {
      height: answer.offsetHeight + "px",
      opacity: 1
    }
  ];
}
let fields = [
  // タイトル入力欄・確認欄
  {
    input: document.querySelector(".js_inputTitle"),
    confirm: document.querySelector(".js_confirmTitle")
  },
  // 名前入力欄・確認欄
  {
    input: document.querySelector(".js_inputName"),
    confirm: document.querySelector(".js_confirmName")
  },
  // ふりがな入力欄・確認欄
  {
    input: document.querySelector(".js_inputRuby"),
    confirm: document.querySelector(".js_confirmRuby")
  },
  // メール入力欄・確認欄
  {
    input: document.querySelector(".js_inputEmail"),
    confirm: document.querySelector(".js_confirmMail")
  },
  // メール確認入力欄・確認欄
  {
    input: document.querySelector(".js_inputEmailConfirm"),
    confirm: document.querySelector(".js_confirmMailConfirm")
  },
  // 会社入力欄・確認欄
  {
    input: document.querySelector(".js_inputCompany"),
    confirm: document.querySelector(".js_confirmCompany")
  },
  // 部門入力欄・確認欄
  {
    input: document.querySelector(".js_inputDepartment"),
    confirm: document.querySelector(".js_confirmDepartment")
  },
  // TEL入力欄・確認欄
  {
    input: document.querySelector(".js_inputTel"),
    confirm: document.querySelector(".js_confirmTel")
  },
  // 郵便番号入力欄・確認欄
  {
    input: document.querySelector(".js_inputZip"),
    confirm: document.querySelector(".js_confirmZip")
  },
  // 住所入力欄・確認欄
  {
    input: document.querySelector(".js_inputAddress"),
    confirm: document.querySelector(".js_confirmAddress")
  },
  // お問い合わせ入力欄・確認欄
  {
    input: document.querySelector(".js_inputTextArea"),
    confirm: document.querySelector(".js_confirmTextArea")
  }
];
let confirmTop = document.querySelector(".js_confirmTop");
let inputArea = document.querySelectorAll(".js_inputArea");
let radioButtons = document.querySelectorAll(
  '.js_inputRadio input[type="radio"]'
);
let checkboxes = document.querySelectorAll(
  '.js_inputCheck input[type="checkbox"]'
);
let inputSelect = document.querySelector(".js_inputSelect");
let btnConfirm = document.querySelector(".js_btnConfirm");
let inputAgree = document.querySelector(
  ".formAgree__item"
);
let confirmArea = document.querySelectorAll(".js_confirmArea");
let confirmRadio = document.querySelector(".js_confirmRadio");
let confirmCheck = document.querySelector(".js_confirmCheck");
let confirmSelect = document.querySelector(".js_confirmSelect");
document.querySelector(".js_confirmAgree");
let btnRemove = document.querySelector(".js_confirmRemove");
if (fields && fields.length > 0) {
  fields.forEach(function(field) {
    if (field.input && field.confirm) {
      field.input.addEventListener("input", function() {
        if (field.input.type === "textarea") {
          field.confirm.innerHTML = field.input.value.replace(/\n/g, "<br>");
        } else {
          field.confirm.textContent = field.input.value;
        }
      });
    }
  });
}
if (radioButtons.length > 0) {
  let updateConfirmRadio = function() {
    const selectedRadio = [...radioButtons].find((radio) => radio.checked);
    confirmRadio.textContent = selectedRadio ? selectedRadio.value : "";
  };
  var updateConfirmRadio2 = updateConfirmRadio;
  radioButtons.forEach((radio) => {
    radio.addEventListener("change", updateConfirmRadio);
  });
  updateConfirmRadio();
}
if (checkboxes.length > 0) {
  let updateConfirmCheck = function() {
    let selectedValues = Array.from(checkboxes).filter(function(checkbox) {
      return checkbox.checked;
    }).map(function(checkbox) {
      return checkbox.nextElementSibling.textContent;
    });
    confirmCheck.textContent = selectedValues.join(", ");
  };
  var updateConfirmCheck2 = updateConfirmCheck;
  checkboxes.forEach(function(checkbox) {
    checkbox.addEventListener("change", updateConfirmCheck);
  });
  updateConfirmCheck();
}
if (inputSelect) {
  inputSelect.addEventListener("change", function() {
    let selectedOption = inputSelect.options[inputSelect.selectedIndex];
    confirmSelect.textContent = selectedOption.text;
  });
}
if (inputAgree) {
  btnConfirm.disabled = true;
  inputAgree.addEventListener("change", function() {
    if (inputAgree.checked) {
      btnConfirm.disabled = false;
    } else {
      btnConfirm.disabled = true;
    }
  });
}
function createOverlay() {
  let overlay2 = document.createElement("div");
  overlay2.className = "overlay";
  overlay2.style.position = "fixed";
  overlay2.style.top = "0";
  overlay2.style.left = "0";
  overlay2.style.width = "100%";
  overlay2.style.height = "100%";
  overlay2.style.backgroundColor = "rgba(255, 255, 255, 1)";
  overlay2.style.display = "none";
  overlay2.style.transition = "opacity .5s";
  overlay2.style.zIndex = "100";
  document.body.appendChild(overlay2);
  return overlay2;
}
let overlay = createOverlay();
if (btnConfirm) {
  btnConfirm.addEventListener("click", function() {
    confirmArea.forEach(function(area) {
      area.style.display = "flex";
    });
    inputArea.forEach(function(area) {
      area.style.display = "none";
    });
    overlay.style.display = "block";
    overlay.style.opacity = "1";
    setTimeout(function() {
      overlay.style.opacity = "0";
      setTimeout(function() {
        overlay.style.display = "none";
      }, 500);
    }, 500);
    const headerHeight = 200;
    const topPosition = confirmTop.getBoundingClientRect().top + window.pageYOffset - headerHeight;
    window.scrollTo({
      top: topPosition
      // behavior: 'smooth'
    });
  });
}
if (btnRemove) {
  btnRemove.addEventListener("click", function() {
    confirmArea.forEach(function(area) {
      area.style.display = "none";
    });
    inputArea.forEach(function(area) {
      area.style.display = "block";
    });
    overlay.style.display = "block";
    overlay.style.opacity = "1";
    setTimeout(function() {
      overlay.style.opacity = "0";
      setTimeout(function() {
        overlay.style.display = "none";
      }, 500);
    }, 500);
    const headerHeight = 200;
    const topPosition = confirmTop.getBoundingClientRect().top + window.pageYOffset - headerHeight;
    window.scrollTo({
      top: topPosition
      // behavior: 'smooth'
    });
  });
}
document.addEventListener(
  "wpcf7mailsent",
  function(event) {
    location = "./thanks/";
  },
  false
);
if (document.querySelector(".js_inputZip")) {
  const zipNumber = document.querySelector(".js_inputZip");
  zipNumber.setAttribute("inputmode", "numeric");
}
