<?php

class ModelResults extends ModuleBase
{

	public function __construct($uid = False)
	{
		parent::__construct();
		$this->actions = array("saveResult", "getUniqueCountBagel", "getUniqueUser", "table");
	}

	public function rules()
	{
		$this->rules["*"] = "allow";
	}

	public function insert_into($user_name, $count_bagel, $now, $turns, $cheater, $msg)
	{
		$db = $this->db;

		$db->query("INSERT INTO `hanoi`
			(`user`, `bagel`, `time`, `turns`, `date`, `ip`, `cheater`)
			VALUES
			(?s, ?i, ?i, ?i, NOW(), ?s, ?i)",
			$user_name, $count_bagel, $now, $turns, GetUserIp(), $cheater);

			$lid = $db->LastInsert();
			if($lid > 0){
				setcookie("user_name", $user_name, time()+(60*60*24*250), "/list/hanoi/", "works.teammap.ru");
				// сохраняем + обновляем таблицу по бубликам и времени для отображения нового результата...
				if($cheater == 0)
					return array("status" => 0, "msg" => $msg, "js"=> "$('#gameOver').click();updateSelect('".$count_bagel."', '".$user_name."');$('#bagel').val(".$count_bagel.");getTable('time', 'asc', 'bagel', '".$count_bagel."', '', '');");
				else
					return array("status" => 0, "msg" => $msg, "js"=> "$('#gameOver').click();");
			}
	}

	public function checkTimeCheater($now, $min_turns, $count_bagel)
	{
		if($now <= 33 || $count_bagel < 1)
			return true;

		if($count_bagel < 4)
			$min_now = ($min_turns/2)*100;

		if($count_bagel >= 4)
			$min_now = ($min_turns/2 + 2)*100;

		if($now < $min_now)
			return true;

		return false;
	}


	public function saveResult($args)
	{
		$user_name = clear_text(trim($args['user_name']));
		$now = clear_text(trim($args['now']));
		$turns = clear_text(trim($args['turns']));
		$count_bagel = clear_text(trim($args['count_bagel']));

		$min_turns = 2 ** $count_bagel - 1;

		if(empty($user_name))
			return array("status" => 0, "msg" => 'Укажите Ваше имя или ник');

		if(empty($now) || empty($turns) || empty($count_bagel))
			return array("status" => 0, "msg" => 'Что то пошло не так, результат не сохранен!');

		if($this->checkTimeCheater($now, $min_turns, $count_bagel))
			return $this->insert_into($user_name, $count_bagel, $now, $turns, 1, 'Похоже на читерство');

		if($turns < $min_turns)
			return $this->insert_into($user_name, $count_bagel, $now, $turns, 1, 'Ну точно читер!');

		if($now > 6000*100 || $turns > 1350)
			return $this->insert_into($user_name, $count_bagel, $now, $turns, 1, 'Big cheater');
			// return array("status" => 0, "msg" => array($min_now, $now));

		return $this->insert_into($user_name, $count_bagel, $now, $turns, 0, 'Результат сохранен!');
	}

	public function getUniqueCountBagel()
	{
		$list = $this->db->getAll("SELECT DISTINCT `bagel` FROM `hanoi` WHERE `id` > 0 AND `cheater` = 0 ORDER BY `hanoi`.`bagel` ASC");
		return $list;
	}

	public function getUniqueUser()
	{
		$list = $this->db->getAll("SELECT DISTINCT `user` FROM `hanoi` WHERE `id` > 0 AND `cheater` = 0 ORDER BY `hanoi`.`user` ASC");
		return $list;
	}



	public function tableSql($args)
	{
		$table = "hanoi";

		$where_col = $args['where_col'];
		$where_val = $args['where_val'];
		$where_col2 = $args['where_col2'];
		$where_val2 = $args['where_val2'];

		$order = !empty($args['order']) ? $args['order'] : "time";

		$order_n = mb_strtoupper($args['order_n']) == 'DESC' ? 'DESC' : 'ASC';


		$list = [];


		if(empty($where_col2)){

			if($where_val == 'all'){
					$list = $this->db->getAll("SELECT * FROM ?n WHERE `cheater` = 0 ORDER BY ?n ".$order_n, $table, $order);
			}
			else{
					$list = $this->db->getAll("SELECT * FROM ?n WHERE ?n = ?s AND `cheater` = 0 ORDER BY ?n ".$order_n, $table, $where_col, $where_val, $order);
			}
		}

		elseif($where_col2=="user"){
			$list = $this->db->getAll("SELECT * FROM ?n WHERE ?n = ?s AND ?n = ?s AND `cheater` = 0 ORDER BY ?n ".$order_n, $table, $where_col, $where_val, $where_col2, $where_val2, $order);
		}

		return $list;
	}

	public function get_times($times)
	{

		$millisecond = 100;
		$second = round($times/$millisecond, 2);

		if($times < 6000)
			return $second.' сек';

		if($times < 6000*60)
			return round($second/60, 2).' мин';

		if($times >= 6000*60)
			return round($second/3600, 2).' час';

	}

	public function get_dates($dates)
	{
		$yesterday = strtotime('-1 day');
		if(strtotime($dates) > $yesterday)
			return date("H:i:s", strtotime($dates));

		return date("d.m.Y", strtotime($dates));
	}

	public function tableHtml($list)
	{
		if(empty($list))
			return;
		$html = '';
		$ip = GetUserIp();
		$uc = isset($_COOKIE["user_name"]) ? $_COOKIE["user_name"] : '';
		foreach ($list as $key => $value) {
			$my = ($value['user'] == $uc or $value['ip'] == $ip) ? 'my': '';
			$html .= '<div class="table flex aic jcsb tac fww '.$my.'">';
			$html .= '<div class="numb">'.($key+1).')</div>';
			$html .= '<div class="name_c wsnw_3p">'.$value['user'].'</div>';
			$html .= '<div class="time_c">'.$this->get_times($value['time']).'</div>';
			$html .= '<div class="bagel_c">'.$value['bagel'].'</div>';
			$html .= '<div class="turns_c">'.$value['turns'].'</div>';
			$html .= '<div class="date_c">'.$this->get_dates($value['date']).'</div>';
			$html .= '</div>';
		}
		return $html;

	}

	public function table($args)
	{
		// return array("status"=>0, "msg"=>print_r($args));
		$order = mb_strtolower($args['order']);
		$order_n = mb_strtolower($args['order_n']);

		$list = $this->tableSql($args);
		$html = $this->tableHtml($list);

		return array("caller"=>"tableOut", "html"=>$html, "order"=>$order, "order_n"=>$order_n);
	}



}

 ?>