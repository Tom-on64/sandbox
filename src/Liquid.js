import Element from "./Element.js";
import { sim } from "./app.js";

export default class Liquid extends Element {
    constructor(color, type) { // TODO: Add viscosity
        super(color, type);
        this.passIndex = 2;
    }

    move(i) {
        const bottom = i + sim.width;

        if (sim.canMove(i, bottom)) {
            return sim.swap(i, bottom);
        }

        return i;
    }
}
