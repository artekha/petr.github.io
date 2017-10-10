;'use strict';

(function() {
	document.addEventListener('click', tab);
	function tab(e) {
		var target = e.target;
		if (!target.parentNode.classList.contains('s-tab-toggler')) return;
		e.preventDefault();
		var curentTabs = target.closest('.s-tab');
		var tabToggler = curentTabs.querySelector('.s-tab-toggler');
		var tabContent = curentTabs.querySelector('.s-tab-content');
		var index = 0;
		for (var i = 0; i < tabToggler.children.length; i++) {
			tabToggler.children[i].classList.remove('s-tab-active');
			if (target.textContent == tabToggler.children[i].textContent) {
				target.classList.add('s-tab-active');
				index = i;
			}
		}
		for (var i = 0; i < tabContent.children.length; i++) {
			tabContent.children[i].classList.remove('s-tab-active');
			if (i == index) {
				tabContent.children[i].classList.add('s-tab-active');
			}
		}
	}
}());