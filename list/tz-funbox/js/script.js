function get_browser(){
  var ua = navigator.userAgent;
  if (ua.search(/rv:11.0/) > 0) return 'ie';
  if (ua.search(/MSIE/) > 0) return 'ie';
  if (ua.search(/Edge/) > 0) return 'Edge';

  return false;
}

// для ie  отклоняемся от дизайна макета..
  if(get_browser()){
    document.body.classList.add('ie');
    // + контент по центру
    document.body.classList.add('fdc');
  }


$(document).ready(function() {


// клик по упаковке или ссылке
   	   $('body').on('click', ".card, .link", function(e)
       	{
       		var product = $(this).closest('.product');
       		var data_count = +product.attr('data-count');
       		// формируем классы в зависимости от клика юзера по карточке или ссылке купи
       		var add_class = $(this).hasClass('link') ? 'selected selected_h' : 'selected mouse_first';


// усли выбрано убираем все вспомогательные классы
       		if(product.hasClass('selected')){
       			product.removeClass('selected selected_h mouse_first');
       			if(data_count<1)
       			// наступила печалька...
       				product.addClass('disable');
       		}

// добавляем классы
       		else if(!product.hasClass('disable')){
       			product.addClass(add_class);
       			// уменьшаем остаток...
       			product.attr('data-count', --data_count);
       		}

       	});

// событие повесил на все карточки, потому что не получилось отлавливать событие по добавленному атрибуту
   	   $('.card').mouseleave(function() {
   	   	var product = $(this).closest('.product');
   	   	if(product.hasClass('mouse_first'))
   	   		product.removeClass('mouse_first').addClass('selected_h');
   	   });


});