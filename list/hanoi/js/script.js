var countBagel = 5,
    widthBagel = 30,
    widthBagelMax = 90,
    turns = 0, //кол-во ходов
    power, //мин кол-во ходов
    timer,
    timeStart,
    stepTimer = 10, // время setTimeout
    stepInSecond = 1000/stepTimer, // GetUnixTime
    currentTime,
    listColorAll = ['AliceBlue', 'AntiqueWhite', 'Aqua', 'Aquamarine', 'Azure', 'Beige', 'Bisque', 'Black', 'BlanchedAlmond', 'Blue', 'BlueViolet', 'Brown', 'BurlyWood', 'CadetBlue', 'Chartreuse', 'Chocolate', 'Coral', 'CornflowerBlue', 'Cornsilk', 'Crimson', 'Cyan', 'DarkBlue', 'DarkCyan', 'DarkGoldenRod', 'DarkGray', 'DarkGrey', 'DarkGreen', 'DarkKhaki', 'DarkMagenta', 'DarkOliveGreen', 'Darkorange', 'DarkOrchid', 'DarkRed', 'DarkSalmon', 'DarkSeaGreen', 'DarkSlateBlue', 'DarkSlateGray', 'DarkSlateGrey', 'DarkTurquoise', 'DarkViolet', 'DeepPink', 'DeepSkyBlue', 'DimGray', 'DimGrey', 'DodgerBlue', 'FireBrick', 'FloralWhite', 'ForestGreen', 'Fuchsia', 'Gainsboro', 'GhostWhite', 'Gold', 'GoldenRod', 'Gray', 'Grey', 'Green', 'GreenYellow', 'HoneyDew', 'HotPink', 'IndianRed', 'Indigo', 'Ivory', 'Khaki', 'Lavender', 'LavenderBlush', 'LawnGreen', 'LemonChiffon', 'LightBlue', 'LightCoral', 'LightCyan', 'LightGoldenRodYellow', 'LightGray', 'LightGrey', 'LightGreen', 'LightPink', 'LightSalmon', 'LightSeaGreen', 'LightSkyBlue', 'LightSlateGray', 'LightSlateGrey', 'LightSteelBlue', 'LightYellow', 'Lime', 'LimeGreen', 'Linen', 'Magenta', 'Maroon', 'MediumAquaMarine', 'MediumBlue', 'MediumOrchid', 'MediumPurple', 'MediumSeaGreen', 'MediumSlateBlue', 'MediumSpringGreen', 'MediumTurquoise', 'MediumVioletRed', 'MidnightBlue', 'MintCream', 'MistyRose', 'Moccasin', 'NavajoWhite', 'Navy', 'OldLace', 'Olive', 'OliveDrab', 'Orange', 'OrangeRed', 'Orchid', 'PaleGoldenRod', 'PaleGreen', 'PaleTurquoise', 'PaleVioletRed', 'PapayaWhip', 'PeachPuff', 'Peru', 'Pink', 'Plum', 'PowderBlue', 'Purple', 'Red', 'RosyBrown', 'RoyalBlue', 'SaddleBrown', 'Salmon', 'SandyBrown', 'SeaGreen', 'SeaShell', 'Sienna', 'Silver', 'SkyBlue', 'SlateBlue', 'SlateGray', 'SlateGrey', 'Snow', 'SpringGreen', 'SteelBlue', 'Tan', 'Teal', 'Thistle', 'Tomato', 'Turquoise', 'Violet', 'Wheat', 'White', 'WhiteSmoke', 'Yellow', 'YellowGreen'],
    listColor = ['YellowGreen', 'Turquoise', 'Thistle', 'SkyBlue', 'SandyBrown', 'SeaGreen', 'RoyalBlue', 'PowderBlue', 'PaleVioletRed', 'OrangeRed', 'MediumVioletRed', 'MediumSlateBlue', 'MediumSeaGreen', 'MediumPurple', 'MediumAquaMarine', 'LightSkyBlue', 'LightSeaGreen', 'LightGreen', 'LawnGreen', 'IndianRed', 'DarkTurquoise', 'DarkOrchid', 'DarkGoldenRod', 'CornflowerBlue', 'Chocolate', 'Coral', 'Chartreuse', 'CadetBlue'];

