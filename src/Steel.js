import Solid from "./Solid.js";
import { colorNoise, colors, types } from "./data.js";

export default class Wood extends Solid {
    constructor() {
        super(colorNoise(colors.steel, 1), types.steel);
    }
}
