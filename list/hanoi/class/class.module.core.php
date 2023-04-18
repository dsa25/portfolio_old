<?php


class ModuleCore extends Log
{
	private $class;
	protected $module;


	function __construct($module)
	{
		parent::__construct();

		$this->data['msg'] = "Ошибка";
		if (empty($module))
		{
			if (Debug)
				$this->error("Передан пустой модуль");
			$this->data['msg'] = "Передан пустой модуль";
			return False;
		}
		$this->module = $module;
		try
		{
			$class_name = $module;
			if (Debug)
				$this->class = new $class_name();
			else
				@$this->class = new $class_name();
			return True;
		}
		catch (Exception $e)
		{
			if (Debug)
			{
				$this->data['msg'] = "Не найден обработчик для: ".$module;
				$this->error($this->data['msg']);
				print_r($e);
			}
			return False;
		}
	}

	public function call()
	{
		if ($this->class==NULL)
		{
			if (Debug)
				$this->error("Не создан класс для обработки в модуле: " . $this->module);
			return $this->data;
		}
		$num = func_num_args();
		if ($num==0)
		{
			if (Debug)
				$this->error("Нет аргумента в модуле: " . $this->module);
			return $this->data;
		}
		$args = func_get_args();
		$action = $args[0];
		$args = array_slice($args,1);
		$args = $args[0];
		$ret = $this->class->call($action, $args);
		return $ret;
	}



	public function get_class()
	{
		return  $this->class;
	}


}