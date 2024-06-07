import Element from "./Element.js";
import { Moves, Flamable } from "./components.js";
import { colors, colorNoise } from "./data.js";

export default class Fire extends Element {
    constructor() {
        super(colorNoise(colors.fire, 75), [
            new Flamable(10 + 100 * Math.random(), 1, true),
        ]);
        this.passIndex = 5;
    }
}
