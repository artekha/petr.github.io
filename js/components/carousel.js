;'use strict';

(function() {
	var carousel = document.querySelector('.s-carousel');
	var arrowLeft = carousel.querySelector('.s-carousel__control-left');
	var arrowRight = carousel.querySelector('.s-carousel__control-right');

	arrowLeft.onclick = function(e) {
		console.log(1);
	};

	arrowRight.onclick = function(e) {
		console.log(1);
	};
}());