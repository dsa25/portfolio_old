function show_msg(msg, typ)
{
	if (msg=="")
		return;
	if(typ == 'success'){
		popup_open('formMsgSystem1');
		$("#formMsgSystem1").next().find(".text").html(msg);
	}
	else{
		popup_open('formMsgSystem');
		$("#formMsgSystem").next().find(".text").html(msg);
	}

	//setTimeout(function() {$(".helga_mess_bl ").removeClass("active");},3000);
};


function core_default_caller_ajax(data)
{
	if ("status" in data)
	{
		if (data['status'] == 1)
		{
			//if ("pos" in data)
			//	show_msg_pos(data['pos'], data['msg'], 1);
			//else
			if ("msg" in data)
				show_msg(data['msg'], 'success');
		}
		if (data['status'] == 0)
		{
			//if ("pos" in data)
			//	show_msg_pos(data['pos'], data['msg'], 0);
			//else
			if ("msg" in data)
				show_msg(data['msg'], 'error');
		}
	}
	if (data['url'] != undefined)
	{
		location.href = data['url'];
	}

	if (data['url2'] != undefined)
	{
		setTimeout(function()
		{
			location.href = data['url2'];
		}, 1500);
	}

	if (data['close'] != undefined)
	{
		window.close();
	}

	if (data['reload'] != undefined)
	{
		location.reload();
	}

	if (data['js'] != undefined)
		eval(data['js']);

	if (data['form_data'] != undefined)
	{
		$(".form_data").html(data['form_data']);
		$(".form_data form").submit();
	}

	if (data['clear_form'] != undefined)
	{
		$("."+data['clear_form']+" input[type=text]").each(function()
		{
			$(this).val("");
		});

		$("."+data['clear_form']+" textarea").each(function()
		{
			$(this).val("");
		});
	}

	if (data['caller'] != undefined)
	{
		eval(data['caller']+"(data);");
	}
};

function call_ajax(str, submitBtn)
{
	$.ajax({
		url: "./ajax/call.php",
		type: "POST",
		data: str,
		success: function(data)
		{
			try
			{
				if (data.length==0)
					return;
				if (data=="null")
					return;
				var data = $.parseJSON(data);
				core_default_caller_ajax(data);
			}
			catch (err)
			{
				console.log(err);
				alert(err+"\n"+data);
			}
			setTimeout(function()
			{
				if (submitBtn!=undefined)
					$(submitBtn).removeAttr("disabled");
			}, 1000);
		},
		error: function()
		{
			console.log("error load ajax");
			setTimeout(function()
			{
				if (submitBtn!=undefined)
					$(submitBtn).removeAttr("disabled");
			}, 2000);
		}
	});
};

