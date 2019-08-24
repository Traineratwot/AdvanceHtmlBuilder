let gird_size = 20;
let tool = "rect";
let settings = [];
function DeepCopy(x) {
	let y = [];
	for (key in x) {
		if (typeof x[key] == "object" || typeof x[key] == "array") {
			y[key] = DeepCopy(x[key]);
		} else {
			y[key] = x[key];
		}
	}
	return y;
}
function arr2obj2json(arr, js = false) {
	let obj = {};
	for (key in arr) {
		if (typeof arr[key] == "object" || typeof arr[key] == "array") {
			obj[key] = arr2obj2json(arr[key]);
		} else {
			obj[key] = arr[key];
		}
	}
	if (js) {
		return JSON.stringify(obj);
	} else {
		return obj;
	}
}
function json2obj2arr(obj, js = false) {
	let arr = [];
	if (js) {
		obj = JSON.parse(obj);
	}
	for (key in obj) {
		if (typeof obj[key] == "object" || typeof obj[key] == "array") {
			arr[key] = json2obj2arr(obj[key]);
		} else {
			arr[key] = obj[key];
		}
	}
	return arr;
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
		// update_div();
		$(".tool_active").removeClass("tool_active");
		$("#" + value).addClass("tool_active");
		if (value == "hand") {
			if (!opty) {
				handcheckinterval = setInterval(() => {
					handcheck();
				}, 200);
			}
		} else {
			if (handcheckinterval) {
				clearInterval(handcheckinterval);
			}
		}
	}
}

