var pgurl = window.location.href.substr(window.location.href.lastIndexOf("/")+1);

console.log(pgurl);

jQuery(function(){

	// menu add && remove .active
	$(".main_menu li").removeClass("active_li");
	$(".main_menu li a").removeClass("active_a");
	$(".main_menu_m li a").removeClass("active_a");


	$(".main_menu li a").each(function(){
	if($(this).attr("href") == pgurl || $(this).attr("href") == '' ){
		$(this).addClass("active_a");
		$(this).parent().addClass("active_li");
	}
	});
	$(".main_menu_m li a").each(function(){
	if($(this).attr("href") == pgurl || $(this).attr("href") == '' ){
		$(this).addClass("active_a");
	}
	});


		// показать боковую панель
	$('.btn_menu_m').click(function(event) {
		// if($('.wrap_modals').is(':hidden')){
			$('.wrap_mobil_m').show();
		// }
	});

	// скрыть боковую панель
	$('.close').click(function(event) {
		// if($('.wrap_modals').is(':visible')){
			$('.wrap_mobil_m').hide();
		// }
	});
	$('.btn_menu_m li a').click(function(event) {
		$('.wrap_mobil_m').hide();
});

});

// bxslider

if (pgurl == "" || pgurl == 'index.html'){

	$(document).ready(function () {
		$(".bxslider").bxSlider()
	})

}