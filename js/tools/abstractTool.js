class abstractTool {
	constructor() {
		this.name = this.constructor.name.replace('Tool', '');
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
				var cls = "tool_active";
			}
			else {
				var cls = "";
			}
			string += `<li class="tooltip top" data-title="${e.attrs.hotkey}"><button class="${cls}" id="${key}"onclick="tool_change('${key}')">${e.attrs.button.icon}</button></li>`;
		}
		$('#lool_list').html(string);
	}
	explode(string, obj = settings) {
		var set = string.split('|');
		var value = obj;
		for (const j of set) {
			value = value[j];
		}
		return value;
	}
	displayField() {
		var string = "<td>";
		for (const e of this.Fields) {
			var value = this.explode(e.settings);
			if (typeof value == "undefined") {
				value = e.value;
			}
			string += `<input value="${value}" type="${e.type}" data-help data-settings="${e.settings}"`;
			for (const key in e.attrs) {
				string += `${key}="${e.attrs[key]}"`;
			}
			string += ">";
		}
		string += "</td>";
		$('#tool_settings').html(string);
		$('#tool_settings td input').on('input', function () {
			var $settings = $(this).attr('data-settings');
			var set = $settings.split('|');
			var value = settings;
			var adr;
			for (let i = 0; i < set.length; i++) {
				if (i == set.length - 1) {
					adr = set[i];
					break;
				}
				value = value[set[i]];
			}
			switch ($(this).attr('type')) {
				case 'number':
					value[adr] = parseInt($(this).val());
					break;
				default:
					value[adr] = $(this).val();
					break;
			}
		});
	}
	create_div(msk, key) {
		var string = "";
		var index = 0;
		for (const e of this.Fields) {
			var value = this.explode(e.settings, msk.settings);
			if (typeof value == "undefined") {
				value = e.value;
			}
			string += `<td><input value="${value}" id="${key + index}" data-key="${key}" type="${e.type}" data-settings="${e.settings}"`;
			for (const key in e.attrs) {
				string += `${key}="${e.attrs[key]}"`;
			}
			string += "></td>";
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
		}
		else {
			x1 = round(mouseX / gird_size) * gird_size;
			x2 = mouseX_start;
		}
		if (mouseY_start < mouseY) {
			y1 = mouseY_start;
			y2 = round(mouseY / gird_size) * gird_size;
		}
		else {
			y1 = round(mouseY / gird_size) * gird_size;
			y2 = mouseY_start;
		}
		this.draTool(x1, x2, y1, y2);
	}
	switchTool() {
		this.displayField();
		var { icon, x, y } = this.attrs.cursor;
		cursor(icon, x, y);
		$(".tool_active").removeClass("tool_active");
		$("#" + tool).addClass("tool_active");
	}
	static regTool(name, obj) {
		TOOLS[name] = obj;
	}
	mousePressed(x, y) {
		mouseX_start = round(x / gird_size) * gird_size
		mouseY_start = round(y / gird_size) * gird_size
	}
	draw() {return false}
	draTool() {return false}
}
