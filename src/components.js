import Component from "./Component.js";
import Smoke from "./Smoke.js";
import { sim } from "./app.js";

export class Moves extends Component {
    constructor(maxSpeed, acceleration, velocity) {
        super();
        this.maxSpeed = maxSpeed ?? 1;
        this.acc = acceleration ?? 1;
        this.vel = velocity ?? 0;
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
        if (this.remainingLife > 0) {
            this.remainingLife = Math.floor(this.remainingLife - 1);
            this.onTick(i, this);
        } else {
            this.onDeath(i, this);
        }
    }
}

export class Flamable extends LimitedLife {
    constructor(fuel, chance, smokeCall, burning, colors) {
        fuel = fuel ?? 10 + 100 * Math.random();
        colors = colors ?? [ // Some default colors
            "#541e1e",
            "#ff1f1f",
            "#ea5a00",
            "#ff6900",
            "#eecc09",
        ];

        smokeCall = smokeCall ?? (() => new Smoke());

        super(
            fuel,
            (i, b) => { // onTick
                if (sim.isEmpty(i)) return;
                const freq = Math.sqrt(b.lifetime / b.remainingLife);
                const pct = b.remainingLife / (freq * colors.length);
                sim.buffer[i].color = colors[Math.floor(pct) % colors.length];
            },
            (i) => { // onDeath
                sim.clearAt(i);
                sim.buffer[i] = smokeCall();
            },
        );

        this.fuel = fuel;
        this.burning = burning ?? false;
        this.chance = chance;
        this.catchChances = 0;
        this.colors = colors;
    }

    update(i) {
        if (this.burning) {
            super.update(i);
            this.spread(i);
            return;
        }

        if (this.catchChances > 0) {
            const chance = this.chance * this.catchChances;

            if (Math.random() < chance) {
                this.burning = true;
            }
            this.catchChances = 0;
        }
    }

    spread(i) {
        const col = i % sim.width;
        for (let dx = -1; dx <= 1; dx++) {
            for (let dy = -1; dy <= 1; dy++) {
                if (dx === 0 && dy === 0) continue;
                const di = i + dx + dy * sim.width;
                const dcol = di % sim.width

                if (di >= 0 && di < sim.buffer.length && Math.abs(col - dcol) <= 1) {
                    const e = sim.get(di);
                    if (!e) continue;

                    const flamable = e.getComponent(Flamable);

                    if (flamable) {
                        flamable.catchChances += 0.5 + Math.random() * 0.5;
                    }
                }
            }
        }
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

