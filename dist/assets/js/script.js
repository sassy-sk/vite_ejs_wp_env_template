//#region src/js/_drawer.js
var header = document.querySelector(".js-header");
var hamburger = document.querySelector(".js-hamburger");
var spHeaderMenu = document.querySelector(".js-drawer-menu");
var drawerMenuItems = document.querySelectorAll(".js-drawer-menu__item");
function toggleDrawer(isOpen) {
	const expanded = isOpen ? "false" : "true";
	const hidden = isOpen ? "true" : "false";
	hamburger.setAttribute("aria-expanded", expanded);
	spHeaderMenu.setAttribute("aria-hidden", hidden);
	header.classList.toggle("is_active", !isOpen);
}
hamburger.addEventListener("click", function() {
	toggleDrawer(this.getAttribute("aria-expanded") === "true");
});
drawerMenuItems.forEach((item) => {
	item.addEventListener("click", () => toggleDrawer(true));
});
document.addEventListener("keydown", function(e) {
	if (e.key === "Escape") toggleDrawer(true);
});
//#endregion
//#region src/js/_common.js
var jsPageTopBtn = document.querySelector(".js-page-top");
if (jsPageTopBtn) {
	function getScrolled() {
		return window.pageYOffset !== void 0 ? window.pageYOffset : document.documentElement.scrollTop;
	}
	window.onscroll = function() {
		getScrolled() > 1e3 ? jsPageTopBtn.classList.add("is-active") : jsPageTopBtn.classList.remove("is-active");
	};
}
var jsHeader = document.querySelector(".js-header");
var jsHeaderTarget = document.querySelector(".js-headerTarget");
if (jsHeader && jsHeaderTarget) {
	function getScrolled() {
		return window.pageYOffset !== void 0 ? window.pageYOffset : document.documentElement.scrollTop;
	}
	window.onscroll = function() {
		getScrolled() > jsHeaderTarget.offsetTop ? jsHeader.classList.add("is-active") : jsHeader.classList.remove("is-active");
	};
}
//#endregion
//#region src/js/_modal.js
document.addEventListener("DOMContentLoaded", () => {
	document.querySelectorAll("[data-modal-open]").forEach((trigger) => {
		trigger.addEventListener("click", () => {
			const modalId = trigger.getAttribute("data-modal-open");
			const modal = document.getElementById(modalId);
			if (modal) modal.showModal();
		});
	});
	document.querySelectorAll("[data-modal-close]").forEach((button) => {
		button.addEventListener("click", () => {
			const modal = button.closest("dialog");
			if (modal) modal.close();
		});
	});
	document.querySelectorAll(".js-modalDialog").forEach((dialog) => {
		dialog.addEventListener("click", (event) => {
			if (event.target.closest(".js-modalContainer") === null) dialog.close();
		});
	});
});
//#endregion
//#region src/js/_tab.js
document.addEventListener("DOMContentLoaded", function() {
	document.querySelectorAll(".js-tab").forEach((tab) => {
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
				if (targetPanel) targetPanel.classList.add("is_active");
			});
		});
	});
});
//#endregion
//#region src/js/_scroll.js
function initializeSmoothScroll() {
	var anchorLinks = document.querySelectorAll("a[href*=\"#\"]");
	if (anchorLinks.length === 0) return;
	anchorLinks.forEach(function(anchorLink) {
		anchorLink.addEventListener("click", handleClick, false);
	});
}
function isHeaderFixed(header) {
	var position = window.getComputedStyle(header).position;
	return position === "fixed" || position === "sticky";
}
function getHeaderBlockSize() {
	var header = document.querySelector("[data-fixed-header]");
	return header && isHeaderFixed(header) ? window.getComputedStyle(header).blockSize : "0";
}
console.log("ヘッダーの高さ" + getHeaderBlockSize());
function scrollToTarget(element) {
	var headerBlockSize = getHeaderBlockSize();
	element.style.scrollMarginBlockStart = headerBlockSize;
	var scrollBehavior = window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth";
	element.scrollIntoView({
		behavior: scrollBehavior,
		inline: "end"
	});
}
function focusTarget(element) {
	element.focus({ preventScroll: true });
	if (document.activeElement !== element) {
		element.setAttribute("tabindex", "-1");
		element.focus({ preventScroll: true });
	}
}
function handleClick(event) {
	if (event.button !== 0) return;
	var currentLink = event.currentTarget;
	var hash = currentLink.hash;
	if (!currentLink || !hash || currentLink.getAttribute("role") === "tab" || currentLink.getAttribute("role") === "button" || currentLink.getAttribute("data-smooth-scroll") === "disabled") return;
	var target = document.getElementById(decodeURIComponent(hash.slice(1))) || hash === "#top" && document.body;
	if (target) {
		event.preventDefault();
		scrollToTarget(target);
		focusTarget(target);
		if (!(hash === "#top")) history.pushState({}, "", hash);
	}
}
function initializePopoverMenu(popoverElement) {
	var anchorLinks = popoverElement.querySelectorAll("a");
	if (anchorLinks.length > 0) anchorLinks.forEach(function(link) {
		link.addEventListener("click", function(event) {
			handleHashlinkClick(event, popoverElement);
		}, false);
		link.addEventListener("blur", function(event) {
			handleFocusableElementsBlur(event, popoverElement);
		}, false);
	});
}
function handleHashlinkClick(event, popover) {
	popover.hidePopover();
}
function handleFocusableElementsBlur(event, popover) {
	var target = event.relatedTarget;
	if (!popover.contains(target)) popover.hidePopover();
}
var drawer = document.getElementById("drawer");
document.addEventListener("DOMContentLoaded", function() {
	initializeSmoothScroll();
	if (drawer) initializePopoverMenu(drawer);
});
//#endregion
//#region src/js/_slider.js
document.addEventListener("DOMContentLoaded", function() {
	if (document.querySelector(".js-flow-swiper")) new Swiper(".js-flow-swiper", {
		width: 300,
		spaceBetween: 40,
		speed: 300,
		watchSlidesProgress: true,
		grabCursor: true,
		mousewheel: {
			forceToAxis: true,
			sensitivity: 3
		},
		breakpoints: { 768: {
			width: 406,
			spaceBetween: 70
		} }
	});
});
document.addEventListener("DOMContentLoaded", function() {
	document.querySelectorAll(".js-cards").forEach((cards) => {
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
			if (!isDown) return;
			e.preventDefault();
			const walk = (e.pageX - cards.offsetLeft - startX) * 3;
			cards.scrollLeft = scrollLeft - walk;
		});
	});
});
//#endregion
//#region src/js/_accordion.js
if (document.querySelector(".js-accordion__btn")) document.querySelectorAll(".js-accordion__btn").forEach(function(button) {
	button.addEventListener("click", function() {
		var expanded = this.getAttribute("aria-expanded") === "true" || false;
		this.setAttribute("aria-expanded", !expanded);
		var body = this.nextElementSibling;
		if (body) body.setAttribute("aria-hidden", expanded);
	});
});
if (document.querySelector(".js_accordion")) {
	document.addEventListener("DOMContentLoaded", () => {
		document.querySelectorAll(".js_accordion").forEach(function(el) {
			const summary = el.querySelector(".js_accordion_summary");
			const answer = el.querySelector(".js_accordion_body");
			summary.addEventListener("click", (event) => {
				event.preventDefault();
				if (el.getAttribute("open") !== null) closeAccordion(el, answer);
				else {
					el.setAttribute("open", "true");
					answer.animate(openingAnimation(answer), animTiming);
				}
			});
			const close = el.querySelector(".js_accordion__close");
			if (close) close.addEventListener("click", () => {
				closeAccordion(el, answer);
			});
		});
	});
	function closeAccordion(el, answer) {
		const closingAnim = answer.animate(closingAnimation(answer), animTiming);
		closingAnim.onfinish = () => {
			el.removeAttribute("open");
		};
	}
	const animTiming = {
		duration: 300,
		easing: "ease-in-out"
	};
	const closingAnimation = (answer) => [{
		height: answer.offsetHeight + "px",
		opacity: 1
	}, {
		height: 0,
		opacity: 0
	}];
	const openingAnimation = (answer) => [{
		height: 0,
		opacity: 0
	}, {
		height: answer.offsetHeight + "px",
		opacity: 1
	}];
}
//#endregion
//#region src/js/_form.js
var fields = [
	{
		input: document.querySelector(".js_inputTitle"),
		confirm: document.querySelector(".js_confirmTitle")
	},
	{
		input: document.querySelector(".js_inputName"),
		confirm: document.querySelector(".js_confirmName")
	},
	{
		input: document.querySelector(".js_inputRuby"),
		confirm: document.querySelector(".js_confirmRuby")
	},
	{
		input: document.querySelector(".js_inputEmail"),
		confirm: document.querySelector(".js_confirmMail")
	},
	{
		input: document.querySelector(".js_inputEmailConfirm"),
		confirm: document.querySelector(".js_confirmMailConfirm")
	},
	{
		input: document.querySelector(".js_inputCompany"),
		confirm: document.querySelector(".js_confirmCompany")
	},
	{
		input: document.querySelector(".js_inputDepartment"),
		confirm: document.querySelector(".js_confirmDepartment")
	},
	{
		input: document.querySelector(".js_inputTel"),
		confirm: document.querySelector(".js_confirmTel")
	},
	{
		input: document.querySelector(".js_inputZip"),
		confirm: document.querySelector(".js_confirmZip")
	},
	{
		input: document.querySelector(".js_inputAddress"),
		confirm: document.querySelector(".js_confirmAddress")
	},
	{
		input: document.querySelector(".js_inputTextArea"),
		confirm: document.querySelector(".js_confirmTextArea")
	}
];
var confirmTop = document.querySelector(".js_confirmTop");
var inputArea = document.querySelectorAll(".js_inputArea");
var radioButtons = document.querySelectorAll(".js_inputRadio input[type=\"radio\"]");
var checkboxes = document.querySelectorAll(".js_inputCheck input[type=\"checkbox\"]");
var inputSelect = document.querySelector(".js_inputSelect");
var btnConfirm = document.querySelector(".js_btnConfirm");
var inputAgree = document.querySelector(".formAgree__item");
var confirmArea = document.querySelectorAll(".js_confirmArea");
var confirmRadio = document.querySelector(".js_confirmRadio");
var confirmCheck = document.querySelector(".js_confirmCheck");
var confirmSelect = document.querySelector(".js_confirmSelect");
document.querySelector(".js_confirmAgree");
var btnRemove = document.querySelector(".js_confirmRemove");
if (fields && fields.length > 0) fields.forEach(function(field) {
	if (field.input && field.confirm) field.input.addEventListener("input", function() {
		if (field.input.type === "textarea") field.confirm.innerHTML = field.input.value.replace(/\n/g, "<br>");
		else field.confirm.textContent = field.input.value;
	});
});
if (radioButtons.length > 0) {
	function updateConfirmRadio() {
		const selectedRadio = [...radioButtons].find((radio) => radio.checked);
		confirmRadio.textContent = selectedRadio ? selectedRadio.value : "";
	}
	radioButtons.forEach((radio) => {
		radio.addEventListener("change", updateConfirmRadio);
	});
	updateConfirmRadio();
}
if (checkboxes.length > 0) {
	function updateConfirmCheck() {
		confirmCheck.textContent = Array.from(checkboxes).filter(function(checkbox) {
			return checkbox.checked;
		}).map(function(checkbox) {
			return checkbox.nextElementSibling.textContent;
		}).join(", ");
	}
	checkboxes.forEach(function(checkbox) {
		checkbox.addEventListener("change", updateConfirmCheck);
	});
	updateConfirmCheck();
}
if (inputSelect) inputSelect.addEventListener("change", function() {
	confirmSelect.textContent = inputSelect.options[inputSelect.selectedIndex].text;
});
if (inputAgree) {
	btnConfirm.disabled = true;
	inputAgree.addEventListener("change", function() {
		if (inputAgree.checked) btnConfirm.disabled = false;
		else btnConfirm.disabled = true;
	});
}
function createOverlay() {
	let overlay = document.createElement("div");
	overlay.className = "overlay";
	overlay.style.position = "fixed";
	overlay.style.top = "0";
	overlay.style.left = "0";
	overlay.style.width = "100%";
	overlay.style.height = "100%";
	overlay.style.backgroundColor = "rgba(255, 255, 255, 1)";
	overlay.style.display = "none";
	overlay.style.transition = "opacity .5s";
	overlay.style.zIndex = "100";
	document.body.appendChild(overlay);
	return overlay;
}
var overlay = createOverlay();
if (btnConfirm) btnConfirm.addEventListener("click", function() {
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
	const topPosition = confirmTop.getBoundingClientRect().top + window.pageYOffset - 200;
	window.scrollTo({ top: topPosition });
});
if (btnRemove) btnRemove.addEventListener("click", function() {
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
	const topPosition = confirmTop.getBoundingClientRect().top + window.pageYOffset - 200;
	window.scrollTo({ top: topPosition });
});
document.addEventListener("wpcf7mailsent", function(event) {
	location = "./thanks/";
}, false);
if (document.querySelector(".js_inputZip")) document.querySelector(".js_inputZip").setAttribute("inputmode", "numeric");
//#endregion
