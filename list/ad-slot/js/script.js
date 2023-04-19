var pgurl = window.location.href.substr(
  window.location.href.lastIndexOf("/") + 1
)
console.log(pgurl)
if (pgurl == "") {
  location.href = "add-banner-pos.html"
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

function init_menu() {
  var data = parse_url()
  var page = data["page"]
  $(".menu a").removeClass("active")
  $(".menu_ac a").removeClass("active")
  $(".submenu_right a").removeClass("active")
  $(".menu")
    .find("[href='" + pgurl + "']")
    .addClass("active")
  $(".menu_ac")
    .find("[href='" + pgurl + "']")
    .addClass("active")
  $(".submenu_right")
    .find("[href='" + pgurl + "']")
    .addClass("active")

  if (page == "adv-banners") {
    $(".submenu_right").find("[href='/adv-links']").addClass("active")
  }
  if (page == "web-banners") {
    $(".submenu_right").find("[href='/web-links']").addClass("active")
  }
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

function logout() {
  call_ajax({ module: "ModelUser", action: "logout" })
}

function call_del_link(data) {
  popup_close("delete_window")
  $(".bl-" + data.id).hide()
}

$(document).ready(function () {
  init_menu()

  $(".switch").click(function (event) {
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

  $(".popup .close").click(function (event) {
    $(this).parent().removeClass("active").prev().removeClass("active")
  })

  $(".bgpopup").click(function (event) {
    $(this).removeClass("active").next().removeClass("active")
  })

  // $("select").chosen();
  $("select").chosen({
    placeholder_text_single: "Выберите опцию",
    width: "100%"
  })

  $(".btn_sh").click(function (event) {
    $(".btn_sh").toggleClass("active")
    $(".select_b_z").slideToggle("slow")
    $(".for_code_b").slideUp("slow")

    $(".setting_ban").slideUp("slow")
    $(".bg_wrap_b").slideUp("slow")
    $("#size_banner1").removeClass("plus555")

    if ($(this).hasClass("pls")) {
      if ($("#sel_bz1").prop("checked")) $("#construct_btn").click()
      if ($("#sel_bz2").prop("checked")) $("#code_btn").click()
      $(".bg_wrap_b").slideDown("slow")
      if ($("[name=num_settings]:checked").val() == undefined)
        $(".dummy_block").hide()
      if ($("[name=num_settings]:checked").val() == "2") {
        $(".head_dd").html($("[name=settings2]").val())
      }
    }
  })

  $("#construct_btn").click(function (event) {
    $(".setting_ban").slideDown("slow")
    $(".bg_wrap_b").slideDown("slow")
    $("#size_banner1").addClass("plus555")
    $(".for_code_b").slideUp("slow")
    $(".dummy_block").removeClass("code_bl")
    $(".head_dd").hide()
    $(".head_d").show()
    $(".dummy_block").show()
  })

  $("#code_btn").click(function (event) {
    $(".setting_ban").slideUp("slow")
    $(".bg_wrap_b").slideDown("slow")
    $("#size_banner1").removeClass("plus555")
    $(".for_code_b").slideDown("slow")
    $(".dummy_block").addClass("code_bl")
    $(".head_d").hide()
    $(".head_dd").show().html($("[name=settings2]").val())
    $(".dummy_block").show()
  })

  $("#size_banner1").change(function (event) {
    var size_banner1 = $(this).val()
    var array_size1 = size_banner1.split("x")
    var height_banner1 = array_size1[1]
    var head_p_size1 = $("#size_banner1 option:selected").attr("data-size")

    $("#head_p_size1").val(head_p_size1)

    if (height_banner1 > 90) {
      if ($(this).hasClass("plus555")) {
        if (!$(".bg_wrap_b").hasClass("for_right")) {
          $(".bg_wrap_b").slideUp(400)
          setTimeout(function () {
            $(".bg_wrap_b").addClass("for_right")
          }, 500)
          setTimeout(function () {
            $(".bg_wrap_b").slideDown("slow")
          }, 700)
        } else {
          $(".bg_wrap_b").addClass("for_right")
        }
      } else {
        $(".bg_wrap_b").addClass("for_right")
      }
    } else if (height_banner1 <= 90) {
      if ($(this).hasClass("plus555")) {
        if ($(".bg_wrap_b").hasClass("for_right")) {
          $(".bg_wrap_b").slideUp(400)
          setTimeout(function () {
            $(".bg_wrap_b").removeClass("for_right")
          }, 500)
          setTimeout(function () {
            $(".bg_wrap_b").slideDown("slow")
          }, 700)
        } else {
          $(".bg_wrap_b").removeClass("for_right")
        }
      } else {
        $(".bg_wrap_b").removeClass("for_right")
      }
    }
  })

  $(".change_event").change(function (event) {
    var size_banner1 = $("#size_banner1").val()
    var array_size1 = size_banner1.split("x")
    var height_banner1 = array_size1[1]
    var width_banner1 = array_size1[0]
    var bg_color1 = $("#bg_color1").val()
    var border_color1 = $("#border_color1").val()
    var border_size1 = $("#border_size1").val()
    var head_p_color1 = $("#head_p_color1").val()
    var head_p_text = $("#head_p_text").val()
    var head_p_size1 = $("#head_p_size1").val()
    var background_image1 = $("#background_image1").val()
    var bg_site1 = $("#bg_site1").prop("checked")

    if (bg_site1) {
      $(".bg_wrap_b").css({
        "background-color": "rgba(0,0,0,0.85)"
      })
    } else {
      $(".bg_wrap_b").css({
        "background-color": "rgba(255,255,255,0.85)"
      })
    }

    $(".dummy_block .size_bl").text(size_banner1)
    $(".dummy_block .head_d")
      .text(head_p_text)
      .css({
        color: head_p_color1,

        "font-size": head_p_size1 + "px"
      })

    if (background_image1 == 0) {
      $(".dummy_block").css({
        "background-color": bg_color1,
        "background-image": "none",
        height: height_banner1 + "px",
        width: width_banner1 + "px",
        border: border_size1 + "px solid" + border_color1
      })
    } else if (background_image1 == 1) {
      $(".dummy_block").css({
        background:
          "repeating-linear-gradient(-45deg, transparent, transparent 20px, rgba(255, 255, 255, 0.13) 20px, rgba(255, 255, 255, 0.13) 40px)",
        "background-color": bg_color1,
        height: height_banner1 + "px",
        width: width_banner1 + "px",
        border: border_size1 + "px solid" + border_color1
      })
    } else if (background_image1 == 2) {
      $(".dummy_block").css({
        background:
          "repeating-linear-gradient(45deg, transparent, transparent 20px, rgba(255, 255, 255, 0.13) 20px, rgba(255, 255, 255, 0.13) 40px)",
        "background-color": bg_color1,
        height: height_banner1 + "px",
        width: width_banner1 + "px",
        border: border_size1 + "px solid" + border_color1
      })
    } else if (background_image1 == 3) {
      $(".dummy_block").css({
        background:
          "repeating-radial-gradient(circle at center center, rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.2) 2px, transparent 2px, transparent 100%) 0% 0%",
        "background-color": bg_color1,
        "background-size": "4px 4px",
        height: height_banner1 + "px",
        width: width_banner1 + "px",
        border: border_size1 + "px solid" + border_color1
      })
    } else if (background_image1 == 4) {
      $(".dummy_block").css({
        background:
          "repeating-radial-gradient(circle at center, rgba(0,0,0,.2), rgba(0,0,0,.2) 1px, transparent 1px, transparent 100%)",
        "background-color": bg_color1,
        "background-size": "3px 3px",
        height: height_banner1 + "px",
        width: width_banner1 + "px",
        border: border_size1 + "px solid" + border_color1
      })
    }
  })

  $("#head_p_text").keyup(function (event) {
    var head_p_text = $("#head_p_text").val()
    $(".dummy_block .head_d").text(head_p_text)
  })

  $(".change_event").change()

  /*setInterval(function()
	{

	},1000);
	if ($("[name=num_settings]:checked").val()=="2")
	{

	}*/
})

$(window).load(function () {})
