import Element from "./Element.js";
import { sim } from "./app.js";
import { colorNoise, colors, types } from "./data.js";

export default class Smoke extends Element {
    constructor() {
        super(colorNoise(colors.smoke, 2), types.smoke);
        this.maxSpeed = 0.5;
        this.acc = -0.1;
        this.vel = 0;
        this.passIndex = 1;        
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
        const top = i - sim.width;
        const topLeft = top - 1;
        const topRight = top + 1;
        const random = [top, topLeft, topRight];
        random.sort(() => Math.random() - 0.5);

        for (const n of random) {
            if (!sim.canMove(i, n)) continue;
            sim.swap(i, n);
            return n;
        }
    }
}