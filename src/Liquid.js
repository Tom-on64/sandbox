import Element from "./Element.js";
import { sim } from "./app.js";

export default class Liquid extends Element {
    constructor(color) { // TODO: Add viscosity
        super(color);
        this.passIndex = 2;
    }
}
