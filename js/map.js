jQuery(document).ready(function($){
	//Местоположение: долгота, широта и коэффициент увеличения
	var latitude = 55.750543, 
		longitude = 37.177980,
		map_zoom = 14;

	//Адрес до иконки с маркером
	var marker_url = 'img/point.png';
		
	
	

	//Стили для элементов на карте
	var style = [{"featureType":"administrative","elementType":"labels.text.fill","stylers":[{"color":"#444444"}]},{"featureType":"landscape","elementType":"all","stylers":[{"color":"#f2f2f2"},{"visibility":"simplified"}]},{"featureType":"landscape.natural.landcover","elementType":"all","stylers":[{"visibility":"simplified"}]},{"featureType":"landscape.natural.terrain","elementType":"all","stylers":[{"visibility":"simplified"}]},{"featureType":"poi","elementType":"all","stylers":[{"visibility":"off"}]},{"featureType":"road","elementType":"all","stylers":[{"saturation":-100},{"lightness":45}]},{"featureType":"road.highway","elementType":"all","stylers":[{"visibility":"simplified"}]},{"featureType":"road.arterial","elementType":"labels.icon","stylers":[{"visibility":"off"}]},{"featureType":"transit","elementType":"all","stylers":[{"visibility":"off"}]},{"featureType":"water","elementType":"all","stylers":[{"color":"#c3c3c3"},{"visibility":"on"}]}];
		
	//Создание точки на карте
	var map_options = {
      	center: new google.maps.LatLng(latitude, longitude),
      	zoom: map_zoom,
      	panControl: false,
      	zoomControl: false,
      	mapTypeControl: false,
      	streetViewControl: false,
      	mapTypeId: google.maps.MapTypeId.ROADMAP,
      	scrollwheel: false,
      	styles: style,
      	fullscreenControl: true
    }
    //Инициализация карты
	var map = new google.maps.Map(document.getElementById('google-container'), map_options);
	//Добавляем свой маркер местонахождения на карту (свою иконку)			
	var marker = new google.maps.Marker({
	  	position: new google.maps.LatLng(latitude, longitude),
	    map: map,
	    visible: true,
	 		icon: marker_url,
	});

	//Добавляем свои иконки для кнопок увеличить/уменьшить на карту
	function CustomZoomControl(controlDiv, map) { 
	  	var controlUIzoomIn= document.getElementById('zoom-in'),
	  		controlUIzoomOut= document.getElementById('zoom-out'),
	  		controlUIfullscreen = document.getElementById('fullscreen');
	  	controlDiv.appendChild(controlUIzoomIn);
	  	controlDiv.appendChild(controlUIzoomOut);
	  	controlDiv.appendChild(controlUIfullscreen);

		//Делаем привязку для кнопок увеличить/уменьшить при клике
		google.maps.event.addDomListener(controlUIzoomIn, 'click', function() {
		    map.setZoom(map.getZoom()+1)
		});
		google.maps.event.addDomListener(controlUIzoomOut, 'click', function() {
		    map.setZoom(map.getZoom()-1)
		});
		google.maps.event.addDomListener(controlUIfullscreen, 'click', function() {
		    map.fullscreen()
		});
	}

	var zoomControlDiv = document.createElement('div');
 	var zoomControl = new CustomZoomControl(zoomControlDiv, map);

  	//Помещаем кнопки увеличить/уменьшить на карту в левый верхний угол
  	map.controls[google.maps.ControlPosition.LEFT_TOP].push(zoomControlDiv);
});