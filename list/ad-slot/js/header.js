let header = `<header>
        <div class="row flex aic">
            <a href="/list/ad-slot" class="logo"></a>
            <div class="main_banners">
                <div class="dummy_block1" style="background: repeating-linear-gradient(-45deg, transparent, transparent 20px, rgba(255, 255, 255, 0.13) 20px, rgba(255, 255, 255, 0.13) 40px) rgb(82, 208, 73); height: 60px; width: 468px; border: 5px solid rgb(206, 44, 44); ">
                    <div class="head_dd" style="display: none;"></div>
                    <p class="head_d" style="color: rgb(255, 255, 255); font-size: 25px;">З а г л у ш к а</p>
                    <span class="size_bl">468x60</span>
                </div>
            </div>
            <a href="javascript:void(0);" class="btn btn_green" onclick="popup_open('form_aut');">Вход</a>
            <a href="javascript:void(0);" class="btn btn_red" onclick="popup_open('form_registr');">Регистрация</a>
            <a href="javascript:void(0);" class="btn btn_green" onclick="logout();">Выход</a>
        </div>
    </header>

    <div class="navigate">
        <div class="row">
            <div class="menu flex aic">
                <a href="/" class="">Главная</a>
                <a href="/news" class="">Новости <span class="green_point"></span></a>
                <a href="/rules" class="">Правила</a>
                <a href="/contact" class="">Поддержка <span class="green_point"></span></a>
                <a href="/find-links" class="color_br">Купить рекламу</a>
                <a href="#" class="color_br22">Заработок</a>

                <a href="/adm-news" class="btn_tbl" data-title="Новости"><i class="fa fa-newspaper-o" aria-hidden="true"></i></a>
                <a href="/adm-ins" class="btn_tbl" data-title="Пополнения"><i class="fa fa-money" aria-hidden="true"></i></a>
                <a href="/adm-out" class="btn_tbl" data-title="Выплаты"><i class="fa fa-rub" aria-hidden="true"></i></a>
                <a href="/adm-task" class="btn_tbl" data-title="Тикеты"><i class="fa fa-envelope" aria-hidden="true"></i> <span class="green_point"></span></a>

                <a href="/adm-users" class="btn_tbl" data-title="Юзеры"><i class="fa fa-users"aria-hidden="true"></i></a>
                <a href="/adm-stat" class="btn_tbl" data-title="Статистика"><i class="fa fa-bar-chart" aria-hidden="true"></i></a>
                <a href="/adm-recl" class="btn_tbl" data-title="Взял"><i class="fa fa-tripadvisor" aria-hidden="true"></i></a>
                <a href="/adm-dal" class="btn_tbl" data-title="Дал"><i class="fa fa-gift" aria-hidden="true"></i></a>
                <a href="/adm-log" class="btn_tbl" data-title="Логи"><i class="fa fa-file-text-o" aria-hidden="true"></i></a>
            </div>
        </div>
    </div>`

document.querySelector("body").insertAdjacentHTML("afterbegin", header)
