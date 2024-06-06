import Element from "./Element.js";

export default class Solid extends Element {
    constructor(color) {
        super(color);
        this.passIndex = 4;
    }
}
