import Solid from "./Solid.js";
import { colorNoise, colors } from "./data.js";

export default class Wood extends Solid {
    constructor() {
        super(colorNoise(colors.wood, 5));
    }
}
