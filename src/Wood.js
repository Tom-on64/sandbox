import Element from "./Element.js";
import { colorNoise, colors, types } from "./data.js";

export default class Wood extends Element {
    constructor() {
        super(colorNoise(colors.wood, 5), types.wood);
        this.passIndex = 4;
    }
}