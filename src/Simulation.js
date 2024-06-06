import Element from "./Element.js";
import Sand from "./Sand.js";
import { ctx, input, BG_COLOR, CURSOR_COLOR } from "./app.js";
import { Flows } from "./components.js";
export default class Simulation {
    constructor(width, height, pxSize, simSpeed) {
        this.width = width;
        this.height = height;
        this.pxSize = pxSize;
        this.simSpeed = simSpeed;
        this.radius = 4;

        this.clear();

        this.createElement = () => this.setCircle(input.rx, input.ry, () => new Sand(), this.radius, 0.5);
    }

    clear() {
        /** @type {Array<Element|0>} 2d array of elements (empty = 0) */
        this.buffer = new Array(this.width * this.height).fill(0)
    }

    render() {
        ctx.fillStyle = BG_COLOR;
        ctx.fillRect(0, 0, this.width * this.pxSize, this.height * this.pxSize)

        for (let i = 0; i < this.buffer.length; i++) {
            const e = this.buffer[i];
            if (!e) continue;

            ctx.fillStyle = e.color;
            ctx.fillRect((i % this.width) * this.pxSize, Math.floor(i / this.width) * this.pxSize, this.pxSize, this.pxSize);
        }

        ctx.strokeStyle = CURSOR_COLOR;
        ctx.strokeRect(input.rx * this.pxSize - 2, input.ry * this.pxSize - 2, this.pxSize + 4, this.pxSize + 4);
    }

    update() {
        for (let row = this.height; row >= 0; row--) {
            const dir = Math.random() > 0.5;
            for (let col = 0; col < this.width; col++) {
                const offset = dir ? col : (this.width - col - 1);
                const i = row * this.width + offset;

                this.buffer[i] ? this.buffer[i].update(i) : null;
            }
        }

        this.inputUpdate();
    }

    get(a) {
        return this.buffer[a];
    }

    set(x, y, callback) {
        this.buffer[y * this.width + x] = callback();
    }

    clearAt(a) {
        this.buffer[a] = 0;
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
        if (this.buffer[a] === undefined) return false;
        return !this.buffer[a];
    }

    canMove(a, b) {
        if (a === b) return false;
        else if (this.buffer[a] === undefined || this.buffer[b] === undefined) return false;

        if (this.isEmpty(b)) return true;
        return this.buffer[a].passIndex > this.buffer[b].passIndex;
    }

    typeAt(a) {
        if (!this.buffer[a]) return 0;
        return this.buffer[a].type;
    }

    swap(a, b) {
        const temp = this.buffer[b];
        this.buffer[b] = this.buffer[a];
        this.buffer[a] = temp;

        return b;
    }

    inputUpdate() {
        if (input.mouse.left) this.createElement();
        if (input.mouse.right) this.clear();
    }
}
