let footer = `<footer>
        <div class="row flex jcsb aic">

            <div>
                <p style="font-size: 12px;">В системе зарегистрировано 100500 пользователей</p>
                <p style="font-size: 12px;">Заработано web-мастерами 100500 <i class="fa fa-rub" aria-hidden="true"></i></p>
            </div>

            <div>
                <a href="#" title=""><img src="img/yd_88x31.png" alt="Яндекс Деньги"></a>
                <a href="#"><img src="img/payeer.png"></a>
                <a href="#"><img src="img/88x31_wm.png"></a>
            </div>

            <div style="font-size: 10px;">Сайт разработан  </div>
        </div>
    </footer>

    <div>
        <a href="javascript:void(0);" class="bgpopup" id="form_aut"></a>
        <div class="popup forms">
            <a href="javascript:void(0);" class="close"><i class="fa fa-times"
                    aria-hidden="true"></i></a>
            <h3 class="head">Войти</h3>
            <form action="">
                <p class="relatives">
                    <input type="text" placeholder="Логин" name="login">
                    <span class="message_modal mpos_login"></span>
                </p>
                <p class="relatives">
                    <input type="password" placeholder="Пароль" name="password">
                    <span class="message_modal mpos_pass"></span>
                </p>
                <a href="javascript:void(0);" class="link_2"
                    onclick="$(this).parent().parent().removeClass('active').prev().removeClass('active');popup_open('form_recovery');">Забыли
                    пароль?</a>
                <a href='' class="btn btn_green">Войти</a>
            </form>
        </div>
    </div>

    <div>
        <a href="javascript:void(0);" class="bgpopup" id="form_recovery"></a>
        <div class="popup forms">
            <a href="javascript:void(0);" class="close"><i class="fa fa-times"
                    aria-hidden="true"></i></a>
            <h3 class="head">Восстановление пароля</h3>
            <form action="">
                <p class="relatives">
                    <input type="email" placeholder="Email" name="email">
                    <span class="message_modal mpos_mail"></span>
                </p>
                <a href='' class="btn btn_green">Восстановить</a>
                <a href="javascript:void(0);" class="link_2"
                    onclick="$(this).parent().parent().removeClass('active').prev().removeClass('active');popup_open('form_aut');">Назад</a>
            </form>
        </div>
    </div>

    <div>
        <a href="javascript:void(0);" class="bgpopup" id="form_registr"></a>
        <div class="popup forms">
            <a href="javascript:void(0);" class="close"><i class="fa fa-times"
                    aria-hidden="true"></i></a>
            <h3 class="head">Регистрация</h3>
            <form action="">
                <p class="relatives">
                    <input type="email" placeholder="Email" name="email">
                    <span class="message_modal mpos_mail"></span>
                </p>
                <p class="relatives">
                    <input type="text" placeholder="Логин" name="login">
                    <span class="message_modal mpos_login"></span>
                </p>
                <p class="relatives">
                    <input type="password" placeholder="Пароль" name="password">
                    <span class="message_modal mpos_pass"></span>
                </p>
                <p class="relatives">
                    <input type="password" placeholder="Повторить пароль" name="password2">
                    <span class="message_modal mpos_pass2"></span>
                </p>
                <input type="checkbox" class="checkbox" id="p_sogl" name="rules">
                <label for="p_sogl" class="p_sogl">
                    <p>Прочитал(а) принимаю условия</p>
                    <a href="rules.html"  class="a_termsuse">пользовательского
                        соглашения</a>
                </label>
                <a href='' class="btn btn_green">Регистрация</a>
            </form>
        </div>
    </div>

    <div>
        <a href="javascript:void(0);" class="bgpopup" id="formMsgSystem"></a>
        <div class="popup forms">
            <a href="javascript:void(0);" class="close"><i class="fa fa-times"
                    aria-hidden="true"></i></a>
            <h3 class="head">Системное сообщение</h3>
            <p class="text">0137</p>
        </div>
    </div>

    `

document.querySelector("body").insertAdjacentHTML("beforeend", footer)
