<?php

// $arrIp =  array(
// 	"145.255.21.220",
// 	"145.255.21.99"
// 	 );

// $ip = isset($_SERVER['HTTP_X_REAL_IP']) ? $_SERVER['HTTP_X_REAL_IP'] : $_SERVER['REMOTE_ADDR'];

// if(in_array($ip, $arrIp)){

	include $_SERVER['DOCUMENT_ROOT'].'/list/hanoi/core/init.php';
	include $_SERVER['DOCUMENT_ROOT'].'/list/hanoi/pages/index.php';

// } else{
// 	 echo 'stop'; exit(header($_SERVER['SERVER_PROTOCOL'] . ' 404 Not Found', true));
// }