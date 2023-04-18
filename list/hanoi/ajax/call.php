<?php
include $_SERVER['DOCUMENT_ROOT'].'/list/hanoi/core/init.php';

$module = isset($_REQUEST['module']) ? $_REQUEST['module'] : "";
$action = isset($_REQUEST['action']) ? $_REQUEST['action'] : "";

$caller = new ModuleCore($module);
echo json_encode($caller->call($action, $_REQUEST));