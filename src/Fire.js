import Element from "./Element.js";
import { Flamable } from "./components.js";
import { colors } from "./data.js";

export default class Fire extends Element {
    constructor() {
        super(colors.fire, [
            new Flamable(),
        ]);
        this.passIndex = 5;
    }
}
