import Liquid from "./Liquid.js";
import { colorNoise, colors, types } from  "./data.js";

export default class Lava extends Liquid {
    constructor() {
        super(colorNoise(colors.lava, 30), types.lava);
    }
}
