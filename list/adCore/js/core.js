function c_err(arg)
{
	console.log(arg);
};

function GetUnixTime()
{
	return Math.round(+new Date() / 1000);
};


function m_to_time(a)
{
	d=Math.floor(a/86400);
	a-=86400*d;
	h=Math.floor(a/3600);
	a-=3600*h;
	if(h<10)
		h='0'+h;
	m=Math.floor(a/60);
	if(m<10)
		m='0'+m;
	s=a-60*m;
	if(s<10)
		s='0'+s;
	if (d>0)
		return d+" дн."+h+":"+m+":"+s;
	if (h>0)
		return h+":"+m+":"+s;
	return m+":"+s;
}

function parse_url()
{
	var arr = location.pathname.split("/");
	arr.splice(0, 1);
	var data = {};
	data['url'] = location.pathname;
	for (var i = 0; i <= arr.length - 1; i++)
	{
		if (i == 0) data['page'] = arr[i];
		if (i == 1) data['action'] = arr[i];
		if ((i > 1) && ((i % 2) != 0)) {
			data[arr[i - 1]] = arr[i];
		}
		if ((i > 1) && ((i % 2) == 0)) {
			data[arr[i]] = "";
		}
	}
	return data;
};


function show_msg(msg, typ)
{
	if (msg=="")
		return;
	$('.popup_msg').show();
	$('.bgpopup_msg').show();
	$(".bgpopup_msg").next().find(".msg_s").html(msg);
	//setTimeout(function() {$(".helga_mess_bl ").removeClass("active");},3000);
};

function show_msg_pos(pos, msg, typ)
{
	$(".message_modal").hide();
	$(".mpos_"+pos).show().text(msg);
};

function init_forms()
{
	$('body').on('submit', "form:not(.block)", function(e)
	{
		submitForm($(this), e);
	});
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
		url: "/ajax/call.php",
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

function submitForm(form, e)
{
	e.preventDefault();
	var submitBtn = form.find('input[type=submit]');
	var str = form.serialize();
	$(submitBtn).attr("disabled", "disabled");
	call_ajax(str, submitBtn);
};

function close_modal()
{
	window.location = "#";
}


function call_insert(data)
{
	var ext_data = data.data;
	if (ext_data.typ=="form")
	{
		$(".for-forms").html(ext_data.data);
		$(".for-forms form").submit();
	}
	if (ext_data.typ=="href")
	{
		location.href=ext_data.data;
	}
	if (ext_data.typ=="form_text")
	{
		$(".form_stand").hide();
		$(".form_text").show();
		$(".form_text .adr").text(ext_data.data);
	}
}


// -----------------------------------------------------------------------------------------------------------
// Шаблонизатор
// -----------------------------------------------------------------------------------------------------------


function tpl_load(j_class)
{
	if ($("."+j_class).length>0)
		return tpl_data = $("."+j_class).html().trim();
	return "";
}


function tpl_get(tpl, args)
{
	if (tpl.length>0)
	{
		var tmp = tpl;
		for (var k in args)
		{
			if (typeof args[k] !== 'function')
			{
				tmp = tmp.replace(new RegExp("{tpl."+k+"}",'g'),args[k]);
			}
		}
		return tmp;
	}
	return "";
}

// -----------------------------------------------------------------------------------------------------------
// аякс листание
// -----------------------------------------------------------------------------------------------------------
function pag_init_page_ajax(sub_class)
{
	var body = tpl_load("pager-body-tpl");
	var page = tpl_load("pager-page-tpl");
	return [body, page];
}


function pag_pager(sub_class, page, pages, max_pages)
{
	if (max_pages==undefined)
		max_pages = 3;
	if (pages<=1)
		return "";
	var body_page = pag_init_page_ajax();
	var t_body = body_page[0];
	var t_page = body_page[1];
	pages_arr = [];

	for (i=page; i >= page-max_pages ; i--)
		if (i<=pages && i>=1)
			pages_arr.push(i);

	pages_arr.reverse();

	for (i=page+1; i <= page+max_pages ; i++)
		if (i<=pages && i>=1)
			pages_arr.push(i);

	var pages = "";
	for (var i = 0; i <= pages_arr.length - 1; i++)
	{
		var active = "";
		if (pages_arr[i]==page)
			active = "active";
		pages += tpl_get(t_page, {"active":active, "page":pages_arr[i]});
	}
	return tpl_get(t_body, {"ext_class":sub_class, "pages":pages});
}

function pag_load_model(model, page)
{
	//pag_clear_block(model);
	var order = $("[data-model="+model+"].pager-ajax").attr("data-order");
	var order_n = $("[data-model="+model+"].pager-ajax").attr("data-order_n");
	call_ajax({"module":"TableOut", "action":model, "page":page, "order":order, "order_n":order_n});
}

function pag_get_ord_n(model)
{
	var oz = $("[data-model="+model+"].pager-ajax").attr("data-order_n");
	if (oz==undefined)
		oz = "desc";
	return oz;
}

function pag_set_settings(model, key, val)
{
	if (key=="order")
	{
		var last_ord = $("[data-model="+model+"].pager-ajax").attr("data-order");
		if (last_ord==val)
		{
			var oz = pag_get_ord_n(model);
			if (oz=="desc")
				oz = "asc";
			else if (oz=="asc")
				oz = "desc";
			pag_set_settings(model, "order_n", oz);
		}

	}
	$("[data-model="+model+"].pager-ajax").attr("data-"+key, val);
}

function pag_on_change_page(obj)
{
	var model = $(obj).parent().attr("data-pager-class");
	var page = $(obj).text();
	pag_load_model(model, page);
}

function pag_clear_block(name)
{
	var repeat = true;
	var cnt = 100;
	while (repeat && cnt>0)
	{
		cnt--;
		var el = $("[data-row="+name+"]").next();
		if ($(el).attr("data-model")==name)
			repeat = false;
		else
			$(el).remove();
	}
}

function pag_add_row(name, html)
{
	$("[data-row="+name+"]").after(html);
}


function pag_init_ajax_page(obj)
{
	var model = $(obj).attr("data-model");
	$("[data-row="+model+"]").hide();
	pag_clear_block(model);
	pag_load_model(model);
}


function pag_init_ajax_pagers()
{
	$(".pager-ajax").each(function()
	{
		pag_init_ajax_page($(this));
	})
	$('body').on('click', ".pager-class a", function(e)
	{
		pag_on_change_page($(this));
	});
	$('body').on('click', ".pager-order", function(e)
	{
		pag_set_settings($(this).attr("data-model"), "order", $(this).attr("data-order"));
		pag_load_model($(this).attr("data-model"), 1);
	});


}


function call_table_out(data)
{
	if (data.list==null)
		return;
	var model = data.model;
	var tpl = $("[data-row="+model+"]").get(0).outerHTML;
	var content = "";
	for (var i = 0; i <= data.list.length - 1; i++)
	{
		var row = data.list[i];
		var row_html = tpl_get(tpl, row);
		row_html = row_html.replace('style="display: none;',"");
		row_html = row_html.replace('data-row="'+model+'"',"");
		content += row_html;
	}
	var pager_html = pag_pager(model, data.page, data.pages);
	pag_clear_block(model);
	pag_add_row(model, content+pager_html);
}


jQuery(document).ready(function($)
{
	pag_init_ajax_pagers();
	init_forms();
});


