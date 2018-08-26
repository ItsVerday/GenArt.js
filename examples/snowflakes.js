let canv = GA.canvas(1024, 1024);
canv.global();

let colors = [
    "#e2e2e2",
    "#c1c1c1",
    "#595959",
    "#303030",
    "#56b7ef",
    "#399cd6",
    "#1576af"
];

function generate() {
    let layerTypes = [ringLayer, solidCircleLayer, ringLineLayer, solidCircleLineLayer, decreasingRingLineLayer, decreasingSolidCircleLineLayer, hexagonLayer, solidHexagonLayer, hexagonLineLayer, solidHexagonLineLayer, decreasingHexagonLineLayer, decreasingSolidHexagonLineLayer, offsetCircleLayer, offsetRingLayer, offsetHexagonLayer, offsetSolidHexagonLayer];

    for (let i = 0; i < GA.random(5, 10); i++) {
        GA.random(layerTypes)();
    }
}

function ringLayer() {
    let color = GA.random(colors);
    let radius = GA.random(64, 384);

    strokeWeight(16);
    stroke(color);
    noFill();

    circle(512, 512, radius);
}

function solidCircleLayer() {
    let color = GA.random(colors);
    let radius = GA.random(64, 384);

    noStroke();
    fill(color);

    circle(512, 512, radius);
}

function ringLineLayer() {
    let color = GA.random(colors);
    let radius = GA.random(16, 48);
    let dist = radius * 2 + GA.random(16, 32);
    let count = GA.random(2, Math.floor(512 / dist));
    let rot = Math.round(GA.random()) * Math.PI / 6;

    strokeWeight(16);
    stroke(color);
    noFill();

    for (let r = rot; r < Math.PI * 2; r += Math.PI / 3) {
        for (let d = dist; d <= dist * count; d += dist) {
            circle(Math.sin(r) * d + 512, Math.cos(r) * d + 512, radius);
        }
    }
}

function solidCircleLineLayer() {
    let color = GA.random(colors);
    let radius = GA.random(16, 48);
    let dist = radius * 2 + GA.random(16, 32);
    let count = GA.random(2, Math.floor(512 / dist));
    let rot = Math.round(GA.random()) * Math.PI / 6;

    noStroke();
    fill(color);

    for (let r = rot; r < Math.PI * 2; r += Math.PI / 3) {
        for (let d = dist; d <= dist * count; d += dist) {
            circle(Math.sin(r) * d + 512, Math.cos(r) * d + 512, radius);
        }
    }
}

function decreasingRingLineLayer() {
    let color = GA.random(colors);
    let radius = GA.random(16, 48);
    let dist = radius * 2 + GA.random(16, 32);
    let count = GA.random(2, Math.floor(512 / dist));
    let rot = Math.round(GA.random()) * Math.PI / 6;
    let decrease = GA.random(0, radius / (count + 1));

    strokeWeight(16);
    stroke(color);
    noFill();

    for (let r = rot; r < Math.PI * 2; r += Math.PI / 3) {
        let rad = radius;
        for (let d = dist; d <= dist * count; d += dist) {
            circle(Math.sin(r) * d + 512, Math.cos(r) * d + 512, rad);
            rad -= decrease;
        }
    }
}

function decreasingSolidCircleLineLayer() {
    let color = GA.random(colors);
    let radius = GA.random(16, 48);
    let dist = radius * 2 + GA.random(16, 32);
    let count = GA.random(2, Math.floor(512 / dist));
    let rot = Math.round(GA.random()) * Math.PI / 6;
    let decrease = GA.random(0, radius / (count + 1));

    noStroke();
    fill(color);

    for (let r = rot; r < Math.PI * 2; r += Math.PI / 3) {
        let rad = radius;
        for (let d = dist; d <= dist * count; d += dist) {
            circle(Math.sin(r) * d + 512, Math.cos(r) * d + 512, rad);
            rad -= decrease;
        }
    }
}

function hexagonLayer() {
    let color = GA.random(colors);
    let radius = GA.random(64, 384);
    let rot = Math.round(GA.random()) * Math.PI / 6;

    strokeWeight(16);
    stroke(color);
    noFill();

    perfectPolygon(512, 512, radius, 6, rot);
}

function solidHexagonLayer() {
    let color = GA.random(colors);
    let radius = GA.random(64, 384);
    let rot = Math.round(GA.random()) * Math.PI / 6;

    noStroke();
    fill(color);

    perfectPolygon(512, 512, radius, 6, rot);
}

