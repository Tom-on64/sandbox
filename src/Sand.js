import Element from "./Element.js";
import { sim } from "./app.js";
import { colorNoise, colors } from "./color.js";

export default class Sand extends Element {
    constructor() {
        super(colorNoise(colors.sand, 20));
        this.maxSpeed = 8;
        this.acc = 0.4;
        this.vel = 0;
    }

    update(i) {
        this.updateVelocity();
        
        let pos = i;
        for (let v = this.getUpdateCount(); v > 0; v--) {
            const newPos = this.move(pos);

            if (newPos !== pos) pos = newPos;
            else {
                this.resetVelocity();
                break;
            }
        }
    }

    move(i) {
        const bottom = i + sim.width;
        const bottomLeft = bottom - 1;
        const bottomRight = bottom + 1;
        const random = [bottomLeft, bottomRight];
        random.sort(() => Math.random() - 0.5);

        if (sim.isEmpty(bottom)) { 
            sim.swap(i, bottom);
            return bottom;
        }

        for (const n of random) {
            if (!sim.isEmpty(n)) return;
            sim.swap(i, n);
            return n;
        }
    }

    getUpdateCount() {
        const abs = Math.abs(this.vel);
        const floor = Math.floor(abs);
        const rem = abs - floor;
        return floor + (Math.random() > rem ? 1 : 0);
    }

    updateVelocity() {
        this.vel += this.acc;
        if (Math.abs(this.vel) > this.maxSpeed)
            this.vel = Math.sign(this.vel) * this.maxSpeed;
    }

    resetVelocity() {
        this.vel = 0;
    }
}