import Gas from "./Gas.js";
import { colorNoise, colors, types } from "./data.js";

export default class Smoke extends Gas {
    constructor() {
        super(colorNoise(colors.steam, 2), types.steam);
    }
}
