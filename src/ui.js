import Sand from "./Sand.js";
import Smoke from "./Smoke.js";
import Water from "./Water.js";
import Wood from "./Wood.js";
import { input, sim } from "./app.js";
import { colors, invertColor } from "./data.js";

const controls = document.getElementById("controls");
const elements = [
    { name: "Sand", callback: () => new Sand(), prob: 0.5, color: colors.sand },
    { name: "Water", callback: () => new Water(), prob: 0.5, color: colors.water },
    { name: "Wood", callback: () => new Wood(), prob: 1, color: colors.wood },
    { name: "Smoke", callback: () => new Smoke(), prob: 0.3, color: colors.smoke },
    { name: "Erase", callback: () => 0, prob: 1, color: "#FFFFFF" },
];

export const createUi = () => {
    elements.forEach(e => {
        const btn = document.createElement("button");
        btn.innerText = e.name;
        btn.onclick = () => {
            sim.createElement = () => sim.setCircle(input.rx, input.ry, e.callback, 2, e.prob);
        };

        btn.style.backgroundColor = e.color;
        btn.style.color = invertColor(e.color, true);

        controls.appendChild(btn);
    })
}
