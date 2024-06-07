import Element from "./Element.js";
import { Moves } from "./components.js";

export default class Gas extends Element {
    constructor(color) {
        super(color, [
            new Moves(0.5, -0.1, 0),
        ]);
        this.passIndex = 1;        
    }
}
