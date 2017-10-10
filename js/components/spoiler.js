;'use strict';

(function() {
	document.addEventListener('click', spoiler);

	function spoiler(e) {
		var target = e.target;
		if (target.getAttribute('data-component') !== 'spoiler') return;
		e.preventDefault();
		var block = this.getElementById(target.getAttribute('href'));
		block.classList.toggle('hide');
	}
}());