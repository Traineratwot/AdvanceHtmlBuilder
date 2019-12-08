var bg_color = 0;
var dra = false;
var mouseX_start = 0;
var mouseY_start = 0;
var mss = [];
var mcc = [];
var mci = [];
var mii = [];
var div = [];
var msd = [];
var stop = false;
var lp = 0;
var opty = false;
var tool_index = 0;
var selWH, sideWH;
const DZPX = 5;

function preload() {
    fullscreen_img = loadImage('js/lib/fullscreen.png');
    for (let i = 0; i < mii.length; i++) {
        mii[i].img = loadImage(mii[i].url)
    }
    //загрузка курсоров
    circle_cur = "css/cursor/O.cur";
    rect_cur = "css/cursor/cube.cur";
    image_cur = "css/cursor/image.cur";
    text_cur = "css/cursor/text.cur";
    handUP = "css/cursor/handUp.cur";
    handDown = "css/cursor/handDown.cur";
    UD = "css/cursor/aero_ns.cur";
    RL = "css/cursor/aero_ew.cur";
    DLUR = "css/cursor/aero_nesw.cur";
    URDL = "css/cursor/aero_nwse.cur";
}

function setup() {
    createCanvas(windowWidth / 2, windowHeight / 2);
    frameRate(120);
    update_div();
    ellipseMode(CORNER);
    angleMode(DEGREES);
    setInterval(() => {
        $("#fps").text(round(frameRate()));
    }, 200);
}

// if($.cookie('mss')){
// 	mss = $.cookie('mss');
// }
var fps;

