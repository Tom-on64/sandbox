import Dust from "./Dust.js";
import { colorNoise, colors } from "./data.js";

export default class Sawdust extends Dust {
    constructor() {
        super(colorNoise(colors.sawdust, 5), 0.2);
    }
}
