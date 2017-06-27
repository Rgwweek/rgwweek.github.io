$(document).ready(function(){
    //====================================
    //--------- Functions ----------------
    //====================================

    // Returns a function, that, as long as it continues to be invoked, will not
    // be triggered. The function will be called after it stops being called for
    // N milliseconds. If `immediate` is passed, trigger the function on the
    // leading edge, instead of the trailing.
    function debounce(func, wait, immediate) {
        var timeout;
        return function () {
            var context = this;
            var args = arguments;
    
            var later = function () {
                timeout = null;
                if (!immediate) {
                    func.apply(context, args);
                }
            };
    
            var callNow = immediate && !timeout;
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
            if (callNow) {
                func.apply(context, args);
            }
        };
    }
    
    // HOW IT USE
    // var myEfficientFn = debounce(function () {
    //     // All the taxing stuff you do
    // }, 250);
    //
    // window.addEventListener('resize', myEfficientFn);
    function equalHeight(container) {
        var currentTallest = 0;
        var currentRowStart = 0;
        var rowDivs = new Array();
        var $el;
        var topPosition = 0;
    
        $(container).each(function () {
    
            $el = $(this);
            $($el).height('auto');
            topPostion = $el.position().top;
    
            if (currentRowStart !== topPostion) {
                for (currentDiv = 0; currentDiv < rowDivs.length; currentDiv++) {
                    rowDivs[currentDiv].height(currentTallest);
                }
                rowDivs.length = 0; // empty the array
                currentRowStart = topPostion;
                currentTallest = $el.height();
                rowDivs.push($el);
            } else {
                rowDivs.push($el);
                currentTallest = (currentTallest < $el.height()) ? ($el.height()) : (currentTallest);
            }
    
            for (currentDiv = 0; currentDiv < rowDivs.length; currentDiv++) {
                rowDivs[currentDiv].height(currentTallest);
            }
        });
    }
    // Miss click
    function missClick(div) {
        if (!div.is(e.target) && // если клик был не по нашему блоку
            div.has(e.target).length === 0) { // и не по его дочерним элементам
            div.hide(); // скрываем его
        }
    }
    // END Miss click
    
    // Обертка для вызова функции
    // jQuery(function ($) {
    //     $(document).mouseup(function (e) { // событие клика по веб-документу
    //         // Вызываем функцию с необходимым параметром при клике
    //     });
    // });
    // Responsive iframe video
    
    function responsiveIframe(contentContainer) {
        var videoWrapper = '<div class"embed-responsive embed-responsive-16by9"></div>';
        contentContainer.find('iframe').wrap(videoWrapper);
    }
    // END Responsive iframe video

    //====================================
    //--------- Custom Scripts -----------
    //====================================

    // Custom Google Map style
    $(function () {
        var isMobile = {
            Android: function() {
                return navigator.userAgent.match(/Android/i);
            },
            BlackBerry: function() {
                return navigator.userAgent.match(/BlackBerry/i);
            },
            iOS: function() {
                return navigator.userAgent.match(/iPhone|iPad|iPod/i);
            },
            Opera: function() {
                return navigator.userAgent.match(/Opera Mini/i);
            },
            Windows: function() {
                return navigator.userAgent.match(/IEMobile/i);
            },
            any: function() {
                return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
            }
        };
    
        function initialize_map_map() {
            // Позиция карты
            var location = {"lat":50.071036,"lng":14.402522};
    
            // Стили по умолчанию
            var styles = [
                {
                    "featureType": "road",
                    "elementType": "geometry",
                    "stylers": [
                        {
                            "lightness": 100
                        },
                        {
                            "visibility": "simplified"
                        }
                    ]
                },
                {
                    "featureType": "water",
                    "elementType": "geometry",
                    "stylers": [
                        {
                            "visibility": "on"
                        },
                        {
                            "color": "#C6E2FF"
                        }
                    ]
                },
                {
                    "featureType": "poi",
                    "elementType": "geometry.fill",
                    "stylers": [
                        {
                            "color": "#C5E3BF"
                        }
                    ]
                },
                {
                    "featureType": "road",
                    "elementType": "geometry.fill",
                    "stylers": [
                        {
                            "color": "#D1D1B8"
                        }
                    ]
                },
                {"featureType":"road","elementType":"geometry","stylers":[{"lightness":100},{"visibility":"simplified"}]},{"featureType":"water","elementType":"geometry","stylers":[{"visibility":"on"},{"color":"#C6E2FF"}]},{"featureType":"poi","elementType":"geometry.fill","stylers":[{"color":"#C5E3BF"}]},{"featureType":"road","elementType":"geometry.fill","stylers":[{"color":"#D1D1B8"}]},        ]
    
            // Отключение перетаскивания карты для мобильных устройств
            var drag = true;
            if( isMobile.any() && 0 == 0){
                drag = false;
            }
    
            // Настройки карты
            var mapOptions = {
                center: location,
                zoom: 16,
                scrollwheel: false,
                draggable: drag,
                mapTypeControl: true,
                mapTypeControlOptions: {
                    style: google.maps.MapTypeControlStyle.HORIZONTAL_BAR,
                    position: google.maps.ControlPosition.BOTTOM_CENTER            },
                zoomControl: true,
                zoomControlOptions: {
                    style: google.maps.ZoomControlStyle.LARGE,
                    position: google.maps.ControlPosition.LEFT_CENTER            },
                scaleControl: true,
                streetViewControl: true,
                streetViewControlOptions: {
                    position: google.maps.ControlPosition.LEFT_TOP            }
            };
    
            var map = new google.maps.Map(document.getElementById('map_map'), mapOptions);
    
            var latlng = new google.maps.LatLng( location.lat, location.lng );
            map.setOptions({styles: styles});
    
            //  Сдвиг карты
    
    
            var marker = new google.maps.Marker({
                position: location,
                map: map,
                icon: '/images/main/marker.png',
                title: 'VR/AR Gambling Conf EU',
            });
        }
    
        google.maps.event.addDomListener(window, 'load', initialize_map_map);
    });
    /*
    $(function () {
        if ($('#map_map').length > 0) { // #map - id conteiner
            jQuery(function ($) {
                var isMobile = {
                    android: function () {
                        return navigator.userAgent.match(/Android/i);
                    },
                    blackBerry: function () {
                        return navigator.userAgent.match(/BlackBerry/i);
                    },
                    iOS: function () {
                        return navigator.userAgent.match(/iPhone|iPad|iPod/i);
                    },
                    opera: function () {
                        return navigator.userAgent.match(/Opera Mini/i);
                    },
                    windows: function () {
                        return navigator.userAgent.match(/IEMobile/i);
                    },
                    any: function () {
                        return (
                            isMobile.android() ||
                            isMobile.blackBerry() ||
                            isMobile.iOS() ||
                            isMobile.opera() ||
                            isMobile.windows());
                    }
                };
    
                var styles = [{
                    'featureType': 'all',
                    'stylers': [{
                        'saturation': -100
                    }, {
                        'gamma': 0.5
                    }]
                }, {
                    'featureType': 'road',
                    'elementType': 'geometry',
                    'stylers': [{
                        'lightness': 100
                    }, {
                        'visibility': 'simplified'
                    }]
                }, {
                    'featureType': 'water',
                    'elementType': 'geometry',
                    'stylers': [{
                        'visibility': 'on'
                    }, {
                        'color': '#c4c4c4'
                    }]
                }, {
                    'featureType': 'poi',
                    'elementType': 'geometry.fill',
                    'stylers': [{
                        'color': '#e2e2e2'
                    }]
                }, {
                    'featureType': 'road',
                    'elementType': 'geometry.fill',
                    'stylers': [{
                        'color': '#ffffff'
                    }]
                }];
                var styledMap = new google.maps.StyledMapType(styles, {
                    name: 'Styled Map'
                });
    
                var myOptions = {
                    zoom: 18,
                    center: center,
                    scrollwheel: false,
                    draggable: drag,
                    mapTypeId: google.maps.MapTypeId.ROADMAP
                };
                var map = new google.maps.Map(
                    document.getElementById('map'), myOptions);
                var image = 'images/marker.png'; // icon map image
                var beachMarker = new google.maps.Marker({
                    position: position,
                    map: map,
                    icon: image
                });
                var marker = new google.maps.Marker({
                    position: position,
                    map: map,
                    icon: image,
                    title: 'CasinoForumBatumi' // marker text
                });
                var lat = 55.800129; // latitude
                var lng = 37.674181; // longitude
                var position = new google.maps.LatLng(lat, lng);
                var center = new google.maps.LatLng(lat, lng);
                var drag = true;
    
                if (isMobile.any()) {
                    drag = false;
                }
    
                map.mapTypes.set('map_style', styledMap);
                map.setMapTypeId('map_style');
    
                $('.for_ct').click(function (e) {
                    if (e.srcElement === this) {
                        $(this).prev().click();
                    }
                });
            });
        }
    });
    */
	 $(function () {
	 	$(window).scroll(function () {
	 		if ($(this).scrollTop() > 0 && !$('.top').hasClass('scrolling')) {
	 			$('.btn-up').addClass('active-top');
	 		}
	 		else {
	 			$('.btn-up').removeClass('active-top');
	 		}
	 	});
	 	$('.btn-up').click(function () {
	 		$('body,html').animate({
	 			scrollTop: 0
	 		}, 900, function () {
	 			$('.btn-up').removeClass('active-top');
	 		});
	 	});
	 });
    // Modal popup
    
    var cookie = document.cookie;
    var date = new Date();
    
    // Modal show timer
    if (cookie.indexOf('popclose=submited') === -1) {
        setTimeout(function () {
            $('#Modal').modal('show');
        }, 2000); // Time popUp
    }
    
    $('#Modal .close').click(function () {
        date.setDate(date.getDate() + 14);
        document.cookie = 'popclose=submited; expires=' + date.toGMTString();
    });
    
    $('#Modal').click(function (data, handler) {
        if (data.target === this) {
            date.setDate(date.getDate() + 14);
            document.cookie = 'popclose=submited; expires=' + date.toGMTString();
        }
    });
    
    // For form id
    $('#lottery-popup-form').on('beforeSubmit', function () {
        date.setDate(date.getDate() + 365);
        document.cookie = 'popclose=submited; expires=' + date.toGMTString();
    });
    // End Modal popup script

    //====================================
    //--------- Setting libs -------------
    //====================================
	//	  Hamburger
	
		$(".hamburger").click(function () {
			if($('.hamburger').hasClass("is-active") == true) {
				$('body').removeClass('modal-open');
				$('div.nav-backdrop').remove();
				$('.hamburger').removeClass('is-active');
				$('nav').removeClass('menu-active');
	
	
			}
	
			else {
				$('body').addClass('modal-open').append('<div class="modal-backdrop nav-backdrop fade in"></div>');
				$(this).toggleClass("is-active");
				$('nav').addClass('menu-active');
	
				$('.nav-backdrop').click(function () {
					$('.hamburger').removeClass('is-active');
					$('body').removeClass('modal-open');
					$('.header_nav').removeClass('menu-active');
					$(this).remove();
				});
	
			}
	
			});
	
	//	  Привоение активного класса меню
	
		  	$(".menu-list > a").click(function(e){
				$("a.active-link").removeClass("active-link");
				$(e.target).addClass("active-link");
			});
	
		  function windowSize(){
			   if (window.innerWidth >= 768) {
					$('div.nav-backdrop').remove();
				   	$('body').removeClass('modal-open');
				   	$('.left-block').removeClass('height-left-block');
			   } else {
				   $('.left-block').addClass('height-left-block');
			   }
		   }
	 		$(window).resize(windowSize);
	
	
	//Выпадение меню
	
	$('#exhibition-links').click(function(){
	    $("#exhibition").slideToggle("slow");
	    $(this).toggleClass('top');
	    
	});
	
	$('#conference-links').click(function(){
	    $("#conference").slideToggle("slow");
	    $(this).toggleClass('top');
	    
	});
	$('#participants-links').click(function(){
	    $("#participants").slideToggle("slow");
	    $(this).toggleClass('top');
	    
	});
	$('#programm-links').click(function(){
	    $("#programm").slideToggle("slow");
	    $(this).toggleClass('top');
	    
	});
	$('#photo-links').click(function(){
	    $("#photo").slideToggle("slow");
	    $(this).toggleClass('top');
	    
	});
	$('#news-links').click(function(){
	    $("#news").slideToggle("slow");
	    $(this).toggleClass('top');
	    
	});
	$('#xs-menu-links').click(function(){
	    $("#xs-menu").slideToggle("slow");
	    $('.visible-xs >.open-mobile-menu').toggleClass('mobile-top');
	    
	});
	//	Слик карусель спикеров
	$('.wrap-slick').slick({
		dots: true,
		infinite: true,
		speed: 300
		, slidesToShow: 3
		, slidesToScroll: 3
		, responsive: [
			{
				breakpoint: 991
				, settings: {
					slidesToShow: 2
					, slidesToScroll: 2
					, infinite: true
					, dots: true
				}
			}
			, {
				breakpoint: 600
				, settings: {
					slidesToShow: 1
					, slidesToScroll: 1
				, }
			}
			, // You can unslick at a given breakpoint now by adding:
			// settings: "unslick"
			// instead of a settings object
		  ]
	});
	//	Слик карусель партнеров
	$('.partner-sponsor_list').slick({
		dots: true,
	     arrows: false
		, infinite: true
		, speed: 300
		, rows: 2
		, slidesToShow: 4
		, slidesToScroll: 4
		, responsive: [
			{
				breakpoint: 1199
				, settings: {
					slidesToShow: 4
					, slidesToScroll: 4
					, infinite: true
					, dots: true
				}
	        }
			, {
				breakpoint: 768
				, settings: {
					slidesToShow: 2
					, slidesToScroll: 2
				}
			}
			, {
				breakpoint: 500
				, settings: {
	                rows:3,
	                arrows: true,
					slidesToShow: 1
					, slidesToScroll: 1,
	                dots: false
				}
			}
			// You can unslick at a given breakpoint now by adding:
			// settings: "unslick"
			// instead of a settings object
		  ]
	});
	//	Слик карусель партнеров на странице спонсоров
	$('.write-articles').slick({
		dots: true,
	     arrows: false
		, infinite: true
		, speed: 300
		, rows: 1
		, slidesToShow: 3
		, slidesToScroll: 3
		, responsive: [
			{
				breakpoint: 1199
				, settings: {
					slidesToShow: 3
					, slidesToScroll: 3
					, infinite: true
					, dots: true
				}
	        }
			, {
				breakpoint: 768
				, settings: {
	                dots:false,
	                arrows:true,
					slidesToShow: 1
					, slidesToScroll: 1
				}
			}
			
			// You can unslick at a given breakpoint now by adding:
			// settings: "unslick"
			// instead of a settings object
		  ]
	});
	//	Слик карусель отзывов
	$('.comments').slick({
		dots: true
		, infinite: true
		, adaptiveHeight: true
		, speed: 300
		, rows: 1
		, slidesToShow: 1
		, slidesToScroll: 1
	, });
	//	Magnific popUp
			$(document).ready(function() {
				$('.gallery').magnificPopup({
					delegate: 'a',
					type: 'image',
					tLoading: 'Loading image #%curr%...',
					mainClass: 'mfp-img-mobile',
					gallery: {
						enabled: true,
						navigateByImgClick: true,
						preload: [0,1] // Will preload 0 - before current, and 1 after the current image
					},
					image: {
						tError: '<a href="%url%">The image #%curr%</a> could not be loaded.',
						titleSrc: function(item) {
							return item.el.attr('title') + '<small>by Marsel Van Oosten</small>';
						}
					}
				});
			});


    //====================================
    //-------- Only this site ------------
    //====================================
	//	  Валидация
	
		$('.form-control').on("focus", function(e) {
			console.log(e.target);
			$(e.target).siblings('.validation-error').addClass('validation-active');
		});
	
		 $('.form-control').on("blur", function() {
			$(".validation-error").removeClass('validation-active');
		});
	
		$(".image").click(function(){	// Событие клика на маленькое изображение
		  	var img = $(this);	// Получаем изображение, на которое кликнули
			var src = img.attr('src'); // Достаем из этого изображения путь до картинки
			$("body").append("<div class='popup'>"+ //Добавляем в тело документа разметку всплывающего окна
							 "<div class='popup_bg'></div>"+ // Блок, который будет служить фоном затемненным
							 "<img src="+src+" class='popup_img' />"+ // Само увеличенное фото
							 "</div>"); 
			$(".popup").fadeIn(800); // Медленно выводим изображение
			$(".popup_bg").click(function(){	// Событие клика на затемненный фон	   
				$(".popup").fadeOut(800);	// Медленно убираем всплывающее окно
				setTimeout(function() {	// Выставляем таймер
				  $(".popup").remove(); // Удаляем разметку высплывающего окна
				}, 800);
			});
		});
	$(function _WindowLoc () {
	    if (window.location.pathname == '/index.html') {
	        $('footer').removeClass('footer-page');  
	    }
	    if (window.location.pathname !== '/index.html') {
	        $('.content_form').addClass('margin0');  
	        $('.content_form-right').addClass('margin0');  
	    }
	    
	    
	});




});