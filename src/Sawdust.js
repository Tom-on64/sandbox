import Dust from "./Dust.js";
import { colorNoise, colors, types } from "./data.js";

export default class Sawdust extends Dust {
    constructor() {
        super(colorNoise(colors.sawdust, 5), types.sawdust, 0.2);
    }
}
