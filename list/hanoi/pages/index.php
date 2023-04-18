<?php

	$model = new ModelResults();
	$uniqueCountBagel = $model->getUniqueCountBagel();
	$getUniqueUser = $model->getUniqueUser();
	$uc = isset($_COOKIE["user_name"]) ? $_COOKIE["user_name"] : '';

?>
<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<title>Ханойская башня</title>
	<link rel="shortcut icon" type="image/x-icon" href="favicon.ico">
	<link rel="stylesheet" href="css/style.css?v23">
</head>
<body>

	<header>
		<div class="row">
			<h1>Ханойская башня</h1>

			<p class="descript active one">
				<span class="text">Правила: Вам необходимо переложить бублики с первого стержня на третий, используя второй как вспомогательный и бОльший нельзя класть =) на мЕньший. Укажи количество -> "СТАРТ" -> и в бой! =)</span>
				<span class="icon" ></span>
			</p>

			<div class="info flex aifs fww">
				<input type="number" value="5" min="3" max="150" id="number" autocomplete="off">
				<a href="javascript:void(0);" class="btn start">СТАРТ</a>
				<p>
					<span class="db wsnw">
						<span>Время: </span>
						<span class="now text_st"></span>
					</span>
					<span class="db wsnw">
						<span>Ход: </span>
						<span class="turns text_st"></span>
					</span>
				</p>
				<p class="descript active">
					<span class="text">
						<span class="db" id="power"></span>
						<span class="db" id="time"></span>
					</span>
					<!-- <span class="icon " ></span> -->
				</p>
			</div>

		</div>
	</header>

	<div class="wr_rods">
		<div class="row flex jcsb ais" >
			<div class="rod rod_1 flex fdc aic jcfe"></div>
			<div class="rod rod_2 flex fdc aic jcfe"></div>
			<div class="rod rod_3 flex fdc aic jcfe"></div>
		</div>
	</div>

		<div class="wr_table row">

<?php
if(GetUserIp() == '145.255.22.236'){
	// echo 2 ** 5 - 1;
}
 ?>
			<h2>Таблица рейтинга</h2>
			<div class="flex aic wr_filter fww">
				<div class="flex aic">
					<label for="bagel" class="bagel_c">Бубликов: </label>
					<select name="" id="bagel" class="select">
						<?php foreach ($uniqueCountBagel as $val) {
							// $selected = $val['bagel']==3 ? 'selected': '';

							?>
							<option <?//= $selected; ?> value="<?= $val['bagel']; ?>"><?= $val['bagel']; ?></option>
						<?php } ?>
						<option value="all" selected="selected">Все</option>
					</select>
				</div>

				<div class="flex aic">
				<label for="user" class="name_c">Игрок: </label>
				<select name="" id="user" class="select">
					<?php foreach ($getUniqueUser as $val) {  ?>
						<option value="<?= $val['user']; ?>"><?= $val['user']; ?></option>
					<?php } ?>
					<option value="all" selected="selected">Все</option>
				</select>
				</div>
		</div>

	<div class="table th flex aic jcsb tac fww">
		<div class="numb" data-order="id">
			<span>№</span>
		</div>
		<div class="name_c order" data-order="user">
			<span>Имя</span>
		</div>
		<div class="time_c order order-asc" data-order="time" data-order_n="asc">
			<span>Время</span>
		</div>
		<div class="bagel_c order" data-order="bagel">
			<span>Бубликов</span>
		</div>
		<div class="turns_c order " data-order="turns">
			<span>Ходов</span>
		</div>
		<div class="date_c order" data-order="date">
			<span>Дата</span>
		</div>
	</div>

	<div class="wr_row_tbl"></div>


	</div>


	<div>
		<a href="javascript:void(0);" class="bgpopup " id="gameOver" onclick="popup_close('gameOver');"></a>
		<div class="popup ">
			<a href="javascript:void(0);" class="close" onclick="popup_close('gameOver');">&times;</a>

			<p class="heads">Game over!</p>
				<p>
					<span>Время: </span>
					<span class="now text_st"></span>
				</p>
				<p>
					<span>Кол-во ходов: </span>
					<span class="turns text_st"></span>
				</p>
				<p>
					<span>Бубликов: </span>
					<span class="countBagel text_st"></span>
				</p>


			<form class="saveResult">
				<div class="flex jcfs aic">
					<input type="text" placeholder="Ваше имя" name="user_name" value="<?= $uc; ?>" autocomplete="off">
					<input type="hidden" class="now1" name="now">
					<input type="hidden" class="turns1" name="turns">
					<!-- <input type="hidden" class="countBagel1" name="count_bagel"> -->
					<a href="javascript:void(0);" class="btn" onclick="saveResult('.saveResult');">Сохранить</a>
				</div>
			</form>

		</div>
	</div>



	<div>
		<a href="javascript:void(0);" class="bgpopup" id="formMsgSystem" onclick="popup_close('formMsgSystem');"></a>
		<div class="popup">
			<a href="javascript:void(0);" class="close" onclick="popup_close('formMsgSystem');">&times;</a>
			<p class="heads">Системное сообщение</p>
			<div class="text"></div>
		</div>
	</div>

	<script src="/js/jquery-2.2.1.min.js"></script>
	<script src="/js/draggabilly.pkgd.min.js"></script>
	<script src="js/core.js?10"></script>
	<script src="js/script.js?27"></script>

</body>
</html>