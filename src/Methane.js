import Gas from "./Gas.js";
import { Flamable } from "./components.js";
import { colors, colorNoise } from "./data.js";

export default class Methane extends Gas {
    constructor() {
        super(colorNoise(colors.methane, 3));
        
        this.addComponent(new Flamable(10, 0.7, () => (0)));
    }
}

