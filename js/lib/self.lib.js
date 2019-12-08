var gird_size = 20;
var TOOLS = {};
var settings = [];
var tool = 'rect'


class abstractTool {
	constructor() {
		this.name = this.constructor.name.replace('Tool', '')
	}
	// createField(type, settings, value = 0, attrs = []) {
	// 	this.Fields.push({ type, settings, value, attrs });
	// }
	// createButton(icon, attrs = []) {
	// 	this.Button.push({ icon, tool: this.tool, attrs });
	// }
	static displayButtons() {
		var string = "";
		for (const key in TOOLS) {
			const e = TOOLS[key];
			if (tool == key) {
				var cls = "tool_active"
			} else {
				var cls = ""
			}
			string += `<li class="tooltip top" data-title="${e.attrs.hotkey}"><button class="${cls}" id="${key}"onclick="tool_change('${key}')">${e.attrs.button.icon}</button></li>`
		}
		$('#lool_list').html(string);
	}
	explode(string, obj = settings) {
		var set = string.split('|');
		var value = obj
		for (const j of set) {
			value = value[j]
		}
		return value;
	}
	displayField() {
		var string = "<td>";
		for (const e of this.Fields) {
			var value = this.explode(e.settings)
			if (typeof value == "undefined") {
				value = e.value
			}
			string += `<input value="${value}" type="${e.type}" data-help data-settings="${e.settings}"`
			for (const key in e.attrs) {
				string += `${key}="${e.attrs[key]}"`
			}
			string += ">"
		}
		string += "</td>";
		$('#tool_settings').html(string);
		$('#tool_settings td input').on('input', function () {
			var $settings = $(this).attr('data-settings');
			var set = $settings.split('|');
			var value = settings
			var adr
			for (let i = 0; i < set.length; i++) {
				if (i == set.length - 1) {
					adr = set[i];
					break;
				}
				value = value[set[i]]
			}
			switch ($(this).attr('type')) {
				case 'number':
					value[adr] = parseInt($(this).val())
					break;
				default:
					value[adr] = $(this).val()
					break;
			}
		})
	}

	create_div(msk, key) {
		var string = "";
		var index = 0;
		for (const e of this.Fields) {
			var value = this.explode(e.settings, msk.settings)
			if (typeof value == "undefined") {
				value = e.value
			}

			string += `<td><input value="${value}" id="${key + index}" data-key="${key}" type="${e.type}" data-settings="${e.settings}"`
			for (const key in e.attrs) {
				string += `${key}="${e.attrs[key]}"`
			}
			string += "></td>"
			index++;
		}
		return string;
	}

	dra() {
		fill(settings.color);
		var x1, x2, y1, y2;
		if (mouseX_start < mouseX) {
			x1 = mouseX_start;
			x2 = round(mouseX / gird_size) * gird_size;
		} else {
			x1 = round(mouseX / gird_size) * gird_size;
			x2 = mouseX_start;
		}
		if (mouseY_start < mouseY) {
			y1 = mouseY_start;
			y2 = round(mouseY / gird_size) * gird_size;
		} else {
			y1 = round(mouseY / gird_size) * gird_size;
			y2 = mouseY_start;
		}
		this.draTool(x1, x2, y1, y2)
	}

	switchTool() {
		this.displayField();
		var { icon, x, y } = this.attrs.cursor
		cursor(icon, x, y)
		$(".tool_active").removeClass("tool_active");
		$("#" + tool).addClass("tool_active");
	}

	static regTool(name, obj) {
		TOOLS[name] = obj
	}
}

