function submenu_m() {
  $(this).parent().toggleClass("active")
  $(this).next().slideToggle("slow")
}

function init_menu() {
  var data = parse_url()
  var page = data["page"]
  $(".menu a").removeClass("active")
  $(".menu_m a").removeClass("active")
  $(".menu")
    .find("[href='/" + page + "']")
    .addClass("active")
  $(".menu_m")
    .find("[href='/" + page + "']")
    .addClass("active")
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

var buy_ids = ""
$(document).ready(function () {
  // init_menu();

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

  $("body").on("click", ".popup .close", function (e) {
    $(this).parent().removeClass("active").prev().removeClass("active")
  })

  $("body").on("click", ".bgpopup", function (e) {
    $(this).removeClass("active").next().removeClass("active")
  })

  // searsh show
  $("body").on("click", ".wr_searsh .click", function (e) {
    $(".logo").addClass("logo_m")
    $(".wr_searsh").addClass("active")
    $(".wr_searsh .search_i").removeClass("click")
  })
  $("body").on("click", ".wr_searsh .close_s", function (e) {
    $(".logo").removeClass("logo_m")
    $(".wr_searsh").removeClass("active")
    $(".wr_searsh .search_i").addClass("click")
  })
})