function draw() {
    if (Number($("#gird_input").val()) <= 0) {
        gird_size = 1;
    } else {
        gird_size = Number($("#gird_input").val());
    }
    background(bg_color);
    stroke(50);
    strokeWeight(1);
    if (Number($("#gird_input").val()) > 0) {
        i = 0;
        for (; i < width; i += gird_size) {
            line(i, height, i, 0);
        }
        i = 0;
        for (; i < height; i += gird_size) {
            line(width, i, 0, i);
        }
    }
    var rxf, ryf, rw, rh
    var Gmode = ""
    var sg = $("#smooth-grid").prop("checked");
    //отрисовка mss 
    mss.forEach(function (item, key, arr) {
        fill(mss[key].color);
        if (key == selWH) {
            var mx = sg ? round((mouseX + mouseX_start) / gird_size) * gird_size : mouseX + mouseX_start;
            var my = sg ? round((mouseY + mouseY_start) / gird_size) * gird_size : mouseY + mouseY_start;
            var mx2 = sg ? round(mouseX / gird_size) * gird_size : mouseX;
            var my2 = sg ? round(mouseY / gird_size) * gird_size : mouseY;
            var rx = mss[key].mX_start;
            var ry = mss[key].mY_start;
            rw = mss[key].sX;
            rh = mss[key].sY;
            rxf = round(rx / gird_size) * gird_size
            ryf = round(ry / gird_size) * gird_size
            switch (mss[key].type) {
                case "rect":
                    switch (sideWH) {
                        case "up":
                            ry = my2;
                            rh = mss[selWH].mY_end - my2;
                            break;
                        case "down":
                            rh = my2 - mss[selWH].mY_start;
                            break;
                        case "left":
                            rx = mx2;
                            rw = mss[selWH].mX_end - mx2;
                            break;
                        case "right":
                            rw = mx2 - mss[selWH].mX_start;
                            break;
                        case "upleft":
                            rx = mx2;
                            ry = my2;
                            rw = mss[selWH].mY_end - mx2;
                            rh = mss[selWH].mX_end - my2;
                            break;
                        case "upright":
                            rx = my2;
                            rw = mx2 - mss[selWH].mX_start;
                            rh = mss[selWH].mY_end - my2;
                            break;
                        case "downleft":
                            rx = mx2;
                            rw = mss[selWH].mX_end - mx2;
                            rh = my2 - mss[selWH].mY_start;
                            break;
                        case "downright":
                            rw = mx2 - mss[selWH].mX_start;
                            rh = my2 - mss[selWH].mY_start;
                            break;
                        default:
                            rx = mx;
                            ry = my;
                            break;
                    }
                    rect(rx, ry, rw, rh, mss[key].settings.corner.LU, mss[key].settings.corner.RU, mss[key].settings.corner.RD, mss[key].settings.corner.LD);
                    stroke(0)
                    strokeWeight(2);
                    rxf = round(rx / gird_size) * gird_size
                    ryf = round(ry / gird_size) * gird_size
                    Gmode = "rect"
                    break;
                case "circle":
                    ellipse(mx, my, mss[key].sX, mss[key].sY);
                    rxf = round(mx / gird_size) * gird_size
                    ryf = round(my / gird_size) * gird_size
                    Gmode = "ellipse"
                    break;
                case "image":
                    image(mii[mss[key].index].img, mx, my, mss[key].sX, mss[key].sY);
                    rxf = round(mx / gird_size) * gird_size
                    ryf = round(my / gird_size) * gird_size
                    Gmode = "image"
                    break;
                default:
                    break;
            }
        } else {
            switch (mss[key].type) {
                case "rect":
                    rect(mss[key].mX_start, mss[key].mY_start, mss[key].sX, mss[key].sY, mss[key].settings.corner.LU, mss[key].settings.corner.RU, mss[key].settings.corner.RD, mss[key].settings.corner.LD);
                    break;
                case "circle":
                    ellipse(mss[key].mX_start, mss[key].mY_start, mss[key].sX, mss[key].sY);
                    break;
                case "image":
                    if (mii[mss[key].index]) {
                        image(mii[mss[key].index].img, mss[key].mX_start, mss[key].mY_start, mss[key].sX, mss[key].sY);
                    } else {
                        rect(mss[key].mX_start, mss[key].mY_start, mss[key].sX, mss[key].sY);
                    }
                    break;
                default:
                    break;
            }
        }
    });
    // отрисовка в real time
    if (dra) {
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
        switch (tool) {
            case "rect":
                rect(x1, y1, round((x2 - x1) / gird_size) * gird_size, round((y2 - y1) / gird_size) * gird_size, settings.corner.LU, settings.corner.RU, settings.corner.RD, settings.corner.LD);
                break;
            case "circle":
                ellipse(x1, y1, round((x2 - x1) / gird_size) * gird_size, round((y2 - y1) / gird_size) * gird_size);
                break;
            case "image":
                image(mii[tool_index].img, x1, y1, round((x2 - x1) / gird_size) * gird_size, round((y2 - y1) / gird_size) * gird_size);
                break;
            case "text":
                textSize(32);
                text("word word word word word word word word ", x1, y1, x2, y2);
                rect(x1, y1, round((x2 - x1) / gird_size) * gird_size, round((y2 - y1) / gird_size) * gird_size);
                break;
            default:
                break;
        }
        if (tool != "hand") {
            rxf = x1
            ryf = y1
            rw = x2 - x1
            rh = y2 - y1
            sg = true
            Gmode = "dra"
        }
    }
    if (Gmode != "") {
        stroke(0)
        fill(255)
        textAlign(CENTER, BOTTOM);
        text(rw, rxf + rw / 2, ryf)
        textAlign(RIGHT, CENTER)
        text(rh, rxf, ryf + rh / 2)
        text(ryf, rxf, ryf - 30)
        textAlign(RIGHT, BOTTOM)
        text(rxf, rxf - 20, ryf)
        stroke(255)
        strokeWeight(1);
        line(rxf, ryf, 0, ryf)
        line(rxf, ryf, rxf, 0)
        if (!sg) {
            fill(0, 0)
            stroke(255)
            strokeWeight(1)
            switch (Gmode) {
                case "rect":
                case "image":
                    rect(rxf, ryf, rw, rh)
                    break;
                case "ellipse":
                    ellipse(rxf, ryf, rw, rh)
                    break;
                default:
                    break;
            }
        }
    }
    if (lp == 30) {
        //noLoop();
        lp = 31;
    } else {
        lp++;
    }
    image(fullscreen_img, (width - 40), (height - 40));
}

