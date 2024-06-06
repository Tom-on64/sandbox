import Element from "./Element.js";
import { Moves } from "./components.js";

export default class Dust extends Element {
    constructor(color, acc) {
        super(color, [
            new Moves(acc * 20, acc, 0),
        ]);
        this.passIndex = 3;
    }
}