class rectTool extends abstractTool {
	attrs = {
		cursor: { icon: 'css/cursor/cube.cur', x: 0, y: 0 },
		hotkey: 'r',
		button: { icon: '<i class="far fa-square"></i>' }
	}
	Fields = [
		{ type: 'color', settings: 'color', value: '#ffffff', title: "Color", attrs: { class: "field-color" } },
		{ type: 'number', settings: 'corner|LD', value: '0', title: "LD corner", attrs: { class: "field-number", min: "0" } },
		{ type: 'number', settings: 'corner|LU', value: '0', title: "LU corner", attrs: { class: "field-number", min: "0" } },
		{ type: 'number', settings: 'corner|RD', value: '0', title: "RD corner", attrs: { class: "field-number", min: "0" } },
		{ type: 'number', settings: 'corner|RU', value: '0', title: "RU corner", attrs: { class: "field-number", min: "0" } },
	]
	draw(e) {
		rect(e.mX_start, e.mY_start, e.sX, e.sY, e.settings.corner.LU, e.settings.corner.RU, e.settings.corner.RD, e.settings.corner.LD);
	}
	draTool(x1, x2, y1, y2) {
		rect(x1, y1, round((x2 - x1) / gird_size) * gird_size, round((y2 - y1) / gird_size) * gird_size, settings.corner.LU, settings.corner.RU, settings.corner.RD, settings.corner.LD);
	}

}
class circleTool extends abstractTool {
	attrs = {
		cursor: { icon: 'css/cursor/O.cur', x: 0, y: 0 },
		hotkey: 'c',
		button: { icon: '<i class="far fa-circle"></i>' }
	}
	Fields = [
		{ type: 'color', settings: 'color', value: '#ffffff', title: "Color", attrs: { class: "field-color" } },
	]
	draw(e) {
		ellipse(e.mX_start, e.mY_start, e.sX, e.sY);
	}
	draTool(x1, x2, y1, y2) {
		ellipse(x1, y1, round((x2 - x1) / gird_size) * gird_size, round((y2 - y1) / gird_size) * gird_size);
	}

}

abstractTool.regTool('rect', new rectTool())
abstractTool.regTool('circle', new circleTool())
abstractTool.displayButtons()

// tool = new rectTool()
// tool = new circleTool()


// tool.Fields
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
function DeepCopy2(x) {
	return Object.assign({}, x)
}

