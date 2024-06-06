import Element from "./Element.js";
import { Flows } from "./components.js";

export default class Liquid extends Element {
    constructor(color, viscosity) {
        super(color, [
            new Flows(viscosity),
        ]);
        this.passIndex = 2;
    }
}
