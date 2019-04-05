(function(__global__) {

    let GA = {};
    let Util = {};

    Util.decToHex = (val) => { 
        var hex = Number(val).toString(16);
        while (hex.length < 2) {
             hex = "0" + hex;
        }
        return hex;
    }

    Util.rgbToHex = (r, g, b) => {
        let rh = Util.decToHex(Math.round(r));
        let gh = Util.decToHex(Math.round(g));
        let bh = Util.decToHex(Math.round(b));
        return "#" + rh + gh + bh;
    }

    // https://github.com/aioutecism/Color.js/blob/master/src/Color.js
    Util.parseRGBA = (color) => {
        let r, g, b, a = 1;
    
        if (typeof color === 'string' && color.match(/^rgb\(\d+\s*,\s*\d+\s*,\s*\d+\s*\)$/i)) {
            const matches = color.match(/rgb\((\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*\)/i)
            r = matches[1];
            g = matches[2];
            b = matches[3];
        }
        else if (typeof color === 'string' && color.match(/^rgba\(\d+\s*,\s*\d+\s*,\s*\d+\s*,\s*(0|1|0\.\d+)\s*\)$/i)) {
            const matches = color.match(/rgba\((\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*,\s*(0|1|0\.\d+)\s*\)/i)
            r = matches[1];
            g = matches[2];
            b = matches[3];
            a = matches[4];
        }
    
        if (r === undefined || g === undefined || b === undefined || a === undefined) {
            return;
        }
    
        r = parseInt(r, 10);
        g = parseInt(g, 10);
        b = parseInt(b, 10);
        a = parseFloat(a) * 255;
    
        return {
            r: r,
            g: g,
            b: b,
            a: a
        }
    }

    Util.parseHex = (color) => {
        if (!color.match(/^#([0-9a-f]{6}|[0-9a-f]{8})$/i)) {
            return;
        }
    
        color = color.replace(/^#/, '');
    
        const convert = (single) => {
            return parseInt(single, 16);
        };
    
        const r = convert(color.substr(0, 2));
        const g = convert(color.substr(2, 2));
        const b = convert(color.substr(4, 2));
        const a = convert(color.substr(6, 2) || 'FF');
    
        return {
            r: r,
            g: g,
            b: b,
            a: a
        }
    };
    

    Util.fixColor = (arg1, arg2, arg3, arg4) => {
        let col;
        let opacity;
        if (arg1 instanceof Array) {
            col = Util.rgbToHex(arg1[0], arg1[1], arg1[2]);
            if (typeof arg1[3] == "number") {
                opacity = arg1[3] / 255;
            } else {
                opacity = 1;
            }
        } else if (typeof arg1 == "object") {
            col = Util.rgbToHex(arg1.r, arg1.g, arg1.b);
            if (typeof arg1.a == "number") {
                opacity = arg1.a / 255;
            } else {
                opacity = 1;
            }
        } else if (typeof arg4 == "number") {
            col = Util.rgbToHex(arg1, arg2, arg3);
            opacity = arg4 / 255;
        } else if (typeof arg3 == "number") {
            col = Util.rgbToHex(arg1, arg2, arg3);
            opacity = 1;
        } else if (typeof arg2 == "number") {
            col = Util.rgbToHex(arg1, arg1, arg1);
            opacity = arg2 / 255;
        } else if (typeof arg1 == "number") {
            col = Util.rgbToHex(arg1, arg1, arg1);
            opacity = 1;
        } else {
            let parsedAsRGBA = Util.parseRGBA(arg1);
            let parsedAsHex = Util.parseHex(arg1);
            
            if (parsedAsRGBA != undefined) {
                col = Util.rgbToHex(parsedAsRGBA.r, parsedAsRGBA.g, parsedAsRGBA.b);
                opacity = parsedAsRGBA.a / 255;
            } else if (parsedAsHex != undefined) {
                col = Util.rgbToHex(parsedAsHex.r, parsedAsHex.g, parsedAsHex.b);
                opacity = parsedAsHex.a / 255;
            } else {
                col = arg1;
                opacity = 1;
            }
        }

        return {color: col, opacity: opacity};
    }

    GA.Canvas = class Canvas {
        constructor(arg1, arg2, arg3) {
            if (typeof arg1 == "object") {
                this.parent = arg1;
                if (typeof arg3 == "number") {
                    this.width = arg2;
                    this.height = arg3;
                } else {
                    this.width = arg2;
                    this.height = arg2;
                }
            } else {
                this.parent = document.body;
                if (typeof arg2 == "number") {
                    this.width = arg1;
                    this.height = arg2;
                } else {
                    this.width = arg1;
                    this.height = arg1;
                }
            }

            this.element = document.createElement("div");

            this.element.style.margin = "auto auto";
            this.element.style.width = this.width;
            this.element.style.height = this.height + 24;
            this.element.style.backgroundColor = "#ffffff";
            this.element.style.borderRadius = "6px";
            this.element.style.boxShadow = "0px 8px 24px #00000022";

            this.element.innerHTML = `<svg width="${this.width}" height="${this.height}" style='margin: 0px'></svg>
            <div style="width: ${this.width}; height: 24; background-color: #f5f5f5;">
                <span style="font-family: Roboto; font-size: 12; user-select: none; margin: 6px;">Download (SVG)</span>
                <span style="font-family: Roboto; font-size: 12; user-select: none; margin: 6px;">Download (PNG)</span>
                <span style="font-family: Roboto; font-size: 12; user-select: none; margin: 6px;">Reload</span>
            </div>`;

            var link = document.createElement("link");
            link.setAttribute("rel", "stylesheet");
            link.setAttribute("type", "text/css");
            link.setAttribute("href", "https://fonts.googleapis.com/css?family=Roboto");
            this.element.appendChild(link);

            this.parent.appendChild(this.element);

            this.svg = this.element.childNodes[0];
            this.svgManager = new Util.SVGManager(this.svg, this);

            this.downloadSVGSpan = this.element.childNodes[2].childNodes[1];

            this.downloadSVGSpan.onclick = (evt) => {
                this.download();
            }

            this.downloadPNGSpan = this.element.childNodes[2].childNodes[3];

            this.downloadPNGSpan.onclick = (evt) => {
                this.downloadAsPNG();
            }

            this.reloadSpan = this.element.childNodes[2].childNodes[5];

            this.reloadSpan.onclick = (evt) => {
                this.generate();
            }

            this.generate();
        }

        download() {
            let serializer = new XMLSerializer();
            let source = serializer.serializeToString(this.svg);

            if (!source.match(/^<svg[^>]+xmlns="http\:\/\/www\.w3\.org\/2000\/svg"/)) {
                source = source.replace(/^<svg/, '<svg xmlns="http://www.w3.org/2000/svg"');
            }
            if (!source.match(/^<svg[^>]+"http\:\/\/www\.w3\.org\/1999\/xlink"/)) {
                source = source.replace(/^<svg/, '<svg xmlns:xlink="http://www.w3.org/1999/xlink"');
            }

            source = '<?xml version="1.0" standalone="no"?>\r\n' + source;

            let url = "data:image/svg+xml;charset=utf-8," + encodeURIComponent(source);

            let link = document.createElement("a");
            link.href = url;
            link.download = "generated art.svg";

            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        }
        
        downloadAsPNG() {
            let serializer = new XMLSerializer();
            let source = serializer.serializeToString(this.svg);

            if (!source.match(/^<svg[^>]+xmlns="http\:\/\/www\.w3\.org\/2000\/svg"/)) {
                source = source.replace(/^<svg/, '<svg xmlns="http://www.w3.org/2000/svg"');
            }
            if (!source.match(/^<svg[^>]+"http\:\/\/www\.w3\.org\/1999\/xlink"/)) {
                source = source.replace(/^<svg/, '<svg xmlns:xlink="http://www.w3.org/1999/xlink"');
            }

            source = '<?xml version="1.0" standalone="no"?>\r\n' + source;

            let url = "data:image/svg+xml;charset=utf-8," + encodeURIComponent(source);

            let img = new Image();

            img.onload = function () {
                var canvas = document.createElement('canvas');
                canvas.width = this.width; // or 'width' if you want a special/scaled size
                canvas.height = this.height; // or 'height' if you want a special/scaled size
        
                canvas.getContext('2d').drawImage(img, 0, 0);
        
                // Get raw image data
                let link = document.createElement("a");
                link.href = canvas.toDataURL("image/png");
                link.download = "generated art.png";

                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
            };

            img.src = url;
        }

        generate() {
            setTimeout(() => {
                this.svg.innerHTML = "";

                if (typeof generate == "function") {
                    generate();
                } else if (typeof this.genFunction == "function") {
                    this.genFunction();
                }
            }, 1);
        }

        onGenerate(func) {
            this.genFunction = func;
        }

        globalMode() {
            this.svgManager.globalMode();
        }

        global() {
            this.svgManager.globalMode();
        }
    }

    let drawingFunctions = ["clear", "background", "fill", "noFill", "stroke", "noStroke", "strokeWeight", "circle", "ellipse", "square", "rect", "line", "polyline", "polygon", "perfectPolygon", "bezierCurve", "multiCurve", "closedCurve", "pushStyle", "popStyle", "pushMatrix", "popMatrix", "translate", "rotate", "scale", "skewX", "skewY"];

    Util.SVGManager = class SVGManager {
        constructor(element, canvas) {
            this.element = element;
            this.canvas = canvas;

            let self = this;
            for (let funcName of drawingFunctions) {
                this.canvas[funcName] = function() {
                    self[funcName](...arguments);
                }
            }
            
            this.style = {
                fillColor: "#7F7F7F",
                fillOpacity: 100,
                strokeColor: "#000000",
                strokeOpacity: 100,
                strokeWeight: 1
            };

            this.styleSaves = [];

            this.transform = "";

            this.transformSaves = [];
        }

        globalMode() {
            let self = this;
            for (let funcName of drawingFunctions) {
                __global__[funcName] = function() {
                    self[funcName](...arguments);
                }
            }
        }

        addShape(elt) {
            elt.setAttributeNS(null, "style", `fill: ${this.style.fillColor}; fill-opacity: ${this.style.fillOpacity}; stroke: ${this.style.strokeColor}; stroke-opacity: ${this.style.strokeOpacity}; stroke-width: ${this.style.strokeWeight};`);
            if (this.transform != "") {
                elt.setAttributeNS(null, "transform", this.transform);
            }
            this.element.appendChild(elt);
        }

        clear() {
            this.element.innerHTML = "";
        }

        background(arg1, arg2, arg3, arg4) {
            this.noStroke();
            this.fill(arg1, arg2, arg3, arg4);
            this.rect(this.canvas.width / 2, this.canvas.height / 2, this.canvas.width, this.canvas.height);
        }

        fill(arg1, arg2, arg3, arg4) {
            let fixed = Util.fixColor(arg1, arg2, arg3, arg4);
            this.style.fillColor = fixed.color;
            this.style.fillOpacity = fixed.opacity;
        }

        stroke(arg1, arg2, arg3, arg4) {
            let fixed = Util.fixColor(arg1, arg2, arg3, arg4);
            this.style.strokeColor = fixed.color;
            this.style.strokeOpacity = fixed.opacity;
        }

        noStroke() {
            this.stroke(0, 0);
        }

        noFill() {
            this.fill(0, 0);
        }

        strokeWeight(weight) {
            this.style.strokeWeight = weight;
        }

        pushStyle() {
            let copy = {};
            for (let i in this.style) {
                copy[i] = this.style[i];
            }
            this.styleSaves.push(copy);
        }

        popStyle() {
            this.style = this.styleSaves.pop();
        }

        pushMatrix() {
            this.transformSaves.push(this.transform);
        }

        popMatrix() {
            this.transform = this.transformSaves.pop();
        }

        translate(x, y) {
            if (y != undefined) {
                this.transform += `translate(${x}, ${y}) `;
            } else {
                this.transform += `translate(${x}) `;
            }
        }

        rotate(angle, cx, cy) {
            if (cx != undefined) {
                this.transform += `rotate(${angle}, ${cx}, ${cy}) `;
            } else {
                this.transform += `rotate(${angle}) `;                
            }
        }

        scale(x, y) {
            if (y != undefined) {
                this.transform += `scale(${x}, ${y}) `;
            } else {
                this.transform += `scale(${x}) `;
            }
        }

        skewX(angle) {
            this.transform += `skewX(${angle}) `;
        }

        skewY(angle) {
            this.transform += `skewY(${angle}) `;
        }
        
        circle(x, y, radius) {
            let elt = document.createElementNS("http://www.w3.org/2000/svg", "circle");
            elt.setAttributeNS(null, "cx", x);
            elt.setAttributeNS(null, "cy", y);
            elt.setAttributeNS(null, "r", radius);
            this.addShape(elt);
        }

        ellipse(x, y, rx, ry) {
            let elt = document.createElementNS("http://www.w3.org/2000/svg", "ellipse");
            elt.setAttributeNS(null, "cx", x);
            elt.setAttributeNS(null, "cy", y);
            elt.setAttributeNS(null, "rx", rx);
            elt.setAttributeNS(null, "ry", ry);
            this.addShape(elt);
        }

        rect(x, y, width, height) {
            let elt = document.createElementNS("http://www.w3.org/2000/svg", "rect");
            elt.setAttributeNS(null, "x", x - width / 2);
            elt.setAttributeNS(null, "y", y - height / 2);
            elt.setAttributeNS(null, "width", width);
            elt.setAttributeNS(null, "height", height);
            this.addShape(elt);
        }

        square(x, y, size) {
            this.rect(x, y, size, size);
        }

        line(x1, x2, y1, y2) {
            let elt = document.createElementNS("http://www.w3.org/2000/svg", "line");
            elt.setAttributeNS(null, "x1", x1);
            elt.setAttributeNS(null, "y1", y1);
            elt.setAttributeNS(null, "x2", x2);
            elt.setAttributeNS(null, "y2", y2);
            this.addShape(elt);
        }

        polyline(pts) {
            let elt = document.createElementNS("http://www.w3.org/2000/svg", "polyline");

            let str = "";

            for (let index in pts) {
                let pt = pts[index];
                if (pt instanceof Array) {
                    str += `${pt[0]} ${pt[1]}`;
                } else {
                    str += `${pt.x} ${pt.y}`; 
                }
                if (index != pts.length - 1) {
                    str += ", "
                }
            }

            elt.setAttributeNS(null, "points", str);
            this.addShape(elt);
        }

        polygon(pts) {
            let elt = document.createElementNS("http://www.w3.org/2000/svg", "polygon");

            let str = "";

            for (let index in pts) {
                let pt = pts[index];
                if (pt instanceof Array) {
                    str += `${pt[0]} ${pt[1]}`;
                } else {
                    str += `${pt.x} ${pt.y}`; 
                }
                if (index != pts.length - 1) {
                    str += ", "
                }
            }

            elt.setAttributeNS(null, "points", str);
            this.addShape(elt);
        }

        perfectPolygon(x, y, radius, pts, rot) {
            let points = [];

            let currentRot = rot || 0;
            for (let i = 0; i < pts; i++) {
                points.push([
                    Math.sin(currentRot) * radius + x,
                    Math.cos(currentRot) * radius + y
                ]);
                currentRot += Math.PI * 2 / pts;
            }

            this.polygon(points);
        }

        bezierCurve(pts) {
            let elt = document.createElementNS("http://www.w3.org/2000/svg", "path");

            let d = "";

            for (let index in pts) {
                let pt = pts[index];
                let fixedPt = [];
                if (pt instanceof Array) {
                    fixedPt = pt;
                } else {
                    fixedPt = [pt.x, pt.y]; 
                }
                if (index == 0) {
                    d += `M ${pt[0]} ${pt[1]} ${pts.length == 4 ? "C" : "Q"} `;
                } else {
                    d += `${pt[0]} ${pt[1]}`;
                    if (index != pts.length - 1) {
                        d += ", "
                    }
                }
            }

            elt.setAttributeNS(null, "d", d);

            this.addShape(elt);
        }

        multiCurve(pts) {
            let elt = document.createElementNS("http://www.w3.org/2000/svg", "path");

            let fixedPts = [];
            for (let pt of pts) {
                let fixedPt;
                if (pt instanceof Array) {
                    fixedPt = pt;
                } else {
                    fixedPt = [pt.x, pt.y]; 
                }
                fixedPts.push(fixedPt);
            }

            let d = "";

            d += `M ${fixedPts[0][0]} ${fixedPts[0][1]} `;

            for (let index = 1; index < fixedPts.length - 2; index++) {
                let a = fixedPts[index];
                let b = fixedPts[index + 1];

                let midPt = [(a[0] + b[0]) / 2, (a[1] + b[1]) / 2];

                d += `Q ${a[0]} ${a[1]}, ${midPt[0]} ${midPt[1]} `;
            }

            let len = fixedPts.length;

            d += `Q ${fixedPts[len - 2][0]} ${fixedPts[len - 2][1]}, ${fixedPts[len - 1][0]} ${fixedPts[len - 1][1]}`;

            elt.setAttributeNS(null, "d", d);

            this.addShape(elt);
        }

        closedCurve(pts) {
            let elt = document.createElementNS("http://www.w3.org/2000/svg", "path");

            let fixedPts = [];
            for (let pt of pts) {
                let fixedPt;
                if (pt instanceof Array) {
                    fixedPt = pt;
                } else {
                    fixedPt = [pt.x, pt.y]; 
                }
                fixedPts.push(fixedPt);
            }

            let d = "";

            let startA = fixedPts[0];
            let startB = fixedPts[fixedPts.length - 1];

            let startMidPt = [(startA[0] + startB[0]) / 2, (startA[1] + startB[1]) / 2];

            d += `M ${startMidPt[0]} ${startMidPt[1]} `;

            for (let index = 0; index < fixedPts.length; index++) {
                let a = fixedPts[index];
                let b = fixedPts[(index + 1) % fixedPts.length];

                let midPt = [(a[0] + b[0]) / 2, (a[1] + b[1]) / 2];

                d += `Q ${a[0]} ${a[1]}, ${midPt[0]} ${midPt[1]} `;
            }

            elt.setAttributeNS(null, "d", d);

            this.addShape(elt);
        }
    }

    GA.canvas = function(arg1, arg2, arg3) {
        return new GA.Canvas(arg1, arg2, arg3);
    }

    GA.random = function(arg1, arg2) {
        if (arg1 instanceof Array) {
            return arg1[Math.floor(GA.random(arg1.length))];
        } else if (typeof arg2 == "number") {
            return Math.random() * (arg2 - arg1) + arg1;
        } else if (typeof arg1 == "number") {
            return Math.random() * arg1;
        } else {
            return Math.random();
        }
    }

    __global__.GA = GA;
})(window);

/*
Drawing functions:

circle(x, y, radius) // Draw a circle
ellipse(x, y, radiusx, radiusy) // draw an ellipse
square(x, y, size) // draw a square
rect(x, y, width, height) // draw a rectangle
line(x1, y1, x2, y2) // draw a line
polyline(list of x/y points) // draw a polyline
polygon(list of x/y points) // draw a polygon (closed)
perfectPolygon(x, y, radius, vertices, [rotation]) // draw a perfect polygon (all edge lengths and angles are the same)
bezierCurve(list of x/y points) // draw a quadratic or cubic bezier curve
multiCurve(list of x/y points) // draw a smooth curve between a set of points of any size
closedCurve(list of x/y points) // draw a closed smooth curve between a set of points of any size
clear() // clear everything on the canvas
background(color) // sets the background color
fill(color) // sets the fill color
noFill() // Remove fill
stroke(color) // sets the stroke color
noStroke() // remove stroke
strokeWeight(weight) // sets the stroke weight weight
pushStyle() // saves the current styling for later
popStyle() // restores the most recently saved style, and removes it from the list
translate(x, [y]) // translates all shapes
rotate(angle, [x, y]) // rotates all shapes
scale(x, [y]) // scales all shapes
skewX(angle) // skews all shapes at an angle, on the X axis
skewY(angle) // skews all shapes at an angle, on the Y axis
pushMatrix() // saves the current transform for later
popMatrix() // restores the most recently saved transform, and removes it from the list
*/
