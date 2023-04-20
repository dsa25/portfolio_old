var pgurl = window.location.href.substr(
  window.location.href.lastIndexOf("/") + 1
)
console.log(pgurl)

function init_menu() {
  var data = parse_url()
  var page = data["page"]
  $(".menu a").removeClass("active")
  $(".menu_acc a").removeClass("active")
  $(".menu_foot a").removeClass("active")
  $(".menu")
    .find("[href='" + pgurl + "']")
    .addClass("active")
  $(".menu_acc")
    .find("[href='" + pgurl + "']")
    .addClass("active")
  $(".menu_foot")
    .find("[href='" + pgurl + "']")
    .addClass("active")
}

function parse_url() {
  var arr = location.pathname.split("/")
  arr.splice(0, 1)
  var data = {}
  data["url"] = location.pathname
  for (var i = 0; i <= arr.length - 1; i++) {
    if (i == 0) data["page"] = arr[i]
    if (i == 1) data["action"] = arr[i]
    if (i > 1 && i % 2 != 0) {
      data[arr[i - 1]] = arr[i]
    }
    if (i > 1 && i % 2 == 0) {
      data[arr[i]] = ""
    }
  }
  return data
}

function popup_open(set_popup) {
  $("#" + set_popup)
    .addClass("active")
    .next()
    .addClass("active")
}

function popup_close(set_popup) {
  $("#" + set_popup)
    .removeClass("active")
    .next()
    .removeClass("active")
}

// function smsg_open()
// {
// 	$('.system_msg').addClass('active');
// };

// function smsg_close()
// {
// 	$('.system_msg').removeClass('active');
// };

$(document).ready(function () {
  init_menu()

  // $('.switch').click(function(event)
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

  // $('.popup .close').click(function(event)
  $("body").on("click", ".popup .close", function (e) {
    $(this).parent().removeClass("active").prev().removeClass("active")
  })

  // $('.bgpopup').click(function(event)
  $("body").on("click", ".bgpopup", function (e) {
    $(this).removeClass("active").next().removeClass("active")
  })

  // $('.slickslider').slick();

  $(".myslider").slick({
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    fade: false,
    centerPadding: "0px",
    // adaptiveHeight: true,
    infinite: false,
    speed: 100,
    asNavFor: ".myslider_nav"
  })

  $(".myslider_nav").slick({
    variableWidth: true,
    infinite: false,
    slidesToShow: 1,
    slidesToScroll: 1,
    asNavFor: ".myslider",
    arrows: false,
    dots: false,
    centerMode: true,
    centerPadding: "0px",
    accessibility: false,
    touchMove: false,
    focusOnSelect: true
  })

  $("select").chosen({
    placeholder_text_single: "Выберите опцию",
    disable_search_threshold: 10,
    width: "100%"
  })
})
