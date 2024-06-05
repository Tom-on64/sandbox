import Element from "./Element.js";
import { Moves } from "./components.js";

export default class Dust extends Element {
    constructor(color, type, acc) {
        super(color, type, [
            new Moves(acc * 20, acc, 0),
        ]);
        this.passIndex = 3;
    }
}
