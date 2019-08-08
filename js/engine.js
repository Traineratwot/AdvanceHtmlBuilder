let bg_color = 0;
let dra = false;
let mouseX_start = 0;
let mouseY_start = 0;
let mss = [];
let mcc = [];
let div = [];
let lp = 0;
let opty = false;
function preload() {
	circle_cur = "css/cursor/O.cur";
	rect_cur = "css/cursor/cube.cur";
	text_cur = "css/cursor/text.cur";
}

function setup() {
	createCanvas(windowWidth / 2, windowHeight / 2);
	frameRate(120);
	update_div();
	ellipseMode(CORNER);
	angleMode(DEGREES);
	setInterval(() => {
		$("#fps").text(round(frameRate()))
	}, 200);
}

// if($.cookie('mss')){
// mss = $.cookie('mss');
// }
let fps;
function draw() {
	if (opty) {
		fps = 60;
	} else {
		fps = map(mss.length, 2, 20, 120, 20, true);
		if (mss.length > 25) {
			fps = map(mss.length, 25, 50, 20, 5, true);
		}
	}
	frameRate(fps);
	if (Number($("#gird_input").val()) <= 0) {
		gird_size = 1;
	} else {
		gird_size = Number($("#gird_input").val());
	}
	background(bg_color);
	stroke(50);
	strokeWeight(1);
	if (Number($("#gird_input").val()) > 0) {
		for (let i = 0; i < width; i += gird_size) {
			line(i, height, i, 0);
		}
		for (let i = 0; i < height; i += gird_size) {
			line(width, i, 0, i);
		}
	}
	for (key in mss) {
		fill(mss[key].color);
		switch (mss[key].type) {
			case "rect":
				rect(mss[key].mX_start, mss[key].mY_start, mss[key].sX, mss[key].sY, mss[key].settings.corner.LU, mss[key].settings.corner.RU, mss[key].settings.corner.RD, mss[key].settings.corner.LD);
				break;
			case "circle":
				ellipse(mss[key].mX_start, mss[key].mY_start, mss[key].sX, mss[key].sY);
				break;
			default:
				break;
		}
	}
	if (dra) {
		fill(settings.color);
		let x1, x2, y1, y2;
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
		switch (tool) {
			case "rect":
				rect(x1, y1, round((x2 - x1) / gird_size) * gird_size, round((y2 - y1) / gird_size) * gird_size, settings.corner.LU, settings.corner.RU, settings.corner.RD, settings.corner.LD);
				break;
			case "circle":
				ellipse(x1, y1, round((x2 - x1) / gird_size) * gird_size, round((y2 - y1) / gird_size) * gird_size);
				break;
			case "text":
				textSize(32);
				text("word word word word word word word word ", x1, y1, x2, y2);
				rect(x1, y1, round((x2 - x1) / gird_size) * gird_size, round((y2 - y1) / gird_size) * gird_size);

				break;
			default:
				break;
		}
	}
	if (lp == 30) {
		//noLoop();
		lp = 31;
	} else {
		lp++;
	}
}

function bg_c(x) {
	bg_color = x;
}

function mousePressed() {
	mouseX_start = round(mouseX / gird_size) * gird_size;
	mouseY_start = round(mouseY / gird_size) * gird_size;
	if (mouseX >= 0 && mouseY >= 0 && mouseX <= width && mouseY <= height) {
		dra = true;
		if (opty) {
			loop();
		}
	}
}

