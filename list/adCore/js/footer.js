let footer = `<footer>
        <div class="hr"></div>
        <div class="row flex jcsb aic menu_foot">
            <a href="settings.html" class="btn_foot"><i class="fa fa-cogs"></i></a>
            <a href="index.html" class="btn_foot"><i class="fa fa-audio-description"></i></a>
            <a href="cabinet.html" class="btn_foot"><i class="fa fa-desktop"></i></a>
            <a href="news.html" class="btn_foot btn_news1 add_news"><i
                    class="fa fa-newspaper-o"></i></a>
        </div>
    </footer>


    <div>
        <a href="javascript:void(0);" class="bgpopup" id="formMsgSystem"></a>
        <div class="popup forms forms2">
            <a href="javascript:void(0);" class="close"><i class="fa fa-times"
                    aria-hidden="true"></i></a>
            <h3 class="head">Системное сообщение</h3>
            <p class="tac text">Lorem ipsum dolor sit amet,</p>
        </div>
    </div>
    `

document.querySelector("body").insertAdjacentHTML("beforeend", footer)
