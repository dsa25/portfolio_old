jQuery(function(){

// выпадающее вертикальное под-меню по клику
	$('.menuhid').click(function(event){
		var a = $('.menuhid').index(this);
		if ($('#menuhid-hidden' + a).is(':hidden')) {
			$('#menuhid-hidden' + a).show();
		}
		else if($('#menuhid-hidden' + a).is(':visible')) {
			$('#menuhid-hidden' + a).hide();
		}
	});


	// что то вроде слайдера
	$('.tab_').click(function(event){

		var count,ind;
		count = $('.tab_content').length;
		ind = $('.tab_').index(this);

		for (i = 0; i <= count; i++){
			if($('#tab'+ i).is(':visible')){
				$('.tab_content').hide();
			}
		}

		$('#tab' + ind).show();

	});


	// table
	function tables(ind){
		var d = new Date();
		var seconds = d.getSeconds();
		function getRandom(min,max){
			return Math.floor((Math.random() * (max - min + 1) + min));
		}

		for (i = 1; i <= ind; i++){
			$('.tables').append('<tr><td>'+i+'</td><td>user'+getRandom(1,10)+'</td><td>'+(i*seconds)+'</td><td>'+(i*10-seconds)+'</td></tr>');
		}
	}
	tables(21);

});
