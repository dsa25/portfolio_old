jQuery(function(){

	function sorts(arrOrd){
		for (var i = 0; i < arrOrd.length; i++) {
			if(arrOrd[i] !== undefined){
				return arrOrd[i];
			}
		}
	}

window.idBagel = 0;
window.turns = 0;
window.time = 0;


$('.bagel').draggable({revert: true});

$('.block').droppable({
	hoverClass: "ui-state-active",
	drop: function( event, ui ) {
	  	var Parent = $(this).attr("id");
	  	var arrOrd = [];
	  	$('#'+Parent+'> .bagel').each(function(index,element){
	  		var bagelid = $(this).attr("id");
	  		var orders = $(this).css("order");
	  		arrOrd[orders] = bagelid;
	  	});

	  	var firstBagel = 0;
	  	firstBagel = $('#'+ sorts(arrOrd)).css("order");
	  	var ordDrag = $('#'+ idBagel).css("order");
	  	if (firstBagel < ordDrag) {
	  		$( this ).prepend($("#"+idParent+">"+"#"+idBagel));
	  		$('#'+idParent).prepend($("#"+Parent+">"+"#"+idBagel));
	  	} else if((firstBagel > ordDrag) || (firstBagel === undefined)){
	  		$(this).prepend($("#"+idParent+">"+"#"+idBagel));
	  		turns++;
	  		$('#turns').val(turns);
	  	}
	  $("#"+idBagel).css({
	  	position: 'static',
	  	left: '0',
	  	top: '0',
	  });

  },

});


$('.block').mousemove(function() {
		var Parent = $(this).attr("id");
		var arrOrd = [];
		$('#'+Parent+'> .bagel').each(function(index,element){
			var bagelid = $(this).attr("id");
			var orders = $(this).css("order");
			arrOrd[orders] = bagelid;
			$(this).draggable({disabled: true});
		});
		$('#'+ sorts(arrOrd)).draggable({disabled: false});

});



$('.bagel').mousedown(function(event) {
	window.idBagel = $(this).attr("id");
	window.idParent = $(this).parent().attr("id");
	$("#"+idBagel).css({
		position: 'relative',
		// property2: 'value2'
	});
});


$('.bagel').mouseup(function(event) {

});


// begin
var timerId; /*initializ timer*/
$('#btn_bubl').click(function(event) {

// возвращаем блоки в первый
	$('#block3 > .bagel').each(function(index,element){
		var bagelNewId = $(this).attr('id');
		$('#block1').prepend($('#block3 > #'+bagelNewId));
	});
	$('#block2 > .bagel').each(function(index,element){
		var bagelNewId = $(this).attr('id');
		$('#block1').prepend($('#block2 > #'+bagelNewId));
	});

	var countBagel = $('#number').val();
	var pow = Math.pow(2,countBagel) - 1; /*мин кол-во ходов*/
	$('#pow').text('минимум ходов: '+pow);
	// var second = time;
	var minute = (pow / 60).toFixed(2);
	var hour = (minute / 60).toFixed(2);
	var day = (hour / 24).toFixed(2);
	var month = (day / 30).toFixed(2);
	var year = (day / 365).toFixed(2);
	if ((countBagel > 0) && (countBagel < 10)){
		$('#pow_stat').html('Если за 1сек делать 1ход, то вам понадобится:<br>'+pow+' сек или '+minute+' мин');
	} else if ((countBagel > 9) && (countBagel < 13)){
		$('#pow_stat').html('Если за 1сек делать 1ход, то вам понадобится:<br>'+minute+' мин или '+hour+' часов или '+day+' дней');
	} else if ((countBagel > 12) && (countBagel < 21)){
		$('#pow_stat').html('Если за 1сек делать 1ход, то вам понадобится:<br>'+hour+' часов или '+day+' дней');
	} else if ((countBagel > 20) && (countBagel < 26)){
		$('#pow_stat').html('Если за 1сек делать 1ход, то вам понадобится:<br>'+day+' дней или '+month+' мес');
	} else if ((countBagel > 25) && (countBagel < 28)){
		$('#pow_stat').html('Если за 1сек делать 1ход, то вам понадобится:<br>'+day+' дней или '+month+' мес или '+year+' лет');
	} else if (countBagel > 27){
		$('#pow_stat').html('Если за 1сек делать 1ход, то вам понадобится:<br>'+year+' лет');
	}

	var widthBagel = 30;
	var step = (90 - widthBagel) / countBagel;
	$('#block1 > .bagel').css({display: 'none'});
	window.beginArr = [];
	for (var i = 1; i <= countBagel; i++) {
		window.beginArr[i-1] = $('#bg'+i).attr("id");
		widthBagel = widthBagel + step;
		// $('#block1').prepend('<div class="bagel" id="bg'+i+'">'+i+'</div>');
		// $('#block1').prepend($('#archive > #bg'+i));

		var randCur = +randomIndexColor[i];
		// var check = $('#check').attr();
		// console.log(check);
		// if($('#check').attr('checked') == 'checked'){
		// 	console.log('check');
		// }
		// var randCur = +randomIndexColor[getRandom(1,28)];
		// while (randCur == randPre){
		// 	randCur = +randomIndexColor[getRandom(1,28)];
		// }
		$('#block1 > #bg'+i).css({
			display: 'block',
			width: widthBagel + '%',
			background: listColor[randCur]
		});
		// var randPre = randCur;
	}

	turns = 0;
	time = 0;

	var endArr = [];
	// timer
	clearInterval(timerId);  /*off timer*/
	// start timer
	timerId = setInterval(function(){
		$('#time').val(time++);
		$('#block3 > .bagel').each(function(index, el) {
			endArr[index] = $(this).attr('id');
		});
		var countBeginArr = beginArr.length;
		var countEndArr = endArr.length;
		var boleans = false;
		var counters = 0;
		if (countBeginArr == countEndArr){
			for (var i = 0; i < countBeginArr; i++) {
				if(beginArr[i] == endArr[i]){
					boleans = true;
					counters++;
				}
			}
			if (counters == countBeginArr) {
				clearInterval(timerId);
				if (turns == pow) {
					$('.wrap_prize_modal').css({display: 'block'});
					$('#rezult_hanoi').html(countBagel+' бубликов за '+ (time-1) +' сек. и ни одного лишнего хода! =)))');
				} else if(turns > pow){
					$('.wrap_prize_modal').css({display: 'block'});
					$('#rezult_hanoi').html(countBagel+' бубликов за '+ (time-1) +' сек. и '+turns+' ходов! =)');
				}
				console.log('Ураа!! Собрал башню за ' + (time-1) + ' и ' + turns + ' ходов');
			}
		}
	},1000);


});


window.randomIndexColor = [4,13,14,16,15,17,23,31,38,59,65,73,76,77,87,90,91,92,95,106,111,117,121,125,124,129,138,140,146];
window.listColor = ['AliceBlue', 'AntiqueWhite', 'Aqua', 'Aquamarine', 'Azure', 'Beige', 'Bisque', 'Black', 'BlanchedAlmond', 'Blue', 'BlueViolet', 'Brown', 'BurlyWood', 'CadetBlue', 'Chartreuse', 'Chocolate', 'Coral', 'CornflowerBlue', 'Cornsilk', 'Crimson', 'Cyan', 'DarkBlue', 'DarkCyan', 'DarkGoldenRod', 'DarkGray', 'DarkGrey', 'DarkGreen', 'DarkKhaki', 'DarkMagenta', 'DarkOliveGreen', 'Darkorange', 'DarkOrchid', 'DarkRed', 'DarkSalmon', 'DarkSeaGreen', 'DarkSlateBlue', 'DarkSlateGray', 'DarkSlateGrey', 'DarkTurquoise', 'DarkViolet', 'DeepPink', 'DeepSkyBlue', 'DimGray', 'DimGrey', 'DodgerBlue', 'FireBrick', 'FloralWhite', 'ForestGreen', 'Fuchsia', 'Gainsboro', 'GhostWhite', 'Gold', 'GoldenRod', 'Gray', 'Grey', 'Green', 'GreenYellow', 'HoneyDew', 'HotPink', 'IndianRed', 'Indigo', 'Ivory', 'Khaki', 'Lavender', 'LavenderBlush', 'LawnGreen', 'LemonChiffon', 'LightBlue', 'LightCoral', 'LightCyan', 'LightGoldenRodYellow', 'LightGray', 'LightGrey', 'LightGreen', 'LightPink', 'LightSalmon', 'LightSeaGreen', 'LightSkyBlue', 'LightSlateGray', 'LightSlateGrey', 'LightSteelBlue', 'LightYellow', 'Lime', 'LimeGreen', 'Linen', 'Magenta', 'Maroon', 'MediumAquaMarine', 'MediumBlue', 'MediumOrchid', 'MediumPurple', 'MediumSeaGreen', 'MediumSlateBlue', 'MediumSpringGreen', 'MediumTurquoise', 'MediumVioletRed', 'MidnightBlue', 'MintCream', 'MistyRose', 'Moccasin', 'NavajoWhite', 'Navy', 'OldLace', 'Olive', 'OliveDrab', 'Orange', 'OrangeRed', 'Orchid', 'PaleGoldenRod', 'PaleGreen', 'PaleTurquoise', 'PaleVioletRed', 'PapayaWhip', 'PeachPuff', 'Peru', 'Pink', 'Plum', 'PowderBlue', 'Purple', 'Red', 'RosyBrown', 'RoyalBlue', 'SaddleBrown', 'Salmon', 'SandyBrown', 'SeaGreen', 'SeaShell', 'Sienna', 'Silver', 'SkyBlue', 'SlateBlue', 'SlateGray', 'SlateGrey', 'Snow', 'SpringGreen', 'SteelBlue', 'Tan', 'Teal', 'Thistle', 'Tomato', 'Turquoise', 'Violet', 'Wheat', 'White', 'WhiteSmoke', 'Yellow', 'YellowGreen'];

// рандом =)
	function getRandom(min,max){
		return Math.floor((Math.random() * (max - min + 1) + min));
	}



// other
$('#close').click(function(event) {
	$('.wrap_prize_modal').css({display: 'none'});
});

});