function mouseReleased() {
	if (mouseX > 0 && mouseY > 0 && mouseX < width && mouseY < height && dra) {
		let m = [];
		if (mouseX_start < mouseX) {
			m.mX_start = mouseX_start;
			m.mX_end = round(mouseX / gird_size) * gird_size;
		} else {
			m.mX_start = round(mouseX / gird_size) * gird_size;
			m.mX_end = mouseX_start;
		}
		if (mouseY_start < mouseY) {
			m.mY_start = mouseY_start;
			m.mY_end = round(mouseY / gird_size) * gird_size;
		} else {
			m.mY_start = round(mouseY / gird_size) * gird_size;
			m.mY_end = mouseY_start;
		}
		m.sX = m.mX_end - m.mX_start;
		m.sY = m.mY_end - m.mY_start;
		m.type = tool;
		m.settings = DeepCopy(settings);
		m.name = "div"+mss.length;
		m.color = settings.color;
		if (m.sX > 0 && m.sY > 0) {
			mss.push(m);
		}
		mouseX_start = -1;
		mouseY_start = -1;
		update_div();
	}
	dra = false;
	if (opty) {
		noLoop();
	}
}
function windowResized() {
	resizeCanvas(windowWidth / 2, windowHeight / 2);
}
function update_div(t = false) {
	removeElements();
	create_tool();
	for (key in mss) {
		switch (mss[key].type) {
			case "rect":
				img = '<i class="far fa-square"></i>';
				break;
			case "circle":
				img = '<i class="far fa-circle"></i>';
				break;
			default:
				break;
		}
		div[key] = createElement("tr");
		select("#param").child(div[key]);
		div[key].addClass("settings");
		div[key].span = createSpan(img + " " + key);
		div[key].child(div[key].span);
		create_text("name", key, "name");
		create_but("^", key, "^");
		create_but("x", key, "X");
		create_num("sX", key, "Size X");
		create_num("sY", key, "Size Y");
		create_num("mX_start", key, "Pos X");
		create_num("mY_start", key, "Pos X");
		create_color("color", key);
		switch (mss[key].type) {
			case "rect":
				create_num("LU", key, "0", "corner");
				create_num("RU", key, "0", "corner");
				create_num("RD", key, "0", "corner");
				create_num("LD", key, "0", "corner");
				break;
			default:
				break;
		}
	}
	if ($("textarea").is("#html_editor")) {
		$("#html_editor").detach();
	}
	if ($("textarea").is("#css_editor")) {
		$("#css_editor").detach();
	}
	if (!opty || t) {
		create();
	}
}
function myInputEvent() {
	let type = this.type;
	let key = this.key;
	let set = this.set;
	let val = this.value();
	switch (type) {
		case "name":
		case "color":
			mss[key][type] = val;
			break;
		default:
			if (set) {
				mss[key].settings[set][type] = Number(val);
			} else {
				mss[key][type] = Number(val);
			}
			break;
	}
	recalc(key, type);
	if (!opty) {
		create();
	}
}
function thisInputEvent(t, type, key, set = false) {
	let val = t.val();
	switch (type) {
		case "name":
		case "color":
			mss[key][type] = val;
			break;
		default:
			if (set) {
				mss[key].settings[set][type] = Number(val);
			} else {
				mss[key][type] = Number(val);
			}
			break;
	}
	recalc(key, type);
	if (!opty) {
		create();
	}
}
function recalc(key, type) {
	data = mss[key];
	switch (type) {
		case "mX_start":
		case "sX":
			data.mX_end = data.mX_start + data.sX;
			break;
		case "mY_start":
		case "sY":
			data.mY_end = data.mY_start + data.sY;
			break;
		default:
			return false;
	}
}

