import Element from "./Element.js";
import Sand from "./Sand.js";
import { ctx, input } from "./app.js";

export default class Simulation {
    constructor(width, height, pxSize, simSpeed) {
        this.width = width;
        this.height = height;
        this.pxSize = pxSize;
        this.simSpeed = simSpeed;
        this.radius = 2;

        this.clear();

        this.createElement = () => this.setCircle(input.rx, input.ry, () => new Sand(), this.radius, 0.5);
    }

    clear() {
        /** @type {Array<Element|0>} 2d array of elements (empty = 0) */
        this.buffer = new Array(this.width * this.height).fill(0)
        this.changes = [];
    }

    render() {
        ctx.fillStyle = "#0f0f0f";
        ctx.fillRect(0, 0, this.width * this.pxSize, this.height * this.pxSize)

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
        for (let i = 0; i < this.buffer.length; ++i) {
            this.buffer[i] ? this.buffer[i].update(i) : null;
        }

        for (let i = 0; i < this.changes.length; ++i)
            this.doSwap(this.changes[i]);
        this.changes = [];

        this.inputUpdate();
    }

    get(a) {
        return this.buffer[a];
    }

    set(x, y, callback) {
        this.buffer[y * this.width + x] = callback();
    }

    setCircle(x, y, callback, radius, chance) {
        const radiusSq = radius * radius;
        const min = x - radius < 0 ? x - radius : 0;
        const max = x + radius >= this.width ? x - this.width + 1 + radius : 0;

        for (let y1 = -radius; y1 <= radius; y1++) {
            for (let x1 = -radius - min; x1 <= radius - max; x1++) {
                if (x1*x1 + y1*y1 <= radiusSq && Math.random() < chance) {
                    const i = (x+x1) + (y+y1) * this.width;

                    this.buffer[i] = callback();
                }
            }
        }    
    }

    isEmpty(a) {
        return !this.buffer[a];
    }

    canMove(a, b) {
        if (this.isEmpty(b)) return this.isEmpty(b);
        if (!this.buffer[a]) return false;

        return this.buffer[a].passIndex > this.buffer[b].passIndex;
    }

    typeAt(a) {
        if (!this.buffer[a]) return 0;
        return this.buffer[a].type;
    }

    swap(a, b) {
        this.changes.push([a, b]);
        return b;
    }

    doSwap([a, b]) {
        if (!this.buffer[a]) return;
        const temp = this.buffer[b];
        if (!temp && temp !== 0) return;

        this.buffer[b] = this.buffer[a];
        this.buffer[a] = temp;
    }

    inputUpdate() {
        if (input.mouse.left) this.createElement();
        if (input.mouse.right) this.clear();
    }
}
