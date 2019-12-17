class circleTool extends abstractTool {
	attrs = {
		cursor: { icon: 'css/cursor/O.cur', x: 0, y: 0 },
		hotkey: 'c',
		button: { icon: '<i class="far fa-circle"></i>' }
	};
	Fields = [
		{ type: 'color', settings: 'color', value: '#ffffff', title: "Color", attrs: { class: "field-color" } },
	];
	draw(e) {
		ellipse(e.mX_start, e.mY_start, e.sX, e.sY);
	}
	draTool(x1, x2, y1, y2) {
		ellipse(x1, y1, round((x2 - x1) / gird_size) * gird_size, round((y2 - y1) / gird_size) * gird_size);
	}
}
