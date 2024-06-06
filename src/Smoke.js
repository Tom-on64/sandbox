import Gas from "./Gas.js";
import { colorNoise, colors } from "./data.js";
import { LimitedLife } from "./components.js";
import { sim } from "./app.js";

export default class Smoke extends Gas {
    constructor() {
        super(colorNoise(colors.smoke, 2));

        this.components.push(new LimitedLife(
            200 + 200 * Math.random(), 
            (i, b) => { // onTick()
                const p = sim.buffer[i];
                if (!p) return;
                const pct = Math.floor(b.remainingLife / b.lifetime * 256);
                p.color = p.color.slice(0, 7) + pct.toString(16).padStart(2, '0'); // Hacky way to reduce alpha value
            }, 
            (i) => { // onDeath()
                sim.clearAt(i);
            }
        ));

    }
}