var bodyWidth = $('body').outerWidth();
if(bodyWidth < 540){
    widthBagel = 45;
    widthBagelMax = 98;
}

// перемешивание массива рандомно
function shuffle(array)
{
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}


// массив цветов по кол-ву бубликов
function getColor()
{
    let list = [];
    // просто через присваивание  shuffle(list) перемешивает и сам listColor O_o
    for (let key in listColor) {list[key] = listColor[key];}
    // перемешиваем массив
    shuffle(list);
    if(countBagel < listColor.length){
        // обрезаем массив по количеству бубликов
        list.splice(countBagel);
    }
    else
    {
        // от конца массива до кол-ва бубликов
        for(let i = listColor.length, j = 0; i < countBagel; j+=1, i++){
            // если конец массива, то перебираем цвета сначала массива
            j = j == listColor.length-1 ? 0 : j;
            list[i] = listColor[j];
        }
    }
    return list;
}

// html для заполнения бубликов
function getHtmlItem(widthBagel, bg, i)
{
    let id = i + 1;
    let str = '<div class="bagel" style="width: '+widthBagel+'%; background: '+bg+'; ">'+id+'</div>';
    return str;
}


// function getRandom(min,max){
//     return Math.floor((Math.random() * (max - min + 1) + min));
// }

// если объект находится над стержнем
function overRod(pageX, pageY, elem)
{
    let elemY1 = $(elem).offset().top;
    let elemY2 = elemY1 + $(elem).outerHeight();
    let elemX1 = $(elem).offset().left;
    let elemX2 = elemX1 + $(elem).outerWidth();

    if(pageX >= elemX1 && pageX <= elemX2 && pageY >= elemY1 && pageY <= elemY2)
        return true;
    else
        return false;
}

// функция для тени стержням и перемещения бубликов
function _event(_event, _thisBagel, _pageX, _pageY)
{
    // индекс родительского стежня
    let indexParent = 1 + _thisBagel.closest('.rod').index();
    // если бублик не самый маленьки на стержне  продолжаем
    let notDragBagel = _thisBagel.hasClass('stop');
    if(!notDragBagel)
    {
        let thisId = +_thisBagel.text();
        // по трем стержням
        for (var i = 1; i <= 3; i++) {
            // находится ли бублик над стрежнем
            if(overRod(_pageX, _pageY, '.rod_'+i)){
                let firstId = $('.rod_'+i+' .bagel:first-child').text();
                // можно ли this бублик опустить на этот стержень
                if(thisId <= firstId || firstId == ''){
                    // событие при отпускании бублика: перемещаем бублик
                    if(_event == 'dragEnd' && indexParent != i){
                        _thisBagel.prependTo('.rod_'+i);
                        $('.turns').text(++turns);
                        $('.turns1').val(turns);
                        checkGameOver();
                        break;
                    }
                   // если событие move продолжаем добавлять или удалять классы стержням
                    if(_event == 'dragMove')
                        $('.rod_'+i).addClass('active_green');
                }
                else
                    $('.rod_'+i).addClass('active_red');
            }
            else
                $('.rod_'+i).removeClass('active_red active_green');
        }
    }
}

function startDragAndDrop()
{

// инициализируем бублики
    var drag = $('.bagel').draggabilly({
        // устанавливаем граници для перетаскиваний
         containment: '.wr_rods'
    });

// событие при касании бублика
     drag.on( 'dragStart', function( event, pointer ) {
        let thisBagel = $(this);
        let thisId = +thisBagel.text();
        let firstId = thisBagel.closest('.rod').find('.bagel:first-child').text();
        if(thisId > firstId)
        // добавляем класс stop если не самый маленький бублик на стержне
            thisBagel.addClass('stop');
     });

// событие при движении
     drag.on( 'dragMove', function( event, pointer, moveVector ) {

        let thisBagel = $(this);

// функция для добавления классов стержням над которыми движется бублик
        _event('dragMove', thisBagel, pointer.pageX, pointer.pageY);

     });

// если отпускаем бублик
     drag.on( 'dragEnd', function( event, pointer ) {
        // обнуляем координаты
        $(this).css({'top' : '0', 'left' : '0' });

        let thisBagel = $(this);
        // функция перемещяет бублик на другой стержень при выполнении условий
        _event('dragEnd', thisBagel, pointer.pageX, pointer.pageY);


// очищаем временные классы
        $('.rod').removeClass('active_red active_green');
        $('.bagel').removeClass('stop');



    });
}


