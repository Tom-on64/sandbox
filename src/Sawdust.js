import Dust from "./Dust.js";
import { colorNoise, colors } from "./data.js";
import { Flamable } from "./components.js";

export default class Sawdust extends Dust {
    constructor() {
        super(colorNoise(colors.sawdust, 5), 0.2);
        //this.addComponent(new Flamable(100 + 50 * Math.random(), 0.01));
    }
}