function tool_param_edit() {
	let val = 0;
	if (this.value() != "") {
		val = this.value();
	}
	if (this.key) {
		settings[this.type][this.key] = val;
	} else {
		settings[this.type] = val;
	}
}
function create_param(d) {
	function create_num2(t, i, text, type, key, base = 0, help = false) {
		if (!settings[type]) {
			settings[type] = [];
		}
		if (!settings[type][key]) {
			settings[type][key] = base;
		}
		t[i] = createInput(settings[type][key], "Number");
		t.child(t[i]);
		t[i].type = type;
		t[i].size(50, 14);
		t[i].attribute("min", 0);
		if (help) {
			t[i].id("set" + i);
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
	function create_col(t, i, type, base) {
		if (!settings[type]) {
			settings[type] = base;
		}
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
		case "hand":
			cursor(handUP, 12, 12);
			break;
		case "text":
			cursor(text_cur);
			break;

		default:
			return false;
	}
}

async function handcheck() {
	if (stop == false) {
		let side = "";
		for (let i = mss.length - 1; i >= 0; i--) {
			const element = mss[i];
			if (element.type == "rect") {
				if (mouseX >= element.mX_start - DZPX && mouseX <= element.mX_end + DZPX && abs(element.mY_start - mouseY) <= DZPX) {
					side += "up";
				}
				if (mouseX >= element.mX_start - DZPX && mouseX <= element.mX_end + DZPX && abs(element.mY_end - mouseY) <= DZPX) {
					side += "down";
				}
				if (mouseY >= element.mY_start - DZPX && mouseY <= element.mY_end + DZPX && abs(element.mX_start - mouseX) <= DZPX) {
					side += "left";
				}
				if (mouseY >= element.mY_start - DZPX && mouseY <= element.mY_end + DZPX && abs(element.mX_end - mouseX) <= DZPX) {
					side += "right";
				}
			}
		}
		switch (side) {
			case "up":
			case "down":
				cursor(UD, 5, 11);
				break;
			case "right":
			case "left":
				cursor(RL, 11, 5);
				break;
			case "upright":
			case "downleft":
				cursor(DLUR, 8, 8);
				break;
			case "downright":
			case "upleft":
				cursor(URDL, 8, 8);
				break;
			default:
				cursor(handUP, 12, 12);
				break;
		}
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
		case "hand":
			cursor(handUP, 16, 16);
			break;

		default:
			return false;
	}
}
function create_num(type, key, text, set = false, help = false) {
	o = create_td(type, key);
	u = o.td[type]
	if (set) {
		u = createInput(mss[key].settings[set][type], "Number");
	} else {
		u = createInput(mss[key][type], "Number");
	}
	o.td.child(u);
	u.type = type;
	u.set = set;
	u.size(50, 14);
	if (help) {
		u.addClass("help");
	}
	u.attribute("min", 0);
	u.attribute("placeholder", text);
	u.attribute("onkeydown", "kd(this,1)");
	u.attribute("onkeyup", "kd(this,0)");
	u.attribute("onmousemove", "$(this).focus()");
	u.attribute("onmouseout", "$(this).blur()");
	u.key = key;
	u.input(myInputEvent);
}
function create_but(type, key, text) {
	o = create_td(type, key);
	u = o.td[type]
	u = createButton(text);
	o.td.child(u);
	u.type = type;
	u.size(20, 20);
	u.key = key;
	u.mousePressed(Pressed_button);
}
function create_text(type, key, text, help = false) {
	o = create_td(type, key);
	u = o.td[type]
	u = createInput(mss[key][type]);
	o.td.child(u);
	u.type = type;
	u.size(50, 14);
	if (help) {
		u.addClass("help");
	}
	u.attribute("placeholder", text);
	u.attribute("onmousemove", "$(this).focus()");
	u.attribute("onmouseout", "$(this).blur()");
	u.key = key;
	u.input(myInputEvent);
}
function create_color(type, key, help = false) {
	o = create_td(type, key);
	u = o.td[type]
	u = createColorPicker(mss[key].color);
	o.td.child(u);
	u.type = type;
	u.size(40, 15);
	u.attribute("oncontextmenu", "this.value = `+#ffffff`+; thisInputEvent($(this),`" + type + "`+," + key + "); return false;");
	u.key = key;
	u.input(myInputEvent);
}

function create_td(type, key) {
	div[key].td = createElement("td");
	div[key].child(div[key].td);
	return div[key]
}

function create_div(key = -1, img ='') {
	if (key >= 0) {
		let tools = `<tr class="settings" id="#` + key + `">
		<span>`+img+` `+ key + `</span>
		<td><input data-type="name" type="text" placeholder="name" value="`+ mss[key].name + `"/></td>
	
		<td><button data-type="^">^</button></td>
		<td><button data-type="X">X</button></td>
		<td><input data-type="sX" type="Number" min="0" placeholder="Size X" value="`+ mss[key].sX + `" /></td>
	
		<td><input data-type="sY" type="Number" min="0" placeholder="Size Y" value="`+ mss[key].sY + `" /></td>
	
		<td><input data-type="mX_start" type="Number" min="0" placeholder="Pos X" value="`+ mss[key].mX_start + `" /></td>
	
		<td><input data-type="mY_start" type="Number" min="0" placeholder="Pos Y" value="`+ mss[key].mY_start + `" /></td>

		<td><input data-type="color" type="color" value="`+ mss[key].settings.color + `"/></td>`;
		if (mss[key].type == "rect") {
			tools += `<td><input data-type="LU" data-set="corner" type="Number" min="0" placeholder="0" value="` + mss[key].settings.LU + `" /></td>
		
			<td><input data-type="RU" data-set="corner" type="Number" min="0" placeholder="0" value="`+ mss[key].settings.RU + `" /></td>
		
			<td><input data-type="RD" data-set="corner" type="Number" min="0" placeholder="0" value="`+ mss[key].settings.RD + `" /></td>
		
			<td><input data-type="LD" data-set="corner" type="Number" min="0" placeholder="0" value="`+ mss[key].settings.LD + `" /></td>
			</tr>`;
		}
		$('#param').append(tools);
	}
	$('tr.settings td input[type="color"]').on('contextmenu', function () { this.value = '#ffffff'; return false })
	$('tr.settings td input[type="Number"]').on('keydown', function () { kd(this, 1) })
	$('tr.settings td input[type="Number"]').on('keyup', function () { kd(this, 0) })
	$('tr.settings td input').on('keydown', function () { $(this).focus() })
	$('tr.settings td input').on('keyup', function () { $(this).blur() })
	$('tr.settings td button').on('input', function () { chlenInputEvent(this) })
	$('tr.settings td button').on('click', function () { Pressed_button(this) })
}