function getTime(power)
{
    let str = ' (1ход/сек)';
    let minute = 60;
    let hour = minute*60;
    let day = hour*24;
    let month = day*30;
    let year = day*365;

    if(power <= minute*2) return power+' сек'+str;
    if(power < hour*2) return '~'+Math.round(power/minute)+' мин'+str;
    if(power < day*1.5) return '~'+Math.round(power/hour)+' час.'+str;
    if(power < month*2) return '~'+Math.round(power/day)+' дн.'+str;
    if(power < year*1.6) return '~'+Math.round(power/month)+' мес'+str;
    if(power < year*4.5) return '~'+Math.round(power/year)+' года'+str;
    if(power > year*5) return '~'+Math.round(power/year)+' лет'+str;
}


function GetUnixTime()
{
    return Math.round(+new Date() / stepTimer);
}


function timerOn()
{
    currentTime = GetUnixTime() - timeStart;

    $('.now').text((currentTime/stepInSecond).toFixed(2));
    timer = setTimeout(function() {timerOn()}, stepTimer);
}

function timerOff()
{
    // секунды в форму
    $('.now1').val(currentTime);
    clearTimeout(timer);
}

function checkGameOver()
{
    let countBagel_3 = $('.rod_3').children('.bagel').length;
    if(countBagel == countBagel_3 && turns >= power && currentTime >= (power/2))
    {
        timerOff();
        popup_open('gameOver');
    }
}

function popup_open(set_popup)
{
    $('#' + set_popup).addClass('active').next().addClass('active');
};

function popup_close(set_popup)
{
    $('#' + set_popup).removeClass('active').next().removeClass('active');
}


$(document).ready(function() {


	   $('body').on('click', ".icon", function(e)
    	{
            $(this).closest('.descript').toggleClass('active');
    	});


 	   $('body').on('click', ".start", function(e)
     	{
            // очищаем бублики
            $('.rod .bagel').remove();
            // обнуляем кол-во ходов
            turns = 0;

// скрываем описание
            // $('.one .icon').click();

     		countBagel = $('#number').val();
            $('.countBagel').text(countBagel);
            // получаем массив цветов по количеству бубликов
            var bgColors = getColor();

        // формируем html bagels
            var htmlBagel = '';
            let step = (widthBagelMax-widthBagel) / countBagel;
            let sumStep = step;
            for (var i = 0; i <= bgColors.length-1; i++) {
                htmlBagel += getHtmlItem(widthBagel+sumStep, bgColors[i], i);
                sumStep += step;
            }

// вывод бубликов на 1 стержень
            $('.rod_1').prepend(htmlBagel);

// инициализируем и вешаем события на бублики, только после добавления бубликов иначе события не вешаются
            startDragAndDrop();

            power = Math.pow(2,countBagel) - 1; /*мин кол-во ходов  2^n-1*/
            $('#power').text('минимум ходов: '+power);
            // сколько понадобится времени...
            $('#time').text(getTime(power));

        // старт таймера
            timerOff();
            timeStart = GetUnixTime();
            timerOn();

     	});




// *******************************************
// 							TABLE RATING
// *******************************************

// фильтр по пользователям и кол-ву бубликов
       $('.select').change(function(event) {
           let where_col = $(this).attr('id');
           let where_val = $(this).val();


           if(where_col == 'bagel'){
               var ord_bag = where_val;
               var ord_us = $('#user').val();
           }
           else if(where_col == 'user'){
               var ord_us = where_val;
               var ord_bag = $('#bagel').val();
           }

           sendChange('time', 'asc', ord_bag, ord_us);
       });

// вывод таблицы при заргрузке стр
       getTable('time', 'asc', 'bagel', 'all');

// сортировака по столбцам таблицы
    $('body').on('click', ".order", function(e)
    {
        let order = $(this).attr('data-order');
        // let where_val = $(this).val();
        let order_n = $(this).attr('data-order_n');
        let ord_bag = $('#bagel').val();
        let ord_us = $('#user').val();

        // let order_n1 = order_n == undefined ? 'asc' : order_n;
        if(order_n == undefined){
            var order_n1 = 'asc';
        }
        else if(order_n == 'asc'){
            var order_n1 = 'desc';
        }
        else if(order_n == 'desc'){
            var order_n1 = 'asc';
        }

        sendChange(order, order_n1, ord_bag, ord_us);
    });


});

