import { drawPixel } from "./app.js";

export default class Particle {
    constructor(x, y, color) {
        this.x = x;
        this.y = y;
        this.color = color;
    }

    draw() {
        drawPixel(this.x, this.y, this.color);
    }

    update() {}
}