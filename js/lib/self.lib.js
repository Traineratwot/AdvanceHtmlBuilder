let gird_size = 20
let tool = "rect";
let settings = []
function DeepCopy(x) {
	let y = []
	for (key in x) {
		if (typeof (x[key]) == "object" || typeof (x[key]) == "array") {
			y[key] = DeepCopy(x[key]);
		} else {
			y[key] = x[key]
		}
	}
	return y
}
function arr2obj2json(arr, js = false) {
	let obj = {}
	for (key in arr) {
		if (typeof (arr[key]) == "object" || typeof (arr[key]) == "array") {
			obj[key] = arr2obj2json(arr[key]);
		} else {
			obj[key] = arr[key]
		}
	}
	if (js) {
		return JSON.stringify(obj)
	} else {
		return obj
	}
}
function json2obj2arr(obj, js = false) {
	let arr = []
	if (js) {
		obj = JSON.parse(obj)
	}
	for (key in obj) {
		if (typeof (obj[key]) == "object" || typeof (obj[key]) == "array") {
			arr[key] = json2obj2arr(obj[key]);
		} else {
			arr[key] = obj[key]
		}
	}
	return arr
}
function create_tool() {
	div.tool = createDiv();
	select("#tool").child(div.tool);
	div.tool.addClass("settings");
	create_td("", "tool");
	create_param(div.tool.td);
}
function tool_change(value) {
	if (tool != value) {
		tool = value;
		set_cur();
		update_div();
	}
}

function tool_param_edit() {
	let val = 0;
	if (this.value() != "") {
		val = this.value()
	}
	if (this.key) {
		settings[this.type][this.key] = val;
	} else {
		settings[this.type] = val;
	}
}
function create_param(d) {
	function create_num2(t, i, text, type, key, base = 0, help = false) {
		if (!settings[type]) { settings[type] = [] };
		if (!settings[type][key]) { settings[type][key] = base; };
		t[i] = createInput(settings[type][key], "Number");
		t.child(t[i]);
		t[i].type = type;
		t[i].size(50, 14);
		t[i].attribute("min", 0);
		if (help) {
			t[i].id("set" + i)
			t[i].addClass("help");
			t[i].attribute("onchange", "help(this)");
		}
		t[i].attribute("placeholder", text);
		t[i].attribute("onkeydown", "kd(this,1)");
		t[i].attribute("onkeyup", "kd(this,0)");
		t[i].attribute("onmousemove", "$(this).focus()");
		t[i].attribute("onmouseout", "$(this).blur()");
		t[i].key = key;
		t[i].input(tool_param_edit);
	}
	function create_cb(t, i, type, key) {

	}
	function create_col(t, i, type, base) {
		if (!settings[type]) { settings[type] = base; };
		t[i] = createColorPicker(settings[type], settings[type]);
		t.child(t[i]);
		t[i].type = type;
		t[i].size(50, 14);
		t[i].attribute("min", 0);
		if (help) {
			t[i].id("set" + i);
			t[i].addClass("help");
			t[i].attribute("onchange", "help(this)");
		}
		t[i].key = false;
		t[i].input(tool_param_edit);
	}
	create_col(d, 0, "color", "#ffffff");
	switch (tool) {
		case "rect":
			cursor(rect_cur);
			create_num2(d, 1, "0", "corner", "LU");
			create_num2(d, 2, "0", "corner", "RU");
			create_num2(d, 3, "0", "corner", "RD");
			create_num2(d, 4, "0", "corner", "LD");
			break;
		case "circle":
			cursor(circle_cur);
			break;
		case "text":
			cursor(text_cur);
			break;

		default:
			return false;
	}
}

function set_cur() {
	switch (tool) {
		case "rect":
			cursor(rect_cur);
			break;
		case "circle":
			cursor(circle_cur);
			break;

		default:
			return false;
	}
}
function create_num(type, key, text, set = false, help = false) {
	create_td(type, key);
	if (set) {
		div[key].td[type] = createInput(mss[key].settings[set][type], "Number");
	} else {
		div[key].td[type] = createInput(mss[key][type], 'Number');
	}
	div[key].td.child(div[key].td[type]);
	div[key].td[type].type = type;
	div[key].td[type].set = set;
	div[key].td[type].size(50, 14);
	if (help) {
		div[key].td[type].addClass("help");
	}
	div[key].td[type].attribute("min", 0);
	div[key].td[type].attribute("placeholder", text);
	div[key].td[type].attribute("onkeydown", "kd(this,1)");
	div[key].td[type].attribute("onkeyup", "kd(this,0)");
	div[key].td[type].attribute("onmousemove", "$(this).focus()");
	div[key].td[type].attribute("onmouseout", "$(this).blur()");
	div[key].td[type].key = key;
	div[key].td[type].input(myInputEvent);
}
function create_but(type, key, text) {
	create_td(type, key);
	div[key].td[type] = createButton(text);
	div[key].td.child(div[key].td[type]);
	div[key].td[type].type = type;
	div[key].td[type].size(20, 20);
	div[key].td[type].key = key;
	div[key].td[type].mousePressed(Pressed_button);
}
function create_text(type, key, text, help = false) {
	create_td(type, key);
	div[key].td[type] = createInput(mss[key][type]);
	div[key].td.child(div[key].td[type]);
	div[key].td[type].type = type;
	div[key].td[type].size(50, 14);
	if (help) {
		div[key].td[type].addClass("help");
	}
	div[key].td[type].attribute("placeholder", text);
	div[key].td[type].attribute("onmousemove", "$(this).focus()");
	div[key].td[type].attribute("onmouseout", "$(this).blur()");
	div[key].td[type].key = key;
	div[key].td[type].input(myInputEvent);
}
function create_color(type, key, help = false) {
	create_td(type, key);
	div[key].td[type] = createColorPicker(mss[key].color);
	div[key].td.child(div[key].td[type]);
	div[key].td[type].type = type;
	div[key].td[type].size(27, AUTO);
	div[key].td[type].attribute("oncontextmenu", "this.value = '#ffffff'; thisInputEvent($(this),'" + type + "'," + key + "); return false;");
	div[key].td[type].key = key;
	div[key].td[type].input(myInputEvent);
}

function create_td(type, key) {
	div[key].td = createElement("td");
	div[key].child(div[key].td);
}

$.event.special.dblrightclick = {
	setup: function (data, namespaces) {
		var e = $(this);
		e.bind("contextmenu", $.event.special.dblrightclick.handler);
		e.data("x", null);
		e.data("y", null);
		e.data("time", null);
		e.data("limit", data || 400);
	},

	teardown: function (namespaces) {
		$(this).unbind("contextmenu", $.event.special.dblrightclick.handler);
	},

	handler: function (event) {
		event.preventDefault();
		var e = $(this);

		if (e.data("x") == event.screenX && e.data("y") == event.screenY
			&& (event.timeStamp - e.data("time")) < e.data("limit")) {
			e.data("x", null);
			e.data("y", null);
			e.data("time", null);
			event.type = "dblrightclick";
			$.event.dispatch.apply(this, arguments);
		} else {
			e.data("x", event.screenX);
			e.data("y", event.screenY);
			e.data("time", event.timeStamp);
		}
	}
};