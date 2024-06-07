import Dust from "./Dust.js";
import { sim } from "./app.js";
import { colorNoise, colors } from "./data.js";

export default class Sand extends Dust {
    constructor() {
        super(colorNoise(colors.soil, 8), 0.4);
    }
}
