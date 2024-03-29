import Element from "./Element.js";
import { sim } from "./app.js";
import { colorNoise, colors, types } from "./data.js";

export default class Sand extends Element {
    constructor() {
        super(colorNoise(colors.sand, 20), types.sand);
        this.maxSpeed = 8;
        this.acc = 0.4;
        this.vel = 0;
        this.passIndex = 3;
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

        if (sim.canMove(i, bottom)) { 
            sim.swap(i, bottom);
            return bottom;
        }

        for (const n of random) {
            if (!sim.canMove(i, n)) continue;
            sim.swap(i, n);
            return n;
        }
    }
}