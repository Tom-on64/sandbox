import Gas from "./Gas.js";
import { colorNoise, colors } from "./data.js";

export default class Smoke extends Gas {
    constructor() {
        super(colorNoise(colors.smoke, 2));
    }
}
