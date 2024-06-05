import Element from "./Element.js";
import { Moves } from "./components.js";

export default class Gas extends Element {
    constructor(color, type) {
        super(color, type, [
            new Moves(0.5, -0.1, 0, -1),
        ]);
        this.passIndex = 1;        
    }
}
