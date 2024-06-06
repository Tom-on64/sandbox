import Gas from "./Gas.js";
import { colorNoise, colors } from "./data.js";

export default class Steam extends Gas {
    constructor() {
        super(colorNoise(colors.steam, 2));
    }
}
