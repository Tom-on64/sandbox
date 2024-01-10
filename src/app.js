import Particle from "./Particle.js";

/** @type {HTMLCanvasElement} */
const canvas = document.getElementById('display');
const ctx = canvas.getContext('2d');

// --- Constants ---
const pixelSize = 6;

export const width = 128;
export const height = 96;

/** @type {Particle[]} */
export const particles = [];

canvas.width = width * pixelSize;
canvas.height = height * pixelSize;

// --- Methods ---
export const drawPixel = (x, y, color) => {
    ctx.fillStyle = color;
    ctx.fillRect(x * pixelSize, y * pixelSize, pixelSize, pixelSize);
}

// --- Init ---
const init = () => {
    for (let y = 0; y < height; y++) {
        particles[y] = []
        for (let x = 0; x < height; x++) {
            particles[y][x] = null;
        }
    }

    // Testing
    particles[4][8] = new Particle(4, 8, "#00ff00")
}

// --- Update ---
let timestamp = 0;
let timer = 0;
const interval = 100;
const update = (time) => {
    const dt = (time - timestamp);
    timestamp = time;
    requestAnimationFrame(update);

    timer += dt;
    if (timer >= interval) {
        particles.forEach(p => p.update());
        timer = 0; 
    }
    
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach(row => row.forEach(p => p ? p.draw() : null));
}

init();
update();
