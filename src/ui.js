import Sand from "./Sand.js";
import Soil from "./Soil.js";
import Sawdust from "./Sawdust.js";
import Water from "./Water.js";
import Lava from "./Lava.js";
import Wood from "./Wood.js";
import Stone from "./Stone.js";
import Steel from "./Steel.js";
import Smoke from "./Smoke.js";
import Steam from "./Steam.js";
import { input, sim } from "./app.js";
import { colors, invertColor } from "./data.js";

const controls = document.getElementById("controls");
const elements = [
    { name: "Sand", callback: () => new Sand(), prob: 0.5, color: colors.sand },
    { name: "Soil", callback: () => new Soil(), prob: 0.5, color: colors.soil },
    { name: "Sawdust", callback: () => new Sawdust(), prob: 0.5, color: colors.sawdust },
    { name: "Water", callback: () => new Water(), prob: 0.5, color: colors.water },
    { name: "Lava", callback: () => new Lava(), prob: 0.7, color: colors.lava },
    { name: "Wood", callback: () => new Wood(), prob: 1, color: colors.wood },
    { name: "Stone", callback: () => new Stone(), prob: 1, color: colors.stone },
    { name: "Steel", callback: () => new Steel(), prob: 1, color: colors.steel },
    { name: "Smoke", callback: () => new Smoke(), prob: 0.3, color: colors.smoke },
    { name: "Steam", callback: () => new Steam(), prob: 0.4, color: colors.steam },
    { name: "Erase", callback: () => 0, prob: 1, color: "#FFFFFF" },
];

export const createUi = () => {
    elements.forEach(e => {
        const btn = document.createElement("button");
        btn.innerText = e.name;
        btn.onclick = () => {
            sim.createElement = () => sim.setCircle(input.rx, input.ry, e.callback, sim.radius, e.prob);
        };

        btn.style.backgroundColor = e.color;
        btn.style.color = invertColor(e.color, true);

        controls.appendChild(btn);
    })

    const slider = document.createElement("input");
    slider.type = "range";
    slider.min = 1;
    slider.max = 8;
    slider.value = 2;
    slider.oninput = (e) => sim.radius = e.target.value;
    controls.appendChild(slider);
}
