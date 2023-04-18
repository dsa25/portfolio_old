function scroll_active(){
	var window_top = $(window).scrollTop();
	var about_top = $('#about').offset().top -10;
	var service_top = $('#service').offset().top -10;
	var work_top = $('#work').offset().top -10;
	var blog_top = $('#blog').offset().top -10;
	var contact_top = $('#contact').offset().top -  $(window).height() + 180;

	if (window_top > about_top) {
		$(".main_menu li a").removeClass("active");
		$('a[href="#about"]').addClass("active");
		}
	if (window_top > service_top) {
		$(".main_menu li a").removeClass("active");
		$('a[href="#service"]').addClass("active");
		}
	if (window_top > work_top) {
		$(".main_menu li a").removeClass("active");
		$('a[href="#work"]').addClass("active");
		}
	if (window_top > blog_top) {
		$(".main_menu li a").removeClass("active");
		$('a[href="#blog"]').addClass("active");
		}
	if (window_top > contact_top) {
			$(".main_menu li a").removeClass("active");
			$('a[href="#contact"]').addClass("active");
		}
}

jQuery(function(){
	// $(document).ready(function(){
		$(window).scroll(scroll_active);
	// }

	$(document).ready(function(){

		// Фикмированная шапка при скролле
		$(".heads").removeClass("fix_head_scroll");
		$(window).scroll(function(){
			if ($(this).scrollTop() > 10) {
				$(".heads").addClass("fix_head_scroll").fadeIn('fast');
			} else {
				$(".heads").removeClass("fix_head_scroll").fadeIn('fast');
			};
		});

		// addClass for main menu
		$('a[href*="#"]').click(function(event){
			$('a[href*="#"]').removeClass("active").fadeIn('fast');
			$(this).addClass("active").fadeIn('fast');
		});

		// $(".heads").removeClass("fix_head_scroll");
		$(window).scroll(function(){
			if ($(this).scrollTop() > 10) {
				$(".heads").addClass("fix_head_scroll").fadeIn('fast');
			} else {
				$(".heads").removeClass("fix_head_scroll").fadeIn('fast');
			};
		});

	});


// bxslider
	$(document).ready(function(){
	  $('.bxslider').bxSlider();
	});


// плавный скролл при переходе по якорям
	$(document).ready(function(){
	   $('a[href*="#"]').bind("click", function(e){
	      var anchor = $(this);
	      $('html, body').stop().animate({
	         scrollTop: $(anchor.attr('href')).offset().top
	      }, 1000);
	      e.preventDefault();
	   });
	   return false;
	});﻿


		// показать боковую панель
	$('.btn_menu_m').click(function(event) {
		// if($('.wrap_modals').is(':hidden')){
			$('.wrap_modal_w').show();
		// }
	});

	// скрыть боковую панель
	$('.close_m').click(function(event) {
		// if($('.wrap_modals').is(':visible')){
			$('.wrap_modal_w').hide();
		// }
	});


	// nicescroll
		$(document).ready(function() {
				$('.p_scroll').niceScroll({
					cursorwidth: "7px",
					cursoropacitymin: "1",
					cursorcolor: '#95e1d3',
					zindex: '2',
				});
			}
		);

// good css
	$('.wrap_list_items:first-child p').css({"display": "block"});
	$('.wrap_list_items:first-child .arrow_a').css({"transform": "rotate(0deg)"});

	$('.head_l').click(function(event){
		var a = $('.head_l').index(this);
		if ($('.head_l'+a+'+p').is(':hidden')){
			// all hide
			$('.head_l+p').hide();
			$('.head_l .arrow_a').css({"transform": "rotate(180deg)"});
			// this show
			$('.head_l'+a+'+p').show();
			$('.head_l'+a+' .arrow_a').css({"transform": "rotate(0deg)"});
		}
		else if ($('.head_l'+a+'+p').is(':visible')){
			// this hide
			$('.head_l'+a+'+p').hide();
			$('.head_l'+a+' .arrow_a').css({"transform": "rotate(180deg)"});
		}
	});




});