import Element from "./Element.js";
import Sand from "./Sand.js";
import { ctx, input } from "./app.js";

export default class Simulation {
    constructor(width, height, pxSize, simSpeed) {
        this.width = width;
        this.height = height;
        this.pxSize = pxSize;
        this.simSpeed = simSpeed;

        this.clear();
    }

    clear() {
        /** @type {Array<Element|null>} 2d array of elements (empty = null) */
        this.buffer = new Array(this.width * this.height).fill(0)
    }

    render() {
        ctx.clearRect(0, 0, this.width * this.pxSize, this.height * this.pxSize)

        for (let i = 0; i < this.buffer.length; i++) {
            const e = this.buffer[i];
            if (!e) continue;

            ctx.fillStyle = e.color;
            ctx.fillRect((i % this.width) * this.pxSize, Math.floor(i / this.width) * this.pxSize, this.pxSize, this.pxSize);
        }

        ctx.strokeStyle = "white";
        ctx.strokeRect(input.rx * this.pxSize, input.ry * this.pxSize, this.pxSize, this.pxSize);
    }

    update() {
        for (let i = this.buffer.length - 1; i > 0; i--) {
            this.buffer[i] ? this.buffer[i].update(i) : null;
        }
        this.inputUpdate();
    }

    /**
     * @param {number} x 
     * @param {number} y 
     * @param {Element} element 
     */
    set(x, y, element) {
        this.buffer[y * this.width + x] = new element();
    }

    setCircle(x, y, element, radius, chance) {
        for (let i = x - radius; i <= x + radius; i++) {
            for (let j = y - radius; j <= y + radius; j++) {
                if (this.isInCircle(i, j, x, y, radius) && Math.random() < chance) {
                    const index = j * this.width + i;
                    if (this.buffer[index] === 0) {
                        this.buffer[index] = new element();
                    }
                }
            }
        }
    }

    isInCircle(x, y, cX, cY, radius) {
        const distanceSquared = (x - cX) ** 2 + (y - cY) ** 2;
        return distanceSquared <= radius ** 2;
    }

    isEmpty(a) {
        return this.buffer[a] === 0;
    }

    swap(a, b) {
        const temp = this.buffer[b];
        if (!temp && temp !== 0) return;

        this.buffer[b] = this.buffer[a];
        this.buffer[a] = temp;
    }

    inputUpdate() {
        input.rx = Math.floor((input.mouse.x - this.pxSize / 2) / this.pxSize);
        input.ry = Math.floor((input.mouse.y - this.pxSize / 2) / this.pxSize);

        if (input.mouse.left) this.setCircle(input.rx, input.ry, Sand, 2, 0.5);
    }
}
