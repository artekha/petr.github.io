;'use strict';
(function() {

	document.addEventListener('click', showPopUp);
	document.addEventListener('click', hidePopUp);

	function showPopUp(e) {
		var target = e.target;
		if (target.getAttribute('data-component') !== 'pop-up') return;
		e.preventDefault();
		var href = target.getAttribute('href');
		var popUp = document.getElementById(href);
		popUp.parentNode.style.display = 'block';
		this.body.classList.add('scroll');
		this.onkeydown = function(e) {
			if (!(e.keyCode === 27 && popUp.offsetHeight)) {
				return;
			} else {
				popUp.parentNode.style.display = 'none';
				this.body.classList.remove('scroll');
			}
		}
	}

	function hidePopUp(e) {
		var target = e.target;
		if (target.classList.contains('s-pop-up__close-button')) {
			target.parentNode.parentNode.style.display = 'none';
			this.body.classList.remove('scroll');
		} else if (target.classList.contains('s-pop-up__overlay')) {
			target.style.display = 'none';
			this.body.classList.remove('scroll');
		} else {
			return;
		}
	}
}());