class handTool extends abstractTool {
	attrs = {
		cursor: { icon: 'css/cursor/handUp.cur', x: 16, y: 16 },
		hotkey: 'c',
		button: { icon: '<i class="far fa-circle"></i>' }
	};
	Fields = [
		// { type: 'color', settings: 'color', value: '#ffffff', title: "Color", attrs: { class: "field-color" } },
	];
	mousePressed(x, y){
		var {res, side} = this.hand(x, y);
		selWH = res
		sideWH = side
		if (selWH !== undefined) {
			switch (sideWH) {
				case "up":
				case "down":
					stop = true;
					cursor(UD, 5, 11);
					break;
				case "right":
				case "left":
					stop = true;
					cursor(RL, 11, 5);
					break;
				case "upright":
				case "downleft":
					stop = true;
					cursor(DLUR, 8, 8);
					break;
				case "downright":
				case "upleft":
					stop = true;
					cursor(URDL, 8, 8);
					break;

				default:
					stop = true;
					cursor(handDown, 12, 12);
					break;
			}
			mouseX_start = mss[selWH].mX_start - x;
			mouseY_start = mss[selWH].mY_start - y;
		} else {
			dra = false
		}
	}

	hand(x, y) {
		for (const i in mss) {
			const e = mss[i];
			var res;
			var side = "";
			if (x >= e.mX_start && x <= e.mX_end && y >= e.mY_start && y <= e.mY_end) {
				if (e.type == "circle") {
					if (!collidePointEllipse(x, y, e.mX_start, e.mY_start, e.sX, e.sY)) {
						res = i;
					}
				} else {
					res = i;
				}
			}
			if (e.type == "rect" || e.type == "image") {
				if (x >= e.mX_start - DZPX && x <= e.mX_end + DZPX && abs(e.mY_start - y) <= DZPX) {
					res = i;
					side += "up";
				}
				if (x >= e.mX_start - DZPX && x <= e.mX_end + DZPX && abs(e.mY_end - y) <= DZPX) {
					res = i;
					side += "down";
				}
				if (y >= e.mY_start - DZPX && y <= e.mY_end + DZPX && abs(e.mX_start - x) <= DZPX) {
					res = i;
					side += "left";
				}
				if (y >= e.mY_start - DZPX && y <= e.mY_end + DZPX && abs(e.mX_end - x) <= DZPX) {
					res = i;
					side += "right";
				}
			}
			if (res !== undefined) {
				return {
					res,
					side
				};
			}
		}
		return {
			res: undefined,
			side: ""
		};
	}
}
