import Solid from "./Solid.js";
import { colorNoise, colors } from "./data.js";
import { Flamable } from "./components.js";

export default class Wood extends Solid {
    constructor() {
        super(colorNoise(colors.wood, 5));
        this.addComponent(new Flamable(200 + 100 * Math.random(), 0.01));
    }
}
