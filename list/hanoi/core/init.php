<?php
define("RDir", $_SERVER['DOCUMENT_ROOT'].'/list/hanoi/');
define("CDir", RDir."/class/");
$pref_url = isset($_SERVER['HTTP_X_FORWARDED_PROTO']) ? $_SERVER['HTTP_X_FORWARDED_PROTO'] : $_SERVER['REQUEST_SCHEME'];
define("Site", $pref_url."://".$_SERVER['SERVER_NAME']);
define("Host", $_SERVER['HTTP_HOST']);


 function GetUserIp()
{
	return isset($_SERVER['HTTP_X_REAL_IP']) ? $_SERVER['HTTP_X_REAL_IP'] : $_SERVER['REMOTE_ADDR'];
}

function clear_text($s)
{
	return strip_tags(htmlspecialchars($s, ENT_QUOTES));
}


$start_time = microtime(true);


date_default_timezone_set('Europe/Moscow');




include RDir.'config.php';
$config = new Config();



function __autoload($name)
{
	$name = str_replace(chr(0), '', $name);
	$name = preg_replace ("/[^a-zA-Z0-9.\s]/","",$name);
	$f_name = substr($name, 0, 1);
	$name = substr($name, 1);
	$name = preg_replace('/[A-Z]/', ".\${0}", $name);
	$name = strtolower($f_name.$name);
	$full_name = "class.".$name.".php";
	if (substr($name, 0, 5)=="model")
		$full_name = $name.".php";
	if (Debug)
		include RDir."class/".$full_name;
	else
		@include RDir."class/".$full_name;
}

spl_autoload_register("__autoload");



// error_reporting(E_ALL);
// ini_set('display_errors', 1);
// session_start();

