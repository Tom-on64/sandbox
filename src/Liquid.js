import Element from "./Element.js";
import { sim } from "./app.js";

export default class Liquid extends Element {
    constructor(color, type) { // TODO: Add viscosity
        super(color, type);
        this.passIndex = 2;
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

    move(i) { // TODO: Fix liquids
        const bottom = i + sim.width;
        const left = i - 1;
        const right = i + 1;
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
        
        if (sim.canMove(i, left)) {
            sim.swap(i, left);
            return left;
        } else if (sim.canMove(i, right)) {
            sim.swap(i, right);
            return right;
        }
    }
}
