class rectTool extends abstractTool {
	attrs = {
		cursor: { icon: 'css/cursor/cube.cur', x: 0, y: 0 },
		hotkey: 'r',
		button: { icon: '<i class="far fa-square"></i>' }
	};
	Fields = [
		{ type: 'color', settings: 'color', value: '#ffffff', title: "Color", attrs: { class: "field-color" } },
		{ type: 'number', settings: 'corner|LD', value: '0', title: "LD corner", attrs: { class: "field-number", min: "0" } },
		{ type: 'number', settings: 'corner|LU', value: '0', title: "LU corner", attrs: { class: "field-number", min: "0" } },
		{ type: 'number', settings: 'corner|RD', value: '0', title: "RD corner", attrs: { class: "field-number", min: "0" } },
		{ type: 'number', settings: 'corner|RU', value: '0', title: "RU corner", attrs: { class: "field-number", min: "0" } },
	];
	draw(e) {
		rect(e.mX_start, e.mY_start, e.sX, e.sY, e.settings.corner.LU, e.settings.corner.RU, e.settings.corner.RD, e.settings.corner.LD);
	}
	draTool(x1, x2, y1, y2) {
		rect(x1, y1, round((x2 - x1) / gird_size) * gird_size, round((y2 - y1) / gird_size) * gird_size, settings.corner.LU, settings.corner.RU, settings.corner.RD, settings.corner.LD);
	}
}
