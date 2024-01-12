import Simulation from "./Simulation.js";

/** @type {HTMLCanvasElement} */
const canvas = document.getElementById("display");
export const ctx = canvas.getContext("2d");

export const input = { keys: {}, mouse: { x: 0, y: 0, left: false, middle: false, right: false }}

export const sim = new Simulation(96, 64, 8, 25);
// export const sim = new Simulation(256, 196, 4, 25);

const resize = () => {
    canvas.width = sim.width * sim.pxSize;
    canvas.height = sim.height * sim.pxSize;
}

let timestamp = 0;
let timer = 0;
const loop = (time = 0) => {
    const dt = time - timestamp;
    timestamp = time;
    requestAnimationFrame(loop);

    timer += dt;
    if (timer >= sim.simSpeed) {
        sim.update();
        timer = 0;
    }

    sim.render();
}

document.addEventListener("keydown", (e) => input.keys[e.key] = true);
document.addEventListener("keyup", (e) => input.keys[e.key] = false);
canvas.addEventListener("contextmenu", (e) => e.preventDefault());
canvas.addEventListener("mousemove", (e) => {
    input.mouse.x = e.offsetX;
    input.mouse.y = e.offsetY;
});
canvas.addEventListener("mousedown", (e) => {
    if (e.button === 0) input.mouse.left = true;
    else if (e.button === 1) input.mouse.middle = true;
    else if (e.button === 2) input.mouse.right = true;
});
canvas.addEventListener("mouseup", (e) => {
    if (e.button === 0) input.mouse.left = false;
    else if (e.button === 1) input.mouse.middle = false;
    else if (e.button === 2) input.mouse.right = false;
});

resize();
loop();
