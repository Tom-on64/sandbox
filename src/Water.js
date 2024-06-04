import Liquid from "./Liquid.js";
import { colorNoise, colors, types } from "./data.js";

export default class Water extends Liquid {
    constructor() {
        super(colorNoise(colors.water, 10), types.water);
    }
}
