<?php

// function get_url_data($url)
// {
// 	$module = 'index';
// 	$action = 'index';
// 	$params = array();
// 	if ($url == '/' or $url=="")
// 		return array($module, $action, $params);
// 	try
// 	{
// 		$url_path = parse_url($url, PHP_URL_PATH);
// 		$uri_parts = explode('/', trim($url_path, ' /'));
// 		if ((count($uri_parts) % 2) and (count($uri_parts)!=1))
// 		{
// 			throw new Exception();
// 		}

// 		$module = array_shift($uri_parts); // Получили имя модуля
// 		$action = array_shift($uri_parts); // Получили имя действия

// 		for ($i=0; $i < count($uri_parts); $i++)
// 		{
// 			$params[$uri_parts[$i]] = $uri_parts[++$i];
// 		}
// 	}
// 	catch (Exception $e)
// 	{
// 		$module = '404';
// 		$action = 'main';
// 	}
// 	return array($module, $action, $params);
// }



 function GetUserIp()
{
	return isset($_SERVER['HTTP_X_REAL_IP']) ? $_SERVER['HTTP_X_REAL_IP'] : $_SERVER['REMOTE_ADDR'];
}



function clear_text($s)
{
	return strip_tags(htmlspecialchars($s, ENT_QUOTES));
}