function arr2obj2json(arr, js = false) {
	var obj = {};
	for (key in arr) {
		if (typeof arr[key] == "object" || typeof arr[key] == "array") {
			if (key != "img") {
				obj[key] = arr2obj2json(arr[key]);
			}
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
	var arr = [];
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

// function create_tool_() {
//     div.tool = createDiv();
//     select("#tool").child(div.tool);
//     div.tool.addClass("settings");
//     create_td("", "tool");
//     create_param(div.tool.td);
// }
//создание панели настроек инструмента
function create_tool() {
	switch (tool) {
		case 'rect':
			if (!settings['corner']) {
				settings['corner'] = [];
				settings['corner']['LD'] = 0;
				settings['corner']['LU'] = 0;
				settings['corner']['RD'] = 0;
				settings['corner']['RU'] = 0;
			}
			if (!settings['color']) {
				settings['color'] = "#ffffff";
			}
			tool_bar = `
		<td>
			<input value="` + settings['color'] + `" type="color" data-type="color" width="50" height="14" style="width: 50px; height: 14px;" min="0" id="set0" class="help">
			<input value="` + settings['corner']['LD'] + `" type="number" data-type="LD" width="50" height="14" style="width: 50px; height: 14px;" min="0" placeholder="0">
			<input value="` + settings['corner']['LU'] + `" type="number" data-type="LU" width="50" height="14" style="width: 50px; height: 14px;" min="0" placeholder="0">
			<input value="` + settings['corner']['RD'] + `" type="number" data-type="RD" width="50" height="14" style="width: 50px; height: 14px;" min="0" placeholder="0">
			<input value="` + settings['corner']['RU'] + `" type="number" data-type="RU" width="50" height="14" style="width: 50px; height: 14px;" min="0" placeholder="0">
		</td>
		`;
			break;
		case 'circle':
			if (!settings['color']) {
				settings['color'] = "#ffffff";
			}
			tool_bar = `
		<td>
			<input value="` + settings['color'] + `" type="color" data-type="color" width="50" height="14" style="width: 50px; height: 14px;" min="0" id="set0" class="help">
		</td>
		`;
			break;
		case 'hand':
			tool_bar = ``;
			break;
		case 'value':
			if (!settings['corner']) {
				settings['corner'] = [];
				settings['corner']['LD'] = 0;
				settings['corner']['LU'] = 0;
				settings['corner']['RD'] = 0;
				settings['corner']['RU'] = 0;
			}
			if (!settings['color']) {
				settings['color'] = "#ffffff";
			}
			tool_bar = `
		<td>
		<input value="` + settings['color'] + `" type="color" data-type="color" width="50" height="14" style="width: 50px; height: 14px;" min="0" id="set0" class="help">
		<input value="` + settings['corner']['LD'] + `" type="number" data-type="LD" width="50" height="14" style="width: 50px; height: 14px;" min="0" placeholder="0">
		<input value="` + settings['corner']['LU'] + `" type="number" data-type="LU" width="50" height="14" style="width: 50px; height: 14px;" min="0" placeholder="0">
		<input value="` + settings['corner']['RD'] + `" type="number" data-type="RD" width="50" height="14" style="width: 50px; height: 14px;" min="0" placeholder="0">
		<input value="` + settings['corner']['RU'] + `" type="number" data-type="RU" width="50" height="14" style="width: 50px; height: 14px;" min="0" placeholder="0">
		</td>
		`;
			break;
		default:
			tool_bar = ``;
			break;
	}

	$('#tool_settings').html(tool_bar);
	$('#tool_settings td input').on('input', function () {
		$type = $(this).attr('data-type');
		switch ($(this).attr('type')) {
			case 'number':
				settings['corner'][$type] = parseInt($(this).val())
				break;
			default:
				settings[$type] = $(this).val()
				break;
		}
	})
}
// инициализация изменения инструмента
function tool_change(value) {
	var handcheckinterval;
	if (tool != value) {

		tool = value;
		// set_cur();
		// update_div();
		TOOLS[value].switchTool();
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
	// create_tool()
}

function select_image(index) {
	tool_change("image");
	tool_index = index
}

function tool_param_edit() {
	var val = 0;
	if (this.value() != "") {
		val = this.value();
	}
	if (this.key) {
		settings[this.type][this.key] = val;
	} else {
		settings[this.type] = val;
	}
}

// function create_param(d) { // генерация инструмента

//     create_col(d, 0, "color", "#ffffff");
//     switch (tool) {
//         case "rect":
//             cursor(rect_cur);
//             create_num2(d, 1, "0", "corner", "LU");
//             create_num2(d, 2, "0", "corner", "RU");
//             create_num2(d, 3, "0", "corner", "RD");
//             create_num2(d, 4, "0", "corner", "LD");
//             break;
//         case "circle":
//             cursor(circle_cur);
//             break;
//         case "hand":
//             cursor(handUP, 12, 12);
//             break;
//         case "text":
//             cursor(text_cur);
//             break;

//         default:
//             return false;
//     }
// }

// function create_num2(t, i, text, type, key, base = 0, help = false) {
//     if (!settings[type]) {
//         settings[type] = [];
//     }
//     if (!settings[type][key]) {
//         settings[type][key] = base;
//     }
//     t[i] = createInput(settings[type][key], "number");
//     t.child(t[i]);
//     t[i].type = type;
//     t[i].size(50, 14);
//     t[i].attribute("min", 0);
//     if (help) {
//         t[i].id("set" + i);
//         t[i].addClass("help");
//         t[i].attribute("onchange", "help(this)");
//     }
//     t[i].attribute("placeholder", text);
//     t[i].attribute("onkeydown", "kd(this,1)");
//     t[i].attribute("onkeyup", "kd(this,0)");
//     t[i].attribute("onmousemove", "$(this).focus()");
//     t[i].attribute("onmouseout", "$(this).blur()");
//     t[i].key = key;
//     t[i].input(tool_param_edit);
// }

// function create_col(t, i, type, base) {
//     if (!settings[type]) {
//         settings[type] = base;
//     }
//     t[i] = createColorPicker(settings[type], settings[type]);
//     t.child(t[i]);
//     t[i].type = type;
//     t[i].size(50, 14);
//     t[i].attribute("min", 0);
//     if (help) {
//         t[i].id("set" + i);
//         t[i].addClass("help");
//         t[i].attribute("onchange", "help(this)");
//     }
//     t[i].key = false;
//     t[i].input(tool_param_edit);
// }
// проверка для установеи курсора при tool hand
function handcheck() {
	if (tool != 'hand') {
		return false;
	}
	if (stop == false) {
		var side = "";
		for (var i = mss.length - 1; i >= 0; i--) {
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
		case "image":
			cursor(image_cur);
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


// function create_but(type, key, text) {
//     o = create_td(type, key);
//     u = o.td[type]
//     u = createButton(text);
//     o.td.child(u);
//     u.type = type;
//     u.size(20, 20);
//     u.key = key;
//     u.mousePressed(Pressed_button);
// }

// function create_text(type, key, text, help = false) {
//     o = create_td(type, key);
//     u = o.td[type]
//     u = createInput(mss[key][type]);
//     o.td.child(u);
//     u.type = type;
//     u.size(50, 14);
//     if (help) {
//         u.addClass("help");
//     }
//     u.attribute("placeholder", text);
//     u.attribute("onmousemove", "$(this).focus()");
//     u.attribute("onmouseout", "$(this).blur()");
//     u.key = key;
//     u.input(myInputEvent);
// }

// function create_color(type, key, help = false) {
//     o = create_td(type, key);
//     u = o.td[type]
//     u = createColorPicker(mss[key].color);
//     o.td.child(u);
//     u.type = type;
//     u.size(40, 15);
//     u.attribute("oncontextmenu", "thisInputEvent($(this),`" + type + "`+," + key + "); return false;");
//     u.key = key;
//     u.input(myInputEvent);
// }

// function create_td(type, key) {
//     div[key].td = createElement("td");
//     div[key].child(div[key].td);
//     return div[key]
// }
// генрация блока управления элементом
function create_div(key = -1, ) {
	if (key == 0) {
		var head = `
		<tr class="settings" id="settings" style="">
			<th>#</th>
			<th>name</th>
			<th>!</th>
			<th>del</th>
			<th>X</th>
			<th>Y</th>
			<th>PX</th>
			<th>PY</th>
		</tr>
		`;
		$('#param').append(head);
	}
	if (key >= 0) {
		var config = `<tr class="settings" id="#${key}">
		<td>${TOOLS[mss[key].type].attrs.button.icon}${key}</td>
		<td><input data-key="${key}" data-type="name" type="text" placeholder="name" value="` + mss[key].name + `"/></td>
		<td><button data-type="^">^</button></td>
		<td><button data-type="X">X</button></td>
		<td><input data-key="${key}" data-obj="mss" data-type="sX" type="number" min="0" placeholder="Size X" value="` + mss[key].sX + `" /></td>
		<td><input data-key="${key}" data-obj="mss" data-type="sY" type="number" min="0" placeholder="Size Y" value="` + mss[key].sY + `" /></td>
		<td><input data-key="${key}" data-obj="mss" data-type="mX_start" type="number" min="0" placeholder="Pos X" value="` + mss[key].mX_start + `" /></td>
		<td><input data-key="${key}" data-obj="mss" data-type="mY_start" type="number" min="0" placeholder="Pos Y" value="` + mss[key].mY_start + `" /></td>`
		config += TOOLS[mss[key].type].create_div(mss[key], key);
		$('#param').append(config);
	}
	$('tr.settings td input[type="color"], #tool_settings td input[type="color"]').on('contextmenu', function () {
		this.value = '#ffffff';
		$(this).trigger('input');
		help(this);
		return false;
	})
	$('tr.settings td input[type="number"], #tool_settings td input[type="number"]').on('keydown', function () { kd(this, 1) })
	$('tr.settings td input[type="number"], #tool_settings td input[type="number"]').on('keyup', function () { kd(this, 0) })
	$('tr.settings td input, #tool_settings td input').on('keydown', function () { $(this).focus() })
	$('tr.settings td input, #tool_settings td input').on('keyup', function () { $(this).blur() })
	$('tr.settings td button').on('input', function () { chlenInputEvent(this) })
	$('tr.settings td button').on('click', function () { Pressed_button(this) })

	$('tr.settings td input').on('input', function () {
		var $key = $(this).attr('data-key');
		var $settings = $(this).attr('data-settings');
		var set = $settings.split('|');
		var value = mss[$key].settings
		var adr
		for (let i = 0; i < set.length; i++) {
			if (i == set.length - 1) {
				adr = set[i];
				break;
			}
			value = value[set[i]]
		}
		switch ($(this).attr('type')) {
			case 'number':
				value[adr] = parseInt($(this).val())
				break;
			default:
				value[adr] = $(this).val()
				break;
		}
		// if ($obj == 'settings') {
		// 	switch ($(this).attr('type')) {
		// 		case 'number':
		// 			mss[$key][$obj][$set][$type] = parseInt($(this).val())
		// 			break;
		// 		case 'color':
		// 			mss[$key][$obj][$type] = $(this).val()
		// 			mss[$key][$type] = $(this).val()
		// 			break;
		// 	}
		// } else {
		// 	switch ($(this).attr('type')) {
		// 		case 'number':
		// 			mss[$key][$type] = parseInt($(this).val())
		// 			break;
		// 		default:
		// 			mss[$key][$type] = $(this).val()
		// 			break;
		// 	}

		// }
		create()
	})
}

function log(x) {
	switch (typeof x) {
		case 'object':
			console.table(x)
			break;
		default:
			console.log(x)
			break;
	}
}