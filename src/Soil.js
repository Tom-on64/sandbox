import Dust from "./Dust.js";
import { colorNoise, colors, types } from "./data.js";

export default class Sand extends Dust {
    constructor() {
        super(colorNoise(colors.soil, 8), types.soil, 0.4);
    }
}
