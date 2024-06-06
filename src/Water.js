import Liquid from "./Liquid.js";
import { colorNoise, colors } from "./data.js";

export default class Water extends Liquid {
    constructor() {
        super(colorNoise(colors.water, 1));
    }
}
