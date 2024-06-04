import Solid from "./Solid.js";
import { colorNoise, colors, types } from "./data.js";

export default class Wood extends Solid {
    constructor() {
        super(colorNoise(colors.stone, 3), types.stone);
    }
}
