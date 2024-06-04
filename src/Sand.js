import Dust from "./Dust.js";
import { colorNoise, colors, types } from "./data.js";

export default class Sand extends Dust {
    constructor() {
        super(colorNoise(colors.sand, 20), types.sand, 0.4);
    }
}
