let my_photos = ''
for (let i = 1; i <= 8; i++) {
	my_photos += `<div data-swb="1"><img src="/img/ava/img${i}.jpg"></div>`
}
// document.querySelector(".wr_swb").innerHTML = my_photos
// document.querySelector(".slider").setAttribute('style', 'display: block;')


const wr_list = document.querySelector(".wr_items")
let my_arr = [
  {
    name: "cpa-rating.ru",
    stack: ["HTML", "CSS", "JQuery", "Adaptive &#10004;"]
  },
  {
    name: "hanoi",
    stack: [
      "HTML",
      "CSS",
      "JQuery",
      "Adaptive &#10004;",
      "Таблица (PHP, SQL, AJAX)"
    ]
  },
  { name: "guess", stack: ["HTML", "CSS", "JQuery"] },
  { name: "3D_hut", stack: ["HTML", "CSS(3D, gradient)", "JQuery"] },
  { name: "ad-core.ru", stack: ["HTML", "CSS", "JQuery"] },
  { name: "ad-slot", stack: ["HTML", "CSS", "JQuery"] },
  { name: "mogo", stack: ["HTML", "CSS", "JQuery"] },
  { name: "folio", stack: ["HTML", "CSS", "JQuery"] },
  { name: "gridzilla", stack: ["HTML", "CSS", "JQuery", "Adaptive &#10004;"] }
]
let cards = ""
for (let i = 0; i < my_arr.length; i++) {
  cards += `
		<div class="xs_100 sm_50 xl_33">
		<div class="item">
		<img src="img/${my_arr[i].name}.jpg">
		<div class="myworks">
		<p class="name">${my_arr[i].name}</p>
		`
  for (let j = 0; j < my_arr[i].stack.length; j++) {
    cards += `<p>${my_arr[i].stack[j]}</p>`
  }
  cards += `
	<a href="/list/${my_arr[i].name}" class="show_md hide_xl btn" target="_blank">Перейти</a></div>
  <a href="/list/${my_arr[i].name}" class="hide_md a_lg" target="_blank"></a></div></div>`
}

wr_list.innerHTML = cards

$(document).ready(function () {
  $("body").on("click", ".switch", function (e) {
    var i = +$(this).index()
    var id = $(this).attr("data-sw")
    $(this)
      .parent()
      .find("[data-sw=" + id + "]")
      .removeClass("active")
    $(this).addClass("active")
    $("[data-swb=" + id + "]").hide()
    $("[data-swb=" + id + "]:eq(" + i + ")").show()
  })

  $("body").on("click", ".arrow", function (e) {
    if ($(this).hasClass("next")) $(".switch.active").next().click()
    else $(".switch.active").prev().click()
  })

  var $draggable = $(".dsa").draggabilly({
    // options...
  })

  //  $('.dsa').draggable({});

  // $('.dsa').mousedown(function(event) {
  // 	$('.dsa').css({transition: 'none'});
  // });

  // $('.dsa').mouseup(function(event) {
  // 	$('.dsa').css({transition: 'all 0.7s'});
  // });

  // bxslider
  // $(document).ready(function(){
  // $('.bxslider').bxSlider({
  // mode: 'fade',
  // });
  // });
})
