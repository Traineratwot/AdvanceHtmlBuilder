'use strict';
function NewCss(elemSelector) {
	if (elemSelector == null) {
		elemSelector = ("[newCss=\"1\"]");
	}
	var elems = $(elemSelector);
	for (var j = 0; j < elems.length; j++) {
		var elem = elems[j];
		var unit = new newCss(elem)
		var u = $(elem).attr("do");
		switch (u) {
			case "onblock":
				unit.onblock();
				break;
			case "underblock":
				unit.underblock();
				break;
			case "incenter":
				unit.incenter();
				break;
			case "custom":
				unit.custom();
				break;
			case "clear":
				unit.clear();
				break;
			case "aboveblock":
				unit.aboveblock();
				break;
			case "leftblock":
				unit.leftblock();
				break;
			case "rightblock":
				unit.rightblock();
				break;
			case "ClickSwitch":
				unit.ClickSwitch();
				break;
			case "drag_drop":
				unit.drag_drop();
				break;
			case "watermark":
				unit.watermark();
				break;
			case "":
			case undefined:
				break;
			default:
				console.warn(u + "");
		}
	}
}
var GodObj = {};
(function (old) {
	$.fn.attr = function () {
		if (arguments.length === 0) {
			if (this.length === 0) {
				return null;
			}
			var obj = {};
			$.each(this[0].attributes, function () {
				if (this.specified) {
					obj[this.name] = this.value;
				}
			});
			return obj;
		}
		return old.apply(this, arguments);
	};
})($.fn.attr);
class newCss {
	constructor(elem, param = { "do": null, "linkelem": null }) {
		this.elem = {}
		if (!$(elem) && $(elem).length != 1 ) {
			return false
		}
		this.param =[]
		this.elem.object = elem;
		if (param.do !== null && param.linkelem !== null) {
			$.each(param, function (key, value) {
				$(elem).attr(key.toLowerCase(), value);
			});
		} else {
			$.each($(elem).attr(), function (key, value) {
				param[key] = value;
			});
		}
		this.param = param
		this.elem.offset = $(this.elem.object).offset();
		this.elem.width = $(this.elem.object).width();
		this.elem.height = $(this.elem.object).height();
		this.linkelem = {}
		if (param.linkelem !== null) {
			this.linkelem.object = $(this.param.linkelem);
		} else if ($(this.elem.object).attr("linkelem")) {
			this.linkelem.object = $(this.elem.object).attr("linkelem");
		} else {
			this.linkelem = false
		}
		if (this.linkelem !== false) {
			this.linkelem.width = $(this.linkelem.object).width()
			this.linkelem.height = $(this.linkelem.object).height()
			this.linkelem.offset = $(this.linkelem.object).offset()
		}
		if (param.do !== null) {
			switch (param.do) {
				case "onblock":
					this.onblock();
					break;
				case "underblock":
					this.underblock();
					break;
				case "incenter":
					this.incenter();
					break;
				case "custom":
					this.custom();
					break;
				case "clear":
					this.clear();
					break;
				case "aboveblock":
					this.aboveblock();
					break;
				case "leftblock":
					this.leftblock();
					break;
				case "rightblock":
					this.rightblock();
					break;
				case "ClickSwitch":
					this.ClickSwitch();
					break;
				case "drag_drop":
					this.drag_drop();
					break;
				case "watermark":
					this.watermark();
					break;
				default:
					break;
			}
		}
	}
	onblock(elem = null) {
		if (this.linkelem === false) {
			return false;
		}
		$(this.elem.object).offset({
			"top": this.linkelem.offset.top,
			"left": this.linkelem.offset.left
		});
		if (!this.param.zindex) {
			this.param.zindex = 'auto'
		}
		$(this.elem.object).css({
			"width": this.linkelem.width,
			"height": this.linkelem.height,
			"z-index": this.param.zindex
		});
		if ($(this.elem.object).attr("CreateRulle") == "1") {
			var apo = $(this.elem.object)[0].tagName + "#" + $(this.elem.object)[0].id + "." + $(this.elem.object)[0].className;
			var style = apo + "{/*" + this.param.do + "*/top:" + this.linkelem.offset.top + "px ;left:" + this.linkelem.offset.left + "px;width:" + this.linkelem.width + "px;height:" + this.linkelem.height + "px;z-index:" + Zindex;
			if ($('head style').length > 0) {
				$('head style')[0].append(style)
			} else {
				$('head').append("<style>" + style + "</style>");
			}
			$(this.elem.object).removeAttr("CreateRulle");
		}
	}
	underblock(elem = null) {
		if (this.linkelem === false) {
			return false;
		}
		var top = this.linkelem.offset.top;
		var top = top + this.linkelem.height;
		$(this.elem.object).offset({
			"top": top,
			"left": this.linkelem.offset.left
		});
		$(this.elem.object).css({
			"width": this.linkelem.width + "px"
		});
		if ($(this.elem.object).attr("CreateRulle") == "1") {
			var apo = $(this.elem.object)[0].tagName + "#" + $(this.elem.object)[0].id + "." + $(this.elem.object)[0].className;
			var style = apo + "{/*" + this.param.do + "*/top:" + top + "px ;left:" + this.linkelem.offset.left + "px ;width:" + this.linkelem.width + "px";
			if ($('head style').length > 0) {
				$('head style')[0].append(style)
			} else {
				$('head').append("<style>" + style + "</style>");
			}
			$(this.elem.object).removeAttr("CreateRulle");
		}
	}
	aboveblock(elem = null) {
		if (this.linkelem === false) {
			return false;
		}
		var object = $(this.linkelem.object).offset();
		var width3 = $(this.linkelem.object).width()
		var top = this.linkelem.offset.top;
		var top = top - this.elem.height;
		$(this.elem.object).offset({
			"top": top,
			"left": this.linkelem.offset.left
		});
		$(this.elem.object).css({
			"width": this.linkelem.width
		});
		if ($(this.elem.object).attr("CreateRulle") == "1") {
			var apo = $(this.elem.object)[0].tagName + "#" + $(this.elem.object)[0].id + "." + $(this.elem.object)[0].className;
			var style = apo + "{/*" + this.param.do + "*/top:" + top + "px ;left:" + this.linkelem.offset.left + "px;width:" + this.linkelem.width + "px";
			if ($('head style').length > 0) {
				$('head style')[0].append(style)
			} else {
				$('head').append("<style>" + style + "</style>");
			}
			$(this.elem.object).removeAttr("CreateRulle");;
		}
	}
	leftblock(elem = null) {
		if (this.linkelem === false) {
			return false;
		}
		var left = this.linkelem.offset.left;
		var left = left - this.elem.width;
		$(this.elem.object).css({
			"height": this.linkelem.height
		});
		$(this.elem.object).offset({
			"top": this.linkelem.offset.top,
			"left": left
		});
		if ($(this.elem.object).attr("CreateRulle") == "1") {
			var apo = $(this.elem.object)[0].tagName + "#" + $(this.elem.object)[0].id + "." + $(this.elem.object)[0].className;
			var style = apo + "{/*" + this.param.do + "*/top:" + this.linkelem.offset.top + "px ;left:" + left + "px;height:" + this.linkelem.height + "px";
			if ($('head style').length > 0) {
				$('head style')[0].append(style)
			} else {
				$('head').append("<style>" + style + "</style>");
			}
			$(this.elem.object).removeAttr("CreateRulle");;
		}
	}
	rightblock(elem = null) {
		if (this.linkelem === false) {
			return false;
		}
		var left = this.linkelem.offset.left;
		var left = left + this.linkelem.width;
		$(this.elem.object).css({
			"height": this.linkelem.height
		});
		$(this.elem.object).offset({
			"top": this.linkelem.offset.top,
			"left": left
		});
		if ($(this.elem.object).attr("CreateRulle") == "1") {
			var apo = $(this.elem.object)[0].tagName + "#" + $(this.elem.object)[0].id + "." + $(this.elem.object)[0].className;
			var style = apo + "{/*" + this.param.do + "*/top:" + this.linkelem.offset.top + "px ;left:" + left + "px;height:" + this.linkelem.height + "px";
			if ($('head style').length > 0) {
				$('head style')[0].append(style)
			} else {
				$('head').append("<style>" + style + "</style>");
			}
			$(this.elem.object).removeAttr("CreateRulle");;
		}
	}
	incenter(elem = null) {
		if (this.linkelem === false) {
			return false;
		}
		var object = $(this.linkelem.object).offset();
		var width1 = $(this.linkelem.object).width();
		var height1 = $(this.linkelem.object).height();
		var width2 = $(this.elem.object).width();
		var height2 = $(this.elem.object).height();
		var top = object.top + (height1 / 2) - (height2 / 2);
		var left = object.left + (width1 / 2) - (width2 / 2);
		if ($(this.elem.object).attr("CreateRulle") == "1") {
			var apo = $(this.elem.object)[0].tagName + "#" + $(this.elem.object)[0].id + "." + $(this.elem.object)[0].className;
			var style = apo + "{/*" + this.param.do + "*/top:" + top + "px;left:" + left + "px";
			if ($('head style').length > 0) {
				$('head style')[0].append(style)
			} else {
				$('head').append("<style>" + style + "</style>");
			}
			$(this.elem.object).removeAttr("CreateRulle");;
		} else if ($(this.elem.object).attr("CreateRulle") == "2") {
			$(this.elem.object).css({
				"top": top + "px",
				"left": left + "px"
			})
		} else {
			$(this.elem.object).offset({
				"top": top,
				"left": left
			});
		}
	}
	custom(elem = null) {
		if (this.linkelem === false) {
			return false;
		}
		var width4 = $(window).width();
		var height4 = $(window).height();
		if (!this.param.top) {
			this.param.top = 0
		}
		if (!this.param.left) {
			this.param.left = 0
		}
		if (String(this.param.top).match(/%/)) {
			this.param.top = this.param.top.substring(0, this.param.top.length - 1);
			this.param.top = width4 / 100 * +this.param.top
		}
		if (String(this.param.left).match(/%/)) {
			this.param.left = this.param.left.substring(0, this.param.left.length - 1);
			this.param.left = height4 / 100 * +this.param.left
		}
		var top = this.linkelem.offset.top + this.linkelem.height / 2 - this.elem.height / 2 + +this.param.top;
		var left = this.linkelem.offset.left + this.linkelem.width / 2 - this.elem.width / 2 + +this.param.left;
		$(this.elem.object).offset({
			"top": top,
			"left": left
		});
		if ($(this.elem.object).attr("CreateRulle") == "1") {
			var apo = $(this.elem.object)[0].tagName + "#" + $(this.elem.object)[0].id + "." + $(this.elem.object)[0].className;
			var style = apo + "{/*" + this.param.do + "*/ top:" + top + "px ;left:" + left + "px";
			if ($('head style').length > 0) {
				$('head style')[0].append(style)
			} else {
				$('head').append("<style>" + style + "</style>");
			}
			$(this.elem.object).removeAttr("CreateRulle");;
		}
	}
	drag_drop(elem = null) {
		if (this.param.linkelem) {
			var hold = this.param.hold;
			if (hold == "1") {
				$(this.elem.object).attr("onmousedown", "h_s(this,'" + this.param.linkelem + "')");
			} else {
				$(this.elem.object).attr("onclick", "d_d(this,'" + this.param.linkelem + "')");
			}
		} else {
			var hold = this.param.hold;
			if (hold == "1") {
				$(this.elem.object).attr("onmousedown", "h_s(this)");
			} else {
				$(this.elem.object).attr("onclick", "d_d(this)");
			}
		}
	}
	ClickSwitch(elem = null) {
		$(this.elem.object).attr("onclick", "checkclik(this)");
		var linkelem = $(this.elem.object).attr("linkelem");
		if (linkelem == false || linkelem == undefined) {
			var linkelem = this.elem.object
		}
		var classX = $(linkelem).attr("class");
		GodObj.classX = classX;
	}
	watermark(elem = null) {
		var ok = $(this.elem.object).attr('ok');
		if (ok != true) {
			var watermark = this.param.watermark;
			var img = $(this.elem.object).attr('src');
			$(this.elem.object).css({
				"background-image": "url(" + img + ")"
			});
			$(this.elem.object).attr('src', watermark);
			$(this.elem.object).attr('ok', "1");
		}
	}
}
function d_d(elem, linkelem = false) {
	if (!linkelem) { linkelem2 = elem } else { linkelem2 = linkelem }
	$(linkelem2).css({
		"opacity": "1",
		"cursor": "pointer",
		"z-index": "9999"
	})
	var cc = $(linkelem2).attr("clickclack")
	if (cc != "1") {
		$(linkelem2).attr("clickclack", "1")
		$(linkelem2).css({
			"opacity": "0.5",
			"cursor": "move"
		})
		$(document).mousemove(function r(e) {
			var Px = e.pageX;
			var Py = e.pageY;
			var width2 = $(elem).width();
			var height2 = $(elem).height();
			var top = Py - height2 / 2;
			var left = Px - width2 / 2;
			$("[clickclack=\"1\"]").offset({
				"top": top,
				"left": left
			});
		});
	} else {
		$(linkelem2).attr("clickclack", "0");
		$(linkelem2).css({
			"opacity": "1",
			"cursor": "pointer"
		});
	}
}
function h_s(elem, linkelem = false) {
	let linkelem2;
	if (!linkelem) { linkelem2 = elem } else { linkelem2 = linkelem }
	$(linkelem2).css({
		"opacity": "1",
		"cursor": "pointer",
		"z-index": "9999",
		"-moz-user-select": "-moz-none",
		"-o-user-select": "none",
		"-khtml-user-select": "none",
		"-webkit-user-select": "none",
		"user-select": "none"
	})
	var h = $(linkelem2).attr("h")
	if (h != "1") {
		$(linkelem2).attr("h", "1")
		$(linkelem2).css({
			"opacity": "0.5",
			"cursor": "move",
			"-moz-user-select": "-moz-none",
			"-o-user-select": "none",
			"-khtml-user-select": "none",
			"-webkit-user-select": "none",
			"user-select": "none"
		})

		$(document).mousemove(function r(e) {
			var Px = e.pageX;
			var Py = e.pageY;
			var width2 = $(elem).width();
			var height2 = $(elem).height();
			var top = Py - height2 / 2;
			var left = Px - width2 / 2;
			$("[h=\"1\"]").offset({
				"top": top,
				"left": left
			});
			if ($(elem).attr("CreateRulle") == "1") {
			}
		});
	}
	$(document).mouseup(function y(e) {
		$(linkelem2).attr("h", "0");
		$(linkelem2).css({
			"opacity": "1",
			"z-index": "auto",
			"cursor": "pointer",
			"-moz-user-select": "-moz-none",
			"-o-user-select": "none",
			"-khtml-user-select": "none",
			"-webkit-user-select": "none",
			"user-select": "none"
		});
	});
}

function checkclik(elem) {
	var linkelem = $(elem).attr("linkelem");
	if (linkelem == false || linkelem == undefined) {
		var linkelem = elem
	}
	var h = $(elem).attr("cc");
	if (h == false || h == undefined) {
		$(elem).attr("cc", "1");
	} else {
		if (h == "1") {
			$(elem).attr("cc", "0");
		}
	}
	var h = $(elem).attr("cc");
	var classX = GodObj.classX;
	var class0 = $.trim($(elem).attr("class0"));
	var class1 = $.trim($(elem).attr("class1"));
	if (classX == class0 || classX == class1) {
		switch (h) {
			case "1":
				$(linkelem).attr("class", class0);

				break;
			case "0":
				$(linkelem).attr("class", class1);
				break;
		}
	} else {
		switch (h) {
			case "1":
				$(linkelem).attr("class", classX + " " + class0);

				break;
			case "0":
				$(linkelem).attr("class", classX + " " + class1);
				break;
		}
	}
}

function clear(elem) {
	$(elem).removeAttr("style");
}
function getFnName(fn) {
	return fn.toString().match(/function ([^(]*)\(/)[1];
}
