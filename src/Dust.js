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

    move(i) {
        const bottom = i + sim.width;
        const bottomLeft = bottom - 1;
        const bottomRight = bottom + 1;
        const column = i % sim.width;

        if (sim.canMove(i, bottom)) { 
            return sim.swap(i, bottom);
        } else if (Math.random() > 0.5 && bottomLeft % sim.width < column && sim.canMove(i, bottomLeft)) {
            return sim.swap(i, bottomLeft);
        } else if (bottomRight % sim.width > column && sim.canMove(i, bottomRight)) {
            return sim.swap(i, bottomRight);
        }

        return i;
    }
}
