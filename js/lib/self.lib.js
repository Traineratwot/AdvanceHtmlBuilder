var gird_size = 20;
var tool = "rect";
var settings = [];

function DeepCopy(x) {
    var y = [];
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
    var obj = {};
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
			<input value="`+settings['color']+`" type="color" data-type="color" width="50" height="14" style="width: 50px; height: 14px;" min="0" id="set0" class="help">
			<input value="`+settings['corner']['LD']+`" type="number" data-type="LD" width="50" height="14" style="width: 50px; height: 14px;" min="0" placeholder="0">
			<input value="`+settings['corner']['LU']+`" type="number" data-type="LU" width="50" height="14" style="width: 50px; height: 14px;" min="0" placeholder="0">
			<input value="`+settings['corner']['RD']+`" type="number" data-type="RD" width="50" height="14" style="width: 50px; height: 14px;" min="0" placeholder="0">
			<input value="`+settings['corner']['RU']+`" type="number" data-type="RU" width="50" height="14" style="width: 50px; height: 14px;" min="0" placeholder="0">
		</td>
		`;
            break;
        case 'circle':
            if (!settings['color']) {
                settings['color'] = "#ffffff";
            }
            tool_bar = `
		<td>
			<input value="`+settings['color']+`" type="color" data-type="color" width="50" height="14" style="width: 50px; height: 14px;" min="0" id="set0" class="help">
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
        <input value="`+settings['color']+`" type="color" data-type="color" width="50" height="14" style="width: 50px; height: 14px;" min="0" id="set0" class="help">
        <input value="`+settings['corner']['LD']+`" type="number" data-type="LD" width="50" height="14" style="width: 50px; height: 14px;" min="0" placeholder="0">
        <input value="`+settings['corner']['LU']+`" type="number" data-type="LU" width="50" height="14" style="width: 50px; height: 14px;" min="0" placeholder="0">
        <input value="`+settings['corner']['RD']+`" type="number" data-type="RD" width="50" height="14" style="width: 50px; height: 14px;" min="0" placeholder="0">
        <input value="`+settings['corner']['RU']+`" type="number" data-type="RU" width="50" height="14" style="width: 50px; height: 14px;" min="0" placeholder="0">
		</td>
		`;
            break;
        default:
            tool_bar = ``;
            break;
    }

    $('#tool_settings').html(tool_bar);
    $('#tool_settings td input').on('input', function() {
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
    create_tool()
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
//TODO переписать на jquery ## complete
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
function create_div(key = -1, img = '') {
    if (key >= 0) {
        var tools = `<tr class="settings" id="#` + key + `">
		<span>` + img + ` ` + key + `</span>
		<td><input data-key="` + key + `" data-type="name" type="text" placeholder="name" value="` + mss[key].name + `"/></td>
	
		<td><button data-type="^">^</button></td>
		<td><button data-type="X">X</button></td>
		<td><input data-key="` + key + `" data-obj="mss" data-type="sX" type="number" min="0" placeholder="Size X" value="` + mss[key].sX + `" /></td>
	
		<td><input data-key="` + key + `" data-obj="mss" data-type="sY" type="number" min="0" placeholder="Size Y" value="` + mss[key].sY + `" /></td>
	
		<td><input data-key="` + key + `" data-obj="mss" data-type="mX_start" type="number" min="0" placeholder="Pos X" value="` + mss[key].mX_start + `" /></td>
	
		<td><input data-key="` + key + `" data-obj="mss" data-type="mY_start" type="number" min="0" placeholder="Pos Y" value="` + mss[key].mY_start + `" /></td>

		<td><input data-key="` + key + `" data-type="color" data-set="color" data-obj="settings" type="color" value="` + mss[key].settings.color + `"/></td>`;
        if (mss[key].type == "rect") {
            tools += `
            <td><input data-key="` + key + `" data-type="LU" data-set="corner" data-obj="settings" type="number" min="0" placeholder="0" value="` + mss[key].settings.corner.LU + `" /></td>
		
			<td><input data-key="` + key + `" data-type="RU" data-set="corner" data-obj="settings" type="number" min="0" placeholder="0" value="` + mss[key].settings.corner.RU + `" /></td>
		
			<td><input data-key="` + key + `" data-type="RD" data-set="corner" data-obj="settings" type="number" min="0" placeholder="0" value="` + mss[key].settings.corner.RD + `" /></td>
		
			<td><input data-key="` + key + `" data-type="LD" data-set="corner" data-obj="settings" type="number" min="0" placeholder="0" value="` + mss[key].settings.corner.LD + `" /></td>
			</tr>`;
        }
        $('#param').append(tools);
    }
    $('tr.settings td input[type="color"], #tool_settings td input[type="color"]').on('contextmenu', function() { this.value = '#ffffff'; $(this).trigger('input');help(this); return false; })
    $('tr.settings td input[type="number"], #tool_settings td input[type="number"]').on('keydown', function() { kd(this, 1) })
    $('tr.settings td input[type="number"], #tool_settings td input[type="number"]').on('keyup', function() { kd(this, 0) })
    $('tr.settings td input, #tool_settings td input').on('keydown', function() { $(this).focus() })
    $('tr.settings td input, #tool_settings td input').on('keyup', function() { $(this).blur() })
    $('tr.settings td button').on('input', function() { chlenInputEvent(this) })
    $('tr.settings td button').on('click', function() { Pressed_button(this) })

    $('tr.settings td input').on('input', function() {
        $key = $(this).attr('data-key');
        $type = $(this).attr('data-type');
        $set = $(this).attr('data-set');
        $obj = $(this).attr('data-obj');
        if ($obj == 'settings') {
            switch ($(this).attr('type')) {
                case 'number':
                    mss[$key][$obj][$set][$type] = parseInt($(this).val())
                    break;
                case 'color':
                    mss[$key][$obj][$type] = $(this).val()
                    mss[$key][$type] = $(this).val()
                    break;
            }
        } else {
            switch ($(this).attr('type')) {
                case 'number':
                    mss[$key][$type] = parseInt($(this).val())
                    break;
                default:
                    mss[$key][$type] = $(this).val()
                    break;
            }
            
        }
        create()
    })
}