function hexagonLineLayer() {
    let color = GA.random(colors);
    let radius = GA.random(16, 48);
    let dist = radius * 2 + GA.random(16, 32);
    let count = GA.random(2, Math.floor(512 / dist));
    let rot = Math.round(GA.random()) * Math.PI / 6;
    let hrot = Math.round(GA.random()) * Math.PI / 6;

    strokeWeight(16);
    stroke(color);
    noFill();

    for (let r = rot; r < Math.PI * 2; r += Math.PI / 3) {
        for (let d = dist; d <= dist * count; d += dist) {
            perfectPolygon(Math.sin(r) * d + 512, Math.cos(r) * d + 512, radius, 6, hrot);
        }
    }
}

function solidHexagonLineLayer() {
    let color = GA.random(colors);
    let radius = GA.random(16, 48);
    let dist = radius * 2 + GA.random(16, 32);
    let count = GA.random(2, Math.floor(512 / dist));
    let rot = Math.round(GA.random()) * Math.PI / 6;
    let hrot = Math.round(GA.random()) * Math.PI / 6;

    noStroke();
    fill(color);

    for (let r = rot; r < Math.PI * 2; r += Math.PI / 3) {
        for (let d = dist; d <= dist * count; d += dist) {
            perfectPolygon(Math.sin(r) * d + 512, Math.cos(r) * d + 512, radius, 6, hrot);
        }
    }
}

function decreasingHexagonLineLayer() {
    let color = GA.random(colors);
    let radius = GA.random(16, 48);
    let dist = radius * 2 + GA.random(16, 32);
    let count = GA.random(2, Math.floor(512 / dist));
    let rot = Math.round(GA.random()) * Math.PI / 6;
    let decrease = GA.random(0, radius / (count + 1));
    let hrot = Math.round(GA.random()) * Math.PI / 6;

    strokeWeight(16);
    stroke(color);
    noFill();

    for (let r = rot; r < Math.PI * 2; r += Math.PI / 3) {
        let rad = radius;
        for (let d = dist; d <= dist * count; d += dist) {
            perfectPolygon(Math.sin(r) * d + 512, Math.cos(r) * d + 512, rad, 6, hrot);
            rad -= decrease;
        }
    }
}

function decreasingSolidHexagonLineLayer() {
    let color = GA.random(colors);
    let radius = GA.random(16, 48);
    let dist = radius * 2 + GA.random(16, 32);
    let count = GA.random(2, Math.floor(512 / dist));
    let rot = Math.round(GA.random()) * Math.PI / 6;
    let decrease = GA.random(0, radius / (count + 1));
    let hrot = Math.round(GA.random()) * Math.PI / 6;

    noStroke();
    fill(color);

    for (let r = rot; r < Math.PI * 2; r += Math.PI / 3) {
        let rad = radius;
        for (let d = dist; d <= dist * count; d += dist) {
            perfectPolygon(Math.sin(r) * d + 512, Math.cos(r) * d + 512, rad, 6, hrot);
            rad -= decrease;
        }
    }
}

function offsetRingLayer() {
    let color = GA.random(colors);
    let radius = GA.random(16, 64);
    let dist = GA.random(256, 384);
    let rot = Math.round(GA.random()) * Math.PI / 6;

    strokeWeight(16);
    stroke(color);
    noFill();

    for (let r = rot; r < Math.PI * 2; r += Math.PI / 3) {
        circle(Math.sin(r) * dist + 512, Math.cos(r) * dist + 512, radius);
    }
}

function offsetCircleLayer() {
    let color = GA.random(colors);
    let radius = GA.random(16, 64);
    let dist = GA.random(256, 384);
    let rot = Math.round(GA.random()) * Math.PI / 6;

    strokeWeight(16);
    stroke(color);
    noFill();

    for (let r = rot; r < Math.PI * 2; r += Math.PI / 3) {
        circle(Math.sin(r) * dist + 512, Math.cos(r) * dist + 512, radius);
    }
}

function offsetHexagonLayer() {
    let color = GA.random(colors);
    let radius = GA.random(16, 64);
    let dist = GA.random(256, 384);
    let rot = Math.round(GA.random()) * Math.PI / 6;
    let hrot = Math.round(GA.random()) * Math.PI / 6;

    strokeWeight(16);
    stroke(color);
    noFill();

    for (let r = rot; r < Math.PI * 2; r += Math.PI / 3) {
        perfectPolygon(Math.sin(r) * dist + 512, Math.cos(r) * dist + 512, radius, 6, hrot);
    }
}

function offsetSolidHexagonLayer() {
    let color = GA.random(colors);
    let radius = GA.random(16, 64);
    let dist = GA.random(256, 384);
    let rot = Math.round(GA.random()) * Math.PI / 6;
    let hrot = Math.round(GA.random()) * Math.PI / 6;

    noStroke();
    fill(color);

    for (let r = rot; r < Math.PI * 2; r += Math.PI / 3) {
        perfectPolygon(Math.sin(r) * dist + 512, Math.cos(r) * dist + 512, radius, 6, hrot);
    }
}