// добавляем треугольник для имени стобца сортировки
function changeOrder(order, order_n)
{
    $('.order').removeAttr('data-order_n').removeClass('order-asc order-desc');
    $('[data-order="'+order+'"]').attr('data-order_n', order_n).addClass('order-'+order_n);

}

// изменения в соответствии с фильтром
function sendChange(order, order_n, ord_bag, ord_us)
{
    // console.log(order, order_n, ord_bag, ord_us);

    if(ord_bag == 'all' && ord_us == 'all'){
        return getTable(order, order_n, where_col='bagel', 'all');
    }
    if(ord_bag == 'all' && ord_us != 'all'){
        return getTable(order, order_n, where_col='user', where_val=ord_us);
    }
    if(ord_bag != 'all' && ord_us == 'all'){
        return getTable(order, order_n, where_col='bagel', where_val=ord_bag);
    }
    if(ord_bag != 'all' && ord_us != 'all'){
        return getTable(order, order_n, 'bagel', ord_bag, 'user', ord_us);
    }
}

// отправка данных на сервер
function getTable(
  order = "time",
  order_n = "ASC",
  where_col = "bagel",
  where_val = "all",
  where_col2 = "",
  where_val2 = ""
) {
  // console.log(order, order_n, where_col, where_val);
  // call_ajax({"module":"ModelResults", "action":"table", "order":order, "order_n":order_n, "where_col":where_col, "where_val":where_val, "where_col2":where_col2, "where_val2":where_val2 });
}

// вывод таблицы(данные с сервера)
function tableOut(data) {
  let not_data = '<div class="table tac">Нет данных</div>'
  let html = data.html == null ? not_data : data.html
  $(".wr_row_tbl .table").remove()
  $(".wr_row_tbl").prepend(html)
  // console.log('html');
  if (data.html != null) changeOrder(data.order, data.order_n)
}

// сохранение результата
function saveResult(class_name) {
  let form = $(class_name)
  let user_name = form.find('[name="user_name"]').val()
  let now = form.find('[name="now"]').val()
  let turns = form.find('[name="turns"]').val()

  // console.log(user_name, now, turns, countBagel);

  return popup_open("formMsgSystem")

  call_ajax({
    module: "ModelResults",
    action: "saveResult",
    user_name: user_name,
    now: now,
    turns: turns,
    count_bagel: countBagel
  })
}

// добавляем в выпадающий список, если нет в списке
function updateSelect(bagel, user)
{
    let us = $('#user').find('[value="'+user+'"]').val();
    if(us == undefined)
        $('#user').prepend('<option value="'+user+'">'+user+'</option>');

    let bags = $('#bagel').find('[value="'+bagel+'"]').val();

    if(bags == undefined){
        let count_b = $('#bagel').children('option').length-1;
        let bags_html = '<option value="'+bagel+'">'+bagel+'</option>';
        if(count_b < 1)
            $('#bagel').prepend(bags_html);
        else{
            $('#bagel option').each(function(i,elem){
                if($(this).val() == 'all'){
                    $(this).before(bags_html); return false;
                }
                else if(i == 0 && bagel < $(this).val()){
                            $(this).before(bags_html); return false;
                        }
                else if(bagel > $(this).val() && bagel < $(this).next().val()){
                            $(this).after(bags_html); return false;
                        }
            });
        }
    }

}