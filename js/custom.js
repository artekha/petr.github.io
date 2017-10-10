	/*
	- Каждый скрипт разбит на модули для обеспечения целостности сайта.
	- Каждый модуль проверяет есть ли нужный элемент на странице. Это сделано для того что бы данный файл можно было подключать к любой из страниц сайта, не опасаясь некорректной работы скрипта.
*/

;$(document).ready(function(){
	// Вызов bxslider
	(function() {
		var slider = document.querySelector('.bxslider');
		if (slider) {
			$('.bxslider').bxSlider({
		  	mode: 'fade',
		  	auto: true,
		  	onSliderLoad: function (currentIndex){ // Ставит номер слайда при загрузке
	        $('.slides-counter').text(currentIndex < 9 ? '0' + (currentIndex + 1) : currentIndex + 1);
		    },
		    onSlideBefore: function ($slideElement, oldIndex, newIndex){ // Меняет номер на номер текущего слайда
		      $('.slides-counter').text(newIndex < 9 ? '0' + (newIndex + 1) : newIndex + 1);
		    }
		  });
		}
	}());
	// Создание ценового и квадратуного слайдеров
	(function() {
		var rangeSlider = document.getElementById('range-slider-price');
		if (rangeSlider) {
			// Ценовой слайдер
			var rangeSliderPrice = document.getElementById('range-slider-price');
		  noUiSlider.create(rangeSliderPrice, {
				start: [200, 800],
				step: 1,
				connect: true,
				range: {
					'min': 0,
					'max': 1000
				}
			});
			var rangeSliderPriceMin = document.getElementById('range-slider-price__value-min');
			var rangeSliderPriceMax = document.getElementById('range-slider-price__value-max');
			var rangeSliderPriceMinInput = document.getElementById('range-slider-price__value-min_input');
			var rangeSliderPriceMaxInput = document.getElementById('range-slider-price__value-max_input');

			rangeSliderPrice.noUiSlider.on('update', function ( values, handle ) {
				if ( handle ) {
					rangeSliderPriceMax.textContent = Math.round(values[handle]).toString().replace(/(\d{1,3})(?=(?:\d{3})+$)/g, '$1 '); // Максимальная цена
					rangeSliderPriceMaxInput.value = Math.round(values[handle]).toString().replace(/(\d{1,3})(?=(?:\d{3})+$)/g, '$1 '); // Максимальная цена (идет в скрытый инпут для бекэнда)
				} else {
					rangeSliderPriceMin.textContent = Math.round(values[handle]).toString().replace(/(\d{1,3})(?=(?:\d{3})+$)/g, '$1 '); // Минимальная цена
					rangeSliderPriceMinInput.value = Math.round(values[handle]).toString().replace(/(\d{1,3})(?=(?:\d{3})+$)/g, '$1 '); // Минимальная цена (идет в скрытый инпут для бекэнда)
				}

			});
	    // Квадратурный слайдер
		  var rangeSliderArea = document.getElementById('range-slider-area');
		  noUiSlider.create(rangeSliderArea, {
				start: [3200, 12800],
				step: 1,
				connect: true,
				range: {
					'min': 0,
					'max': 16000
				}
			});
			var rangeSliderAreaMin = document.getElementById('range-slider-area__value-min');
			var rangeSliderAreaMax = document.getElementById('range-slider-area__value-max');
			var rangeSliderAreaMinInput = document.getElementById('range-slider-area__value-min_input');
			var rangeSliderAreaMaxInput = document.getElementById('range-slider-area__value-max_input');
			rangeSliderArea.noUiSlider.on('update', function ( values, handle ) {
				if ( handle ) {
					rangeSliderAreaMax.textContent = Math.round(values[handle]).toString().replace(/(\d{1,3})(?=(?:\d{3})+$)/g, '$1 '); // Максимальная квадратура
					rangeSliderAreaMaxInput.value = Math.round(values[handle]).toString().replace(/(\d{1,3})(?=(?:\d{3})+$)/g, '$1 '); // Максимальная квадратура (идет в скрытый инпут для бекэнда)
				} else {
					rangeSliderAreaMin.textContent = Math.round(values[handle]).toString().replace(/(\d{1,3})(?=(?:\d{3})+$)/g, '$1 '); // Минимальная квадратура
					rangeSliderAreaMinInput.value = Math.round(values[handle]).toString().replace(/(\d{1,3})(?=(?:\d{3})+$)/g, '$1 '); // Минимальная квадратура (идет в скрытый инпут для бекэнда)
				}
			});

			var filterCheckbox = document.querySelectorAll('.content__checkbox');
			for (var i = 0; i < filterCheckbox.length; i++) {
				filterCheckbox[i].addEventListener('click', toggleCheckbox);
			}
			function toggleCheckbox() {
				if (this.querySelector('input').checked) {
					this.classList.add('content__checkbox_active');
				} else {
					this.classList.remove('content__checkbox_active')
				}
			}
		}
	}());
	// Вызов кастомных скроллбаров
	(function() {
		var scrollBlock1 = document.querySelector('#popup__drop-down__list');
		var scrollBlock2 = document.querySelector('.fav-popup__cards-wrapper');
		if (scrollBlock1 && scrollBlock2) {
			$(window).on("load",function(){
		    $("#popup__drop-down__list").mCustomScrollbar({
		    	theme: "little"
		    });
		    $(".fav-popup__cards-wrapper").mCustomScrollbar({
		    	theme: "big"
		    });
		  });
		}
	}());
	// Выставление padding-right у области с карточками в модальном окне "Избранное" в зависимости от того есть скролл или нет
	(function() {
		var cardsArea = document.querySelector('.fav-popup__cards-wrapper');
		if (cardsArea) {
			var cards = cardsArea.querySelector('.fav-popup__cards');
			if (cardsArea.scrollHeight > (cards.offsetHeight + 9)) {
				cards.style.paddingRight = '40px';
			} else {
				cards.style.paddingRight = '0px';
			}
			window.onresize = function(e) {
				if (cardsArea.scrollHeight > (cards.offsetHeight + 9)) {
					cards.style.paddingRight = '40px';
				} else {
					cards.style.paddingRight = '0px';
				}
			}
		}
	}());
	// Кнопка "Вернуться к фильтру" на главной
	(function() {
		var backToFilter = document.querySelector('.content__catalog__back-to-filter');
		if (backToFilter) {
			$(backToFilter).click(function(){
		    var el = $(this).attr('href');
		    $('body').animate({
		      scrollTop: $(el).offset().top
		    }, 700);
		    return false; 
			});
		}
	}()); 
	// Кнопка "Задать вопрос по дому" на странице карточки товара
	(function() {
		var getToForm = document.querySelector('.card-content__description__ask');
		if (getToForm) {
			$(getToForm).click(function(){
		    var el = $(this).attr('href');
		    $('body').animate({
		      scrollTop: $(el).offset().top - 100
		    }, 700);
		    return false; 
			});
		}
	}()); 
	// Кнопки "Добавить в избранное" (сердечко) на карточках товаров
	(function() {
		var cardFavoriteButton = document.querySelector('.content__catalog-card__description__favorite');
		if (cardFavoriteButton) {
			var favoriteButton = document.querySelectorAll('.content__catalog-card__description__favorite');
			for (var i = 0; i < favoriteButton.length; i++) {
				favoriteButton[i].addEventListener('click', toggleActiveFavorite);
			}

			function toggleActiveFavorite(e) {
				e.preventDefault();
				this.classList.toggle('content__catalog-card__description__favorite_active');
			}
		}
	}());
	// Информационное поле на карте
	(function() {
		var toggler = document.querySelector('.about-content__map__toggler');
		if (toggler) {
			toggler.onclick = function(e) {
				e.preventDefault();
				var block = toggler.parentNode.querySelector('.about-content__map__info');
				if (toggler.classList.contains('about-content__map__toggler_active')) {
					$(block).fadeOut(100); 
					toggler.classList.remove('about-content__map__toggler_active');
				} else {
					$(block).fadeIn(100);
					toggler.classList.add('about-content__map__toggler_active');
				}
			};
		}
	}());
	(function() {
		var toggler = document.querySelector('.contacts-content__map__toggler');
		if (toggler) {
			toggler.onclick = function(e) {
				e.preventDefault();
				var block = toggler.parentNode.querySelector('.contacts-content__map__info');
				if (toggler.classList.contains('contacts-content__map__toggler_active')) {
					$(block).fadeOut(100); 
					toggler.classList.remove('contacts-content__map__toggler_active');
				} else {
					$(block).fadeIn(100);
					toggler.classList.add('contacts-content__map__toggler_active');
				}
			};
		}
	}());
	// Проверка заполнения инпутов
	(function() {
		var input = document.querySelector('.form__input');
		if (input) {
			var inputs = document.querySelectorAll('.form__input');
			for (var i = 0; i < inputs.length; i++) {
				inputs[i].onkeypress = function addActiveInput(e) {
					if (this.getAttribute('type') === 'phone') {
						if ($(this).val().length > 0) {
							this.classList.add('form__input_active');
						}
					} else {
						if (($(this).val().length + 1) > 0) {
							this.classList.add('form__input_active');
						}
					}
				}
				inputs[i].onkeyup = function(e) {
					if (e.keyCode !== 8) return;
					if ($(this).val() == '') {
						this.classList.remove('form__input_active');
					}
				}
			}
		}
	}());
	// Dropdown меню в модальном окне "Заказать звонок"
	(function() {
		var dropDownToggler = document.querySelector('.popup__drop-down__link');
		var dropDownMenu = document.querySelector('.popup__drop-down__list');
		var hiddenInput = document.querySelector('#popup__feedback-input');
		if (dropDownToggler) {
			dropDownToggler.onclick = function(e) {
				e.preventDefault();
				$('.popup__drop-down__list').fadeIn(100);
				$('.popup__drop-down__list-close').fadeIn(0);
			}
			var dropDownClose = document.querySelector('.popup__drop-down__list-close');
			dropDownClose.onclick = function(e) {
				e.preventDefault();
				$('.popup__drop-down__list').fadeOut(100);
				$('.popup__drop-down__list-close').fadeOut(300);
			}
			var options = dropDownMenu.querySelectorAll('.drop-down__option');
			for (var i = 0; i < options.length; i++) {
				options[i].addEventListener('click', selectOption);
			}
			function selectOption(e) {
				e.preventDefault();
				var option = this.textContent;
				dropDownToggler.textContent = option;
				hiddenInput.value = option;
				$('.popup__drop-down__list').fadeOut(100);
				$('.popup__drop-down__list-close').fadeOut(300);
				dropDownToggler.classList.add('popup__drop-down__link_active');
			}
		}
	}());
	// Модальные окна
	(function() {
		var isPopup = document.querySelector('.popup-link');
		if (isPopup) {
			var popups = document.querySelectorAll('.popup-link');
			for (var i = 0; i < popups.length; i++) {
				popups[i].addEventListener('click', showHidePopup);
			}

			function showHidePopup(e) {
				e.preventDefault();
				var href = this.getAttribute('href');
				var popup = document.getElementById(href);
				var windows = document.querySelectorAll('.popup__overlay')
				for (var i = 0; i < windows.length; i++) {
					if (windows[i].offsetHeight && !(this.classList.contains('link-checked'))) {
						var unActiveLink = document.querySelector('.' + windows[i].id);
						unActiveLink.classList.remove(windows[i].id + '_active');
						unActiveLink.classList.remove('link-checked');
						$(windows[i]).fadeOut(100);
						document.body.classList.remove('scroll');
					}
				}

				var href = this.getAttribute('href');
				var popup = document.getElementById(href);
				if (this.classList.contains('link-checked')) {
					$(popup).fadeOut(100);
					this.classList.remove('link-checked');
					this.classList.remove('popup-active');
					this.classList.remove(href + '_active');
					document.body.classList.remove('scroll');
				} else {
					$(popup).fadeIn(100);
					this.classList.add('link-checked');
					this.classList.add('popup-active');
					this.classList.add(href + '_active');
					document.body.classList.add('scroll');
				}

				var close = popup.querySelector('.popup__close');
				if (close) {
					close.onclick = function(e) {
						$(popup).fadeOut(100);
						var currentLink = document.querySelector('.link-checked');
						currentLink.classList.remove('link-checked');
						currentLink.classList.remove('popup-active');
						currentLink.classList.remove(href + '_active');
						document.body.classList.remove('scroll');
					}
				}
			}
		}
	}());
	// Галлерея на странице карточек
	(function() {
		var gallery = document.querySelector('.card-content__gallery')
		if (gallery) {
			$(document).ready(function() {

	    	$('#ul_li').lightGallery(); 
	    });
		}
	}());
	// Маска для инпутов
	(function() {
		var inputs = document.querySelectorAll('input');
		for (var i = 0; i < inputs.length; i++) {
			if (inputs[i].getAttribute('type') == 'phone') {
				var phoneInput = inputs[i];
				$(inputs[i]).inputmask({"mask": "+ 99 (999) 99-99-999", showMaskOnHover: false });
			}
		}
	}());
	// Меню на мобилках
	(function() {
		var toggler = document.querySelector('.header__nav-toggler');
		if (toggler) {
			var menu = document.querySelector('.header__nav');
			toggler.onclick = function(e) {
				var popups = document.querySelectorAll('.popup__overlay');
				for (var i = 0; i < popups.length; i++) {
					if (popups[i].offsetHeight > 0) {
						$(popups[i]).hide();
						var linkClass = popups[i].id;
						var link = document.querySelector('.' + linkClass);
						link.classList.remove(linkClass + '_active');
					}
				}
				e.preventDefault();
				if (menu.classList.contains('header__nav_hidden')) {
					showMenu();
				} else {
					hideMenu();
				}
			}
			function showMenu() {
				document.body.classList.add('scroll');
				toggler.classList.add('header__nav-toggler_active');
				menu.classList.remove('header__nav_hidden');
				menu.classList.add('header__nav_visible');
			}
			function hideMenu() {
				document.body.classList.remove('scroll');
				
			}
			var popups = document.querySelectorAll('.popup-link');
			for (var i = 0; i < popups.length; i++) {
				popups[i].addEventListener('click', checkMenu);
			}
			function checkMenu(e) {
				if (menu.offsetHeight !== 0) {
					toggler.classList.remove('header__nav-toggler_active');
					menu.classList.remove('header__nav_visible');
					menu.classList.add('header__nav_hidden');
				} 
			}
		}
	}());
	/*
	Временные скрипты
	*/
	// Временный показ результата фильтра
	(function() {
		var toggleButton = document.querySelectorAll('.request-answer-button');
		if (toggleButton.length > 0) {
			for (var i = 0; i < toggleButton.length; i++) {
				toggleButton[i].addEventListener('click', toggleForm);
			}
			function toggleForm(e) {
				e.preventDefault();
				if (this.closest('.form__request')) {
					$(this.closest('.form__request')).hide();
					$(this.closest('.form__request')).next().show();
				} else if (this.closest('.form__answer')) {
					$(this.closest('.form__answer')).hide();
					$(this.closest('.form__answer')).prev().show();
				}
			}
		}
	}());
});