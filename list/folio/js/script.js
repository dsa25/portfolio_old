// jQuery(function(){
	$(document).ready(function(){

		$('.bxslider').bxSlider({
			pagerCustom: '#bx-pager',
			auto: true,
		 autoControls: true,
		});

// nicescroll
			$('#bx-pager').niceScroll({
				cursorwidth: "7px",
				cursoropacitymin: "1",
				cursorcolor: 'rgb(134, 177, 30)',
				zindex: "0",
			});


			$('.wrap_contens').niceScroll({
				cursorwidth: "7px",
				cursoropacitymin: "1",
				cursorcolor: 'rgb(134, 177, 30)',
				zindex: "0",
			});



	// menu add && remove .active
	$(".main_menu li a").removeClass("active_a");

	var pgurl = window.location.href.substr(window.location.href.lastIndexOf("/")+1);

	$(".main_menu li a").each(function(){
	if($(this).attr("href") == pgurl || $(this).attr("href") == '' ){
		$(this).addClass("active_a");
	}
	});


			// show/hide   блок
		$('.btn_view').click(function(event) {

			if($('.wrap_contens').is(':hidden')){
				$('.wrap_contens').show();
				$('.btn_view').css({"transform": "rotate(180deg)"});
			} else if($('.wrap_contens').is(':visible')){
				$('.wrap_contens').hide();
				$('.btn_view').css({"transform": "rotate(0deg)"});
			}

		});




				$('html').css({
					"zoom" : "1.05",
				});



	});

// });
