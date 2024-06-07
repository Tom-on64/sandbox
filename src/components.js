import Component from "./Component.js";
import Smoke from "./Smoke.js";
import { sim } from "./app.js";

export class Moves extends Component {
    constructor(maxSpeed, acceleration, velocity) {
        super();
        this.maxSpeed = maxSpeed;
        this.acc = acceleration;
        this.vel = velocity;
    }

    updateVelocity() {
        this.vel += this.acc;
        if (Math.abs(this.vel) > this.maxSpeed)
            this.vel = Math.sign(this.vel) * this.maxSpeed;
    }

    resetVelocity() {
        this.vel = 0;
    }

    update(i) {
        this.updateVelocity();
        
        let pos = i;
        for (let v = this.getUpdateCount(); v > 0; v--) {
            const newPos = this.move(pos);

            if (newPos !== pos) pos = newPos;
            else {
                this.resetVelocity();
                break;
            }
        }
    }

    move(i) {
        const pos = i + (sim.width * Math.sign(this.vel));
        const posLeft = pos - 1;
        const posRight = pos + 1;
        const column = i % sim.width;

        if (sim.canMove(i, pos)) { 
            return sim.swap(i, pos);
        } else if (Math.random() > 0.5 && posLeft % sim.width < column && sim.canMove(i, posLeft)) {
            return sim.swap(i, posLeft);
        } else if (posRight % sim.width > column && sim.canMove(i, posRight)) {
            return sim.swap(i, posRight);
        }

        return i;
    }

    getUpdateCount() {
        const abs = Math.abs(this.vel);
        const floor = Math.floor(abs);
        const rem = abs - floor;
        return floor + (Math.random() > rem ? 1 : 0);
    }
}

export class LimitedLife extends Component {
    constructor(lifetime, onTick, onDeath) {
        super();
        this.lifetime = lifetime;
        this.remainingLife = this.lifetime;
        this.onTick = onTick ?? (() => {});
        this.onDeath = onDeath ?? (() => {});
    }

    update(i) {
        if (this.remainingLife <= 0) {
            this.onDeath(i, this);
            return;
        } else {
            this.remainingLife = Math.floor(this.remainingLife - 1);
        }

        this.onTick(i, this);
    }
}

export class Flamable extends LimitedLife {
    constructor(fuel, colors) {
        fuel = fuel ?? 10 + 100 * Math.random();
        colors = colors ?? [ // Some default colors
            "#541e1e",
            "#ff1f1f",
            "#ea5a00",
            "#ff6900",
            "#eecc09",
        ];

        super(
            fuel,
            (i, b) => { // onTick
                const freq = Math.sqrt(b.lifetime / b.remainingLife);
                const pct = b.remainingLife / (freq * colors.length);
                sim.buffer[i].color = colors[Math.floor(pct) % colors.length];
            },
            (i) => { // onDeath
                sim.buffer[i] = new Smoke();
            },
        );

        this.fuel = fuel;
        this.colors = colors;
    }
}

export class Flows extends Component {
    constructor(viscosity) {
        super();
        this.viscosity = viscosity;
        this.stat = 0;
    }

    update(i) {
        const bottom = i + sim.width;
        const right = i + 1;
        const left = i - 1;
        const column = i % sim.width;

        if (sim.canMove(i, bottom)) {
            return sim.swap(i, bottom);
        } else if (Math.random() > 0.5 && right % sim.width > column && sim.canMove(i, right)) {
            this.stat++;
            return sim.swap(i, right);
        } else if (left % sim.width < column && sim.canMove(i, left)) {
            this.stat--;
            return sim.swap(i, left);
        }
    }
}

