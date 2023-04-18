$(document).ready(function() {

// рандом =)
	function getRandom(min,max){
		return Math.floor((Math.random() * (max - min + 1) + min));
	}

// сгенерировать число
	$('#generate').bind('click',function(event) {
		$('p.mess').remove();
		var ot = +$('.from').val();
		var doo = +$('.before').val();
		var diapass = doo - ot;
		window.randms = getRandom(ot,doo);
		window.mins = +$('.from').val();
		window.maxs = +$('.before').val();
		$('.answer').val('');
		$('.attempt').prepend("<p class='mess'>СЧ сгенерировано!</p>");
		preVals = usVal = vals = chetck = 0;
		bools = -1;
	});

	var preVals = vals = chetck = 0;
	var bools = -1;

// клик - проверить число
	$('#prover').bind('click', function(e){
		chetck++; /* номер хода */
		var usVal = +$('.answer').val();
		$('.answer').val('');


//  Ход юзера
if (usVal == randms){
	$('.attempt').prepend("<p class='mess1 avt'>Поздравляю! Вы победили! На "+chetck+" ходу. СЧ = "+randms+"</p>");
	preVals = vals = chetck = 0;
	bools = -1;
	$('#generate').click();
	exit();
} else if (usVal < randms) {
		$('.attempt').prepend("<p class='mess avt'>Вы: СЧ больше "+usVal+"</p>");
		preVals = usVal;
		mins = usVal;
		bools = 1;
} else if (usVal > randms){
	$('.attempt').prepend("<p class='mess avt'>Вы: СЧ меньше "+usVal+"</p>");
		preVals = usVal;
		maxs = usVal;
		bools = 0;
}

// расчеты для ИИ
if(bools == 1){
	vals = preVals + Math.floor((maxs - mins) / 2);
} else if(bools == 0){
	vals = preVals - Math.floor((maxs - mins) / 2);
} else{
	vals = Math.floor((maxs - mins) / 2);
}

// ход робота ИИ
chetck++;
	if (vals == randms){
			$('.attempt').prepend("<p class='mess2 r2'>Вы проиграли!!! BB-8 выиграл! На "+chetck+" ходу. СЧ = "+randms+" </p>");
			preVals = vals = chetck = 0;
			bools = -1;
			$('#generate').click();
	} else if(vals < randms){
		setTimeout(function(){
			$('.attempt').prepend("<p class='mess r2'>BB-8: СЧ больше "+vals+"</p>");
		}, 1000);
			mins = vals;
	} else if (vals > randms){
		setTimeout(function(){
			$('.attempt').prepend("<p class='mess r2'>BB-8: СЧ меньше "+vals+"</p>");
		}, 1000);
			maxs = vals;
	}

	$('.answer').focus();

});


	// enter
	$('.answer').keydown(function(e){
		if (e.which == 13) {
			$('#prover').click();
		}
	});


});






// if ((chetck <= popitok) && (usVal == randms)){
// 	$('.attempt').prepend("<p class='mess1'>Поздравляем! Это число: "+randms+" Попыток: "+chetck+" Из "+popitok+"</p>");
// 	chetck = 0;
// 	$('#generate').click();

// } else if(chetck < popitok){
// 	if (usVal < randms) {
// 		$('.attempt').prepend("<p class='mess'>"
// 			+chetck+" Число X больше "+usVal+"</p>");
// 	} else if (usVal > randms){
// 		$('.attempt').prepend("<p class='mess'>"
// 			+chetck+" Число X меньше "+usVal+"</p>");
// 	}
// } else if (chetck >= popitok) {
// 		$('.attempt').prepend("<p class='mess2'>Попыток больше нет! Вы проиграли!!! Число: "+randms+"</p>");
// 		chetck = 0;
// 		$('#generate').click();
// }