function Pressed_button() {
	let type = this.type;
	let key = this.key;
	switch (type) {
		case "^":
			if (key > 0) {
				let s = mss[key];
				mss[key] = mss[key - 1];
				mss[key - 1] = s;
			}
			break;
		case "x":
			mcc.push(mss[key]);
			mss.splice(key, 1);
			break;
		default:
			return false;
	}
	update_div();
}
function undo() {
	if (mss.length > 0) {
		mcc.push(mss[mss.length - 1]);
		mss.pop();
	}
	update_div();
}
function redo() {
	if (mcc.length > 0) {
		mss.push(mcc[mcc.length - 1]);
		mcc.pop();
	}
	update_div();
}
var last_mss =[]
function create() {
	if (opty) {
		draw();
	}
	let type = $(".create_type:checked").val();
	$(".raw").html("");
	$("#prew_html").html("");
	$("#prew_css").html("");
	$(".style").html("");
	let child_DOM = $('#child_DOM').prop('checked');
	let use_vars  = !$('#use_vars').prop('checked');
	let style = "";
	let first = [];
	let style_data = ''
	if(use_vars){
		var vars_str = ":root{";
		var vars ={};
	}
	jQuery.each(mss, function (i, val) {
		switch (child_DOM) {
			case true:
				if (i == 0) {
					style = "." + val.name + "{";
				} else {
					style = "." + mss[0].name + " :nth-child(" + i + "){";
				}
				break;
			case false:
				style = "." + val.name + "{";
				break;
		}
		switch (type) {
			case "%":
				if (i == 0) {
					style += "position: relative; width: " + val.sX + "px;  height:" + val.sY + "px;";
					first = val;
					if (child_DOM) {
						$("<div>", { class: "test " + val.name }).appendTo(".raw");
						div0 = "." + val.name + "{top:" + val.mY_start + "px;left:" + val.mX_start + "px;}";
					} else {
						$("<div>", { class: "test " + val.name }).appendTo(".raw");
						div0 = "." + val.name + " {top:" + val.mY_start + "px;left:" + val.mX_start + "px;}";
					}
				} else {
					if (child_DOM) {
						$("<div>", {class: "test " + val.name}).appendTo("." + first.name);
					} else {
						$("<div>", { class: "test " + val.name }).appendTo("." + first.name);
					}
					let left2 = val.mX_start - first.mX_start;
					let top2 = val.mY_start - first.mY_start;
					let left = (left2 / first.sX) * 100;
					let top = (top2 / first.sY) * 100;
					let w = (val.sX / first.sX) * 100;
					let h = (val.sY / first.sY) * 100;
					if (child_DOM) {
						style = "." + mss[0].name + " :nth-child(" + i + "){";
					} else {
						style = "." + val.name + "{";
					}
					if(use_vars){
						w 	= w.toFixed()
						h 	= h.toFixed()
						top = top.toFixed()
						left= left.toFixed()
						vars['width'+w]	 	= w+"%";
						vars['height'+h]	= h+"%";
						vars['top'+top] 	= top+"%";
						vars['left'+left] 	= left+"%";
						style += "position: absolute; width: var(--width"+w+");  height: var(--height"+h+"); top: var(--top"+top+");left: var(--left"+left+");";
					}else{
						style += "position: absolute; width: " + w + "%;  height:" + h + "%; top:" + top + "%;left:" + left + "%;";
					}
				
				}
				break;
			case "px":
				if (i == 0) {
					style += "position: relative; width: " + val.sX + "px;  height:" + val.sY + "px;";
					first = val;
					if (child_DOM) {
						$("<div>", { class: "test " + val.name}).appendTo(".raw");
						div0 = "." + val.name + "{top:" + val.mY_start + "px;left:" + val.mX_start + "px;}";
					} else {
						$("<div>", { class: "test " + val.name }).appendTo(".raw");
						div0 = "." + val.name + " {top:" + val.mY_start + "px;left:" + val.mX_start + "px;}";
					}
				} else {
					if (child_DOM) {
						$("<div>", {class: "test " + val.name}).appendTo("." + first.name);
					} else {
						$("<div>", { class: "test " + val.name }).appendTo("." + first.name);
					}
					let left = val.mX_start - first.mX_start;
					let top = val.mY_start - first.mY_start;
					if(use_vars){
						w 	= val.sX.toFixed()
						h 	= val.sY.toFixed()
						top = top.toFixed()
						left= left.toFixed()
						vars['width'+w]	 	= w+"px";
						vars['height'+h]	= h+"px";
						vars['top'+top] 	= top+"px";
						vars['left'+left] 	= left+"px";
						style += "position: absolute; width: var(--width"+w+");  height: var(--height"+h+"); top: var(--top"+top+");left: var(--left"+left+");";
					}else{
						style += "position: absolute; width: " + val.sX + "px;  height:" + val.sY + "px; top:" + top + "px;left:" + left + "px;";
					}
				}
				break;
			case "m":
				if (i == 0) {
					style += "width: " + val.sX + "px;  height:" + val.sY + "px;";
					first = val;
					if (child_DOM) {
						$("<div>", { class: "test " + val.name }).appendTo(".raw");
						div0 = "." + val.name + "{top:" + val.mY_start + "px;left:" + val.mX_start + "px; position: relative;}";
					} else {
						$("<div>", { class: "test " + val.name }).appendTo(".raw");
					div0 = "." + val.name + " {top:" + val.mY_start + "px;left:" + val.mX_start + "px; position: relative;}";
					}
				} else {
					if (child_DOM) {
						$("<div>", {class: "test " + val.name}).appendTo("." + first.name);
					} else {
						$("<div>", { class: "test " + val.name }).appendTo("." + first.name);
					}
					let left = val.mX_start - first.mX_start;
					let top = val.mY_start - first.mY_start;
					if(use_vars){
						vars['width'+val.sX]	= val.sX+"px";
						vars['height'+val.sY]	= val.sY+"px";
						vars['top'+top] 		= top+"px";
						vars['left'+left] 		= left+"px";
						style += "position: absolute; width: var(--width"+val.sX+");  height: var(--height"+val.sY+"); margin: var(--top"+top+") auto auto var(--left"+left+");";
					}else{
						style += "position: absolute; width: " + val.sX + "px;  height:" + val.sY + "px; margin: " + top + "px auto auto " + left + "px;";
					}
					
				}
				break;

			default:
				break;
		}
		switch (val.type) {
			case "rect":
				o = val.settings.corner;
				if (o.LU == 0 && o.RU == 0 && o.RD == 0 && o.LD == 0) {
				} else {
					style += "border-radius: " + o.LU + "px " + o.RU + "px " + o.RD + "px " + o.LD + "px;";
				}
				break;
			case "circle":
				style += "border-radius: 50%;";
				break;
			default:
				break;
		}
		if (val.color != "#ffffff") {
			if(use_vars){
				vars['color-'+i] = val.color;
				style += "background-color:var(--color-"+i+");";
			}else{
				style += "background-color:" + val.color + ";";
			}
			
		}

		style += "}";

		style_data += style

		$("#div0").html("");
		$("#div0").html(div0);
		style = "";
	});
	if(use_vars){
		jQuery.each(vars, function (i, val) {
			vars_str += "\n--"+i+":"+val+";"
		});
		vars_str+="}"
		style_data = vars_str+"\n"+ style_data
	}
	
	$(".style").html(style_data);
	$("#prew_html").text($(".raw").html());
	$("#prew_css").text($(".style").html());
	document.querySelectorAll("pre code").forEach((block) => {
		hljs.highlightBlock(block);
	});
	$(".hljs-tag").each(function (index, element) {
		this.after("\n");
	});
	$(".hljs-attribute").each(function (index, element) {
		this.before("\n");
	});
	$(".hljs-selector-class").each(function (index, element) {
		if (index == 0) {
		} else {
			this.before("\n\n");
		}
	});
	$("#prew_html")
		.children(".hljs-tag")
		.not(":first-child,:last-child")
		.each(function (index, element) {
			this.before("  ");
		});
	$(".hljs-attr").each(function (index, element) {
		$(this).text(" " + $(this).text());
	});
	return true;
}