function hand() {
    var i = mss.length - 1;
    for (; i >= 0; i--) {
        const element = mss[i];
        var res;
        var side = "";
        // console.log(element)
        if (mouseX >= element.mX_start && mouseX <= element.mX_end && mouseY >= element.mY_start && mouseY <= element.mY_end) {
            if (element.type == "circle") {
                if (!collidePointEllipse(mouseX, mouseY, element.mX_start, element.mY_start, element.sX, element.sY)) {
                    res = i;
                }
            } else {
                res = i;
            }
        }
        if (element.type == "rect" || element.type == "image") {
            if (mouseX >= element.mX_start - DZPX && mouseX <= element.mX_end + DZPX && abs(element.mY_start - mouseY) <= DZPX) {
                res = i;
                side += "up";
            }
            if (mouseX >= element.mX_start - DZPX && mouseX <= element.mX_end + DZPX && abs(element.mY_end - mouseY) <= DZPX) {
                res = i;
                side += "down";
            }
            if (mouseY >= element.mY_start - DZPX && mouseY <= element.mY_end + DZPX && abs(element.mX_start - mouseX) <= DZPX) {
                res = i;
                side += "left";
            }
            if (mouseY >= element.mY_start - DZPX && mouseY <= element.mY_end + DZPX && abs(element.mX_end - mouseX) <= DZPX) {
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

//"/09f4e9a096142be8.png"
function bg_c(x) {
    bg_color = x;
}

function mousePressed() {
    mouseX_start = round(mouseX / gird_size) * gird_size;
    mouseY_start = round(mouseY / gird_size) * gird_size;
    if (mouseX >= 0 && mouseY >= 0 && mouseX <= width && mouseY <= height) {
        dra = true;
        if (tool == "hand") {
            var mae = hand();
            selWH = mae.res;
            sideWH = mae.side;
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
                mouseX_start = mss[selWH].mX_start - mouseX;
                mouseY_start = mss[selWH].mY_start - mouseY;
            } else {
                dra = false
            }
            // console.log(selWH)
        }
        if (opty) {
            loop();
        }
    }
}

function mouseReleased() {
    if (mouseX > 0 && mouseY > 0 && mouseX < width && mouseY < height && dra) {
        if (tool == "hand") {
            if (selWH !== undefined) {
                switch (sideWH) {
                    case "up":
                        mss[selWH].mY_start = round(mouseY / gird_size) * gird_size;
                        mss[selWH].sY = mss[selWH].mY_end - mss[selWH].mY_start;
                        stop = false;
                        break;
                    case "down":
                        mss[selWH].mY_end = round(mouseY / gird_size) * gird_size;
                        mss[selWH].sY = mss[selWH].mY_end - mss[selWH].mY_start;
                        stop = false;
                        break;
                    case "left":
                        mss[selWH].mX_start = round(mouseX / gird_size) * gird_size;
                        mss[selWH].sX = mss[selWH].mX_end - mss[selWH].mX_start;
                        stop = false;
                        break;
                    case "right":
                        mss[selWH].mX_end = round(mouseX / gird_size) * gird_size;
                        mss[selWH].sX = mss[selWH].mX_end - mss[selWH].mX_start;
                        stop = false;
                        break;
                    case "upleft":
                        mss[selWH].mY_start = round(mouseY / gird_size) * gird_size;
                        mss[selWH].mX_start = round(mouseX / gird_size) * gird_size;
                        mss[selWH].sY = mss[selWH].mY_end - mss[selWH].mY_start;
                        mss[selWH].sX = mss[selWH].mX_end - mss[selWH].mX_start;
                        stop = false;
                        break;
                    case "upright":
                        mss[selWH].mY_start = round(mouseY / gird_size) * gird_size;
                        mss[selWH].sY = mss[selWH].mY_end - mss[selWH].mY_start;
                        mss[selWH].mX_end = round(mouseX / gird_size) * gird_size;
                        mss[selWH].sX = mss[selWH].mX_end - mss[selWH].mX_start;
                        stop = false;
                        break;
                    case "downleft":
                        mss[selWH].mY_end = round(mouseY / gird_size) * gird_size;
                        mss[selWH].sY = mss[selWH].mY_end - mss[selWH].mY_start;
                        mss[selWH].mX_start = round(mouseX / gird_size) * gird_size;
                        mss[selWH].sX = mss[selWH].mX_end - mss[selWH].mX_start;
                        stop = false;
                        break;
                    case "downright":
                        mss[selWH].mY_end = round(mouseY / gird_size) * gird_size;
                        mss[selWH].sY = mss[selWH].mY_end - mss[selWH].mY_start;
                        mss[selWH].mX_end = round(mouseX / gird_size) * gird_size;
                        mss[selWH].sX = mss[selWH].mX_end - mss[selWH].mX_start;
                        stop = false;
                        break;

                    default:
                        mss[selWH].mX_start = round((mouseX + mouseX_start) / gird_size) * gird_size;
                        mss[selWH].mY_start = round((mouseY + mouseY_start) / gird_size) * gird_size;
                        mss[selWH].mX_end = mss[selWH].mX_start + mss[selWH].sX;
                        mss[selWH].mY_end = mss[selWH].mY_start + mss[selWH].sY;
                        stop = false;
                        break;
                }
            }
        } else {
            var m = [];
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
            if (tool == "image") {
                m.index = tool_index;
            }
            m.settings = DeepCopy(settings);
            if (mss.length == 0) {
                m.name = "div";
            } else {
                m.name = "div" + mss.length;
            }
            m.color = settings.color;
            if (m.sX > 0 && m.sY > 0) {
                mss.push(m);
            }
        }
        update_div();
    }
    mouseX_start = -1;
    mouseY_start = -1;
    selWH = undefined;
    sideWH = "";
    dra = false;
    if (opty) {
        noLoop();
    }
}

function windowResized() {
    resizeCanvas(windowWidth / 2, windowHeight / 2);
}

function update_div(t = false, update = -1) {
    if (mss.length == 0) {
        $("#settings").fadeOut(0);
    } else {
        $("#settings").fadeIn(0);
    }
    // removeElements();
    create_tool();
    msd = {};
    $('#param').html('');
    for (key in mss) {
        var e = mss[key];
        switch (e.type) {
            case "image":
                img = '<i class="far fa-image"></i>';
                break;
            case "rect":
                img = '<i class="far fa-square"></i>';
                break;
            case "circle":
                img = '<i class="far fa-circle"></i>';
                break;
            case "hand":
                img = '<i class="far fa-circle"></i>';
                break;
            default:
                break;
        }
        create_div(key, img)
    }
    if ($("textarea").is("#html_editor")) {
        $("#html_editor").detach();
    }
    if ($("textarea").is("#css_editor")) {
        $("#css_editor").detach();
    }
    localStorage.setItem("mss", arr2obj2json(mss, true));
    var mii_ex = [];
    for (let i = 0; i < mii.length; i++) {
        mii_ex[i] = []
        mii_ex[i].url = mii[i].url;
    }
    localStorage.setItem("mii", arr2obj2json(mii_ex, true));
    delete mii_ex;

    if (!opty || t) {
        create();
    }
}

function myInputEvent() {
    var type = this.type;
    var key = this.key;
    var set = this.set;
    var val = this.value();
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

function chlenInputEvent(self) {

    var type = $(self).attr('data-type');
    var key = parseInt($(self).parent('td').parent('tr')[0].id.replace(/[^\d]/g, ''))
    var set = $(self).attr('data-set');
    var val = $(self).val();
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
    var val = t.val();
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

function Pressed_button(self) {
    var type = $(self).attr('data-type');
    var key = parseInt($(self).parent('td').parent('tr')[0].id.replace(/[^\d]/g, ''))
    switch (type) {
        case "^":
            if (key > 0) {
                var s = mss[key];
                mss[key] = mss[key - 1];
                mss[key - 1] = s;
            }
            break;
        case "x":
        case "X":
            mcc.push(mss[key]);
            if (mss[key].type == "image") {
                mci[mss.index] = mii[mss.index];
                mii.splice(mss.index, 1)
            }
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
        if (mss[mss.length - 1].type == "image") {
            mci[mss[mss.length - 1].index] = mii[mss[mss.length - 1].index]
            mii.pop()
        }
        mss.pop();
    }
    update_div();
}

function redo() {
    if (mcc.length > 0) {
        mss.push(mcc[mcc.length - 1]);
        if (mcc[mcc.length - 1].type == "image") {
            mii[mcc[mcc.length - 1].index] = mci[mcc[mcc.length - 1].index];
            mci.pop()
        }
        mcc.pop();
    }
    update_div();
}
var last_mss = [];

function create() {
    if (opty) {
        draw();
    }
    var type = $(".create_type:checked").val();
    $(".raw").html("");
    $("#prew_html").html("");
    $("#prew_css").html("");
    $(".style").html("");
    var child_DOM = $("#child_DOM").prop("checked");
    var use_vars = !$("#use_vars").prop("checked");
    var style = "";
    var first = [];
    var div0
    var style_data = "";
    if (use_vars) {
        var vars_str = ":root{";
        var vars = {};
    }
    mss.forEach(function (val, i, arr) {
        switch (child_DOM) {
            case true:
                if (i == 0) {
                    style = "." + val.name + "{";
                } else {
                    style = "." + arr[0].name + " :nth-child(" + i + "){";
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
                        $("<div>", {
                            class: "test " + val.name
                        }).appendTo(".raw");
                        div0 = "." + val.name + "{top:" + val.mY_start + "px;left:" + val.mX_start + "px;}";
                    } else {
                        $("<div>", {
                            class: "test " + val.name
                        }).appendTo(".raw");
                        div0 = "." + val.name + " {top:" + val.mY_start + "px;left:" + val.mX_start + "px;}";
                    }
                } else {
                    if (child_DOM) {
                        $("<div>", {
                            class: "test " + val.name
                        }).appendTo("." + first.name);
                    } else {
                        $("<div>", {
                            class: "test " + val.name
                        }).appendTo("." + first.name);
                    }
                    var left2 = val.mX_start - first.mX_start;
                    var top2 = val.mY_start - first.mY_start;
                    var left = (left2 / first.sX) * 100;
                    var top = (top2 / first.sY) * 100;
                    var w = (val.sX / first.sX) * 100;
                    var h = (val.sY / first.sY) * 100;
                    if (child_DOM) {
                        style = "." + arr[0].name + " :nth-child(" + i + "){";
                    } else {
                        style = "." + arr[0].name + " ." + val.name + "{";
                    }
                    if (use_vars) {
                        w = w.toFixed();
                        h = h.toFixed();
                        top = top.toFixed();
                        left = left.toFixed();
                        vars["width" + w] = w + "%";
                        vars["height" + h] = h + "%";
                        vars["top" + top] = top + "%";
                        vars["left" + left] = left + "%";
                        style += "position: absolute; width: var(--width" + w + ");  height: var(--height" + h + "); top: var(--top" + top + ");left: var(--left" + left + ");";
                    } else {
                        style += "position: absolute; width: " + w + "%;  height:" + h + "%; top:" + top + "%;left:" + left + "%;";
                    }
                }
                break;
            case "px":
                if (i == 0) {
                    style += "position: relative; width: " + val.sX + "px;  height:" + val.sY + "px;";
                    first = val;
                    if (child_DOM) {
                        $("<div>", {
                            class: "test " + val.name
                        }).appendTo(".raw");
                        div0 = "." + val.name + "{top:" + val.mY_start + "px;left:" + val.mX_start + "px;}";
                    } else {
                        $("<div>", {
                            class: "test " + val.name
                        }).appendTo(".raw");
                        div0 = "." + val.name + " {top:" + val.mY_start + "px;left:" + val.mX_start + "px;}";
                    }
                } else {
                    if (child_DOM) {
                        $("<div>", {
                            class: "test " + val.name
                        }).appendTo("." + first.name);
                    } else {
                        $("<div>", {
                            class: "test " + val.name
                        }).appendTo("." + first.name);
                    }
                    var left = val.mX_start - first.mX_start;
                    var top = val.mY_start - first.mY_start;
                    if (use_vars) {
                        w = val.sX.toFixed();
                        h = val.sY.toFixed();
                        top = top.toFixed();
                        left = left.toFixed();
                        vars["width" + w] = w + "px";
                        vars["height" + h] = h + "px";
                        vars["top" + top] = top + "px";
                        vars["left" + left] = left + "px";
                        style += "position: absolute; width: var(--width" + w + ");  height: var(--height" + h + "); top: var(--top" + top + ");left: var(--left" + left + ");";
                    } else {
                        style += "position: absolute; width: " + val.sX + "px;  height:" + val.sY + "px; top:" + top + "px;left:" + left + "px;";
                    }
                }
                break;
            case "m":
                if (i == 0) {
                    style += "width: " + val.sX + "px;  height:" + val.sY + "px;";
                    first = val;
                    if (child_DOM) {
                        $("<div>", {
                            class: "test " + val.name
                        }).appendTo(".raw");
                        div0 = "." + val.name + "{top:" + val.mY_start + "px;left:" + val.mX_start + "px; position: relative;}";
                    } else {
                        $("<div>", {
                            class: "test " + val.name
                        }).appendTo(".raw");
                        div0 = "." + val.name + " {top:" + val.mY_start + "px;left:" + val.mX_start + "px; position: relative;}";
                    }
                } else {
                    if (child_DOM) {
                        $("<div>", {
                            class: "test " + val.name
                        }).appendTo("." + first.name);
                    } else {
                        $("<div>", {
                            class: "test " + val.name
                        }).appendTo("." + first.name);
                    }
                    var left = val.mX_start - first.mX_start;
                    var top = val.mY_start - first.mY_start;
                    if (use_vars) {
                        vars["width" + val.sX] = val.sX + "px";
                        vars["height" + val.sY] = val.sY + "px";
                        vars["top" + top] = top + "px";
                        vars["left" + left] = left + "px";
                        style += "position: absolute; width: var(--width" + val.sX + ");  height: var(--height" + val.sY + "); margin: var(--top" + top + ") auto auto var(--left" + left + ");";
                    } else {
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
                if (o.LU == 0 && o.RU == 0 && o.RD == 0 && o.LD == 0) { } else {
                    style += "border-radius: " + o.LU + "px " + o.RU + "px " + o.RD + "px " + o.LD + "px;";
                }
                break;
            case "circle":
                style += "border-radius: 50%;";
                break;
            case "image":
                if (mii[val.index]) {
                    style += "background-image: url(" + mii[val.index].url + ");background-repeat: no-repeat;background-size: contain;";
                }
                break;
            default:
                break;
        }
        if (val.color != "#ffffff") {
            if (use_vars) {
                vars["color-" + i] = val.color;
                style += "background-color:var(--color-" + i + ");";
            } else {
                style += "background-color:" + val.color + ";";
            }
        }
        style += "}";
        style_data += style;
        $("#div0").html("");
        $("#div0").html(div0);
        style = "";
    });
    if (use_vars) {
        jQuery.each(vars, function (i, val) {
            vars_str += "\n--" + i + ":" + val + ";";
        });
        vars_str += "}";
        style_data = vars_str + "\n" + style_data;
    }

    $(".style").html(style_data);
    $("#prew_html").text($(".raw").html());
    $("#prew_css").text($(".style").html());
    $("pre code").each(function (index, element) {
        hljs.highlightBlock(element);
    });
    $(".hljs-tag").each(function (index, element) {
        this.after("\n");
    });
    $(".hljs-attribute").each(function (index, element) {
        this.before("\n");
    });
    $(".hljs-selector-class").each(function (index, element) {
        if (index == 0) { } else {
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
    localStorage.setItem("mss", arr2obj2json(mss, true));
    var mii_ex = [];
    for (let i = 0; i < mii.length; i++) {
        mii_ex[i] = []
        mii_ex[i].url = mii[i].url;
    }
    localStorage.setItem("mii", arr2obj2json(mii_ex, true));
    delete mii_ex
    return true;
}
if (localStorage.mss) {
    mss = json2obj2arr(localStorage.mss, true);
    mii = json2obj2arr(localStorage.mii, true);
    update_div();
}