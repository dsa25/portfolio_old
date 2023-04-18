$(function(){

	$(document).mousemove(function(e){
		$('.dom').css({
			// 'transform':'rotateX('+e.pageY+'deg) rotateY('+e.pageX+'deg)'
			// 'transform':'rotateX('+e.pageY+'deg)'
			// 'transform':'rotateY('+e.pageX+'deg)'
		});
	});

	// $('body').text("left: " +position.left);
	$('.menu a').click(function(event) {
		var index = $(this).index();
		// $('.wrapper').css({animation: 'none'});

	setTimeout(function() {
		if (index == 0) {
			$('.dom').css({'transform': 'rotateY(0deg)'});
			$('.wrapper').css({animation: 'Scale 1.5s'});
		}
		else if (index == 1) {
			$('.dom').css({'transform': 'rotateY(-90deg)'});
			$('.wrapper').css({animation: 'Scale 1.5s'});

		}
		else if (index == 2) {
			$('.dom').css({'transform': 'rotateY(-180deg)'});
			$('.wrapper').css({animation: 'Scale 1.5s'});
		}
		else if (index == 3) {
			$('.dom').css({'transform': 'rotateY(-270deg)'});
			$('.wrapper').css({animation: 'Scale 1.5s'});
		}
	}, 500);

	$('.wrapper').css({animation: 'noScale'});


	});

	for (var i = 1; i <= 10; i++) {
		var left = getRandom(3,97);
		var size = getRandom(15,25);
		var zindex = getRandom(4,7);
		// var zindex = getRandom(4,7);
		// $('body').append('<div class="snowflake" style="left:'+left+'%;z-index: '+zindex+';box-shadow: 0 0 '+size+'px '+size+'px rgba(255,255,255,0.8);: '+zindex+';"><div>');
	}
	console.log($('body .snowflake').length);


	function getRandom(min,max){
		return Math.floor((Math.random() * (max - min + 1) + min));
	}


});

