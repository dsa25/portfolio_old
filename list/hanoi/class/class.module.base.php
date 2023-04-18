<?php


class ModuleBase extends Log
{
	protected $args;
	protected $rules = array();
	protected $params;
	protected $actions;
	protected $config;


	function __construct()
	{
		global $config;
		parent::__construct();
		$this->rules = array();
		$this->params = array();
		$this->actions = array();
		$this->config = $config;
	}

	public function call_modules_method($name = "init")
	{
		$list = class_uses($this, false);
		foreach ($list as $key => $trait)
		{
			$method =$trait."_".$name;
			if (method_exists($this, $method))
				$this->$method();
		}
	}

	public function is_has_method($method)
	{
		if (method_exists($this, $method))
			return $method;
		else
			return False;
	}

	public function rules()
	{
		$this->rules["*"] = "allow";
	}


	public function params()
	{

	}


	public function get_stack()
	{
		return array();
	}


	private function get_rule_val($value)
	{
		// всем разрешено
		if ($value=="allow")
			return True;
		// всем запрещено
		if ($value=="deny")
			return False;
		// гости
		if ($value=="guest")
			return !$this->is_auth;
		// юзеры
		if ($value=="user")
			return $this->is_auth;
		// админы
		if ($value=="admin")
			return $this->is_admin;
	}


	private function check_rule($action)
	{
		$this->rules();
		$rules = $this->rules;
		// просматриваем правила
		foreach ($rules as $rule => $value)
		{
			// нашли нужное
			if ($rule == $action)
				return $this->get_rule_val($value);
		}
		// ищем общее
		if (isset($rules['*']))
			return $this->get_rule_val($rules['*']);
		// правило не нашли...
		return False;
	}


	private function check_pars($args, $list)
	{
		$tmp = array();
		foreach ($args as $key => $value)
		{
			$tmp[] = $key;
		}
		$args = $tmp;
		foreach ($list as $key => $value)
		{
			if (!in_array($value, $args))
				return $value;
		}
		return True;
	}


	public function call($action, $args)
	{
		if (!$this->check_rule($action))
		{
			$return = $this->data;
			$return['msg'] = "Сессия устарела, авторизуйтесь на сайте повторно!";
			return $return;
		}
		$this->params();
		$params = $this->params;
		if (isset($params[$action]))
			$param = $params[$action];
		if (isset($param))
		{
			$check = $this->check_pars($args, $param);
			if ($check===True)
			{}
			else
			{
				$return = $this->data;
				if (Debug)
				{
					$return['msg'] = "Ошибка: не найден параметр:".$check;
				}
				else
					$return['msg'] = "Ошибка код P";
				return $return;
			}
		}
		return $this->caller($action, $args);
	}


	public function caller($action, $args)
	{
		$this->action = $action;
		$this->args = $args;
		if (count($this->actions)>0)
		{
			if (in_array($action, $this->actions))
			{
				return $this->$action($args);
			}
			else
			{
				if (Debug)
				{
					$msg = "Не найден обработчик для действия: ".$action;
					$this->error($msg);
					return array("status" => 0, "msg" => $msg);
				}
				else
					return array("status" => 0, "msg" => "Ошибка, код M", "permission" => 0);
			}
		}
	}


	// public function __call($name, $arguments)
	// {
	// 	$this->ret_data[$name] = $arguments[0];
	// 	return $this;
	// }

	// public function __toString()
	// {
	// 	return json_encode($this->ret_data);
	// }

	// public function arr()
	// {
	// 	return $this->ret_data;
	// }

	// public function json()
	// {
	// 	return json_encode($this->ret_data);
	// }


}