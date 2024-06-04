import Element from "./Element.js";
import { sim } from "./app.js";

export default class Dust extends Element {
    constructor(color, type, acc) {
        super(color, type);
        this.maxSpeed = acc * 20;
        this.acc = acc;
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
