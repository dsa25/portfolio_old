<?php

class Log extends BaseClass
{
	protected $data;

	public function __construct()
	{
		parent::__construct();
		$this->data = array("status" => 0, "msg" => "");
	}

	public function log($text)
	{
		$this->f_log($text, "log.txt");
	}

	public function warning($text)
	{
		$uid = $this->uid;
		$text = $uid > 0 ? "[".$uid."] ".$text : $text;
		$this->f_log($text, "warnings.txt");
	}

	public function error($text)
	{
		if ($this->uid>0)
			$value = "[UID: ".$this->uid."] ";
		else
			$value = "[IP: ".GetUserIp()."] ";
		$class_name = get_called_class();
		$this->f_log($value.$class_name." - ".$text, "errors.txt");
	}

	public function ban_log($text = "")
	{
		$uid = $this->uid;
		$text = $uid > 0 ? "[".$uid."] ".$text : $text;
		$this->f_log($text, "ban.txt");
	}

	public function blog($text = "", $uid = false)
	{
		$uid = $uid != false ? $uid : $this->uid;
		$text = $uid > 0 ? "[".$uid."] ".$text : $text;
		$this->f_log($text, "check_ban.txt");
	}

	public function f_log($value='', $fname = "log.txt")
	{
		$fp = fopen(RDir."/".Prefix.$fname, "a");
		$mytext = date("Y-m-d H:i:s").": ".$value."\r\n";
		fwrite($fp, $mytext);
		fclose($fp);
	}

	public function db_log($msg)
	{
		$uid = $this->uid;
		$this->db->Query("insert into `z_log` (`id_user`, `msg`, `added`) values (?i, ?s, NOW())", $uid, $msg);
	}

	public function __get($name)
	{
		if (($result = parent::__get($name)) !== null)
			return $result;
		if (Debug)
		{
			$err =print_r(debug_backtrace(), true);
			echo "<pre>";
			debug_print_backtrace();
			echo "</pre>";
			$this->error("Неизвестное свойство: ".$name."\n".$err);
		}
		else
		{
			$err =print_r(debug_backtrace(), true);
			$this->error("Неизвестное свойство: ".$name."\n".$err);
		}
		return $this->$name = "";
	}


}