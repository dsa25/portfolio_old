<?php

/*
	Базовый класс для всех остальных классов...
*/

class BaseClass
{
	public $uid;

	function __construct()
	{
		$uid = isset($_SESSION['uid']) ? $_SESSION['uid'] : 0;
		$this->set_uid($uid);
	}


	public function set_uid($uid)
	{
		$this->uid = $uid;
		$this->is_auth = $this->uid>0 ? True : False;
		$this->is_admin = isset($_SESSION['admin']) ? True : False;
	}


	public function __get($name)
	{
		// запрашиваем бд только по необходимости
		if ($name=="db")
			return $this->db = db::getInstance();
	}


}
