import Element from "./Element.js";
import { sim } from "./app.js";

export default class Gas extends Element {
    constructor(color, type) {
        super(color, type);
        this.maxSpeed = 0.5;
        this.acc = -0.1;
        this.vel = 0;
        this.passIndex = 1;        
    }

    move(i) {
        const top = i - sim.width;
        const topLeft = top - 1;
        const topRight = top + 1
        const column = i % sim.width;

        if (sim.canMove(i, top)) { 
            return sim.swap(i, top);
        } else if (Math.random() > 0.5 && topLeft % sim.width < column && sim.canMove(i, topLeft)) {
            return sim.swap(i, topLeft);
        } else if (topRight % sim.width > column && sim.canMove(i, topRight)) {
            return sim.swap(i, topRight);
        }

        return i;
    }
}
