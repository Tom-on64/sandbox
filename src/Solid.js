import Element from "./Element.js";

export default class Solid extends Element {
    constructor(color, type) {
        super(color, type);
        this.passIndex = 4;
    }

    move(i) { 
        return i;
    }
}
