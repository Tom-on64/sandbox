import Component from "./Component.js";
import { sim } from "./app.js";

export class Moves extends Component {
    constructor(maxSpeed, acceleration, velocity, direction) {
        super();
        this.maxSpeed = maxSpeed;
        this.acc = acceleration;
        this.vel = velocity;
        this.dir = direction ?? 1;
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
        const pos = i + (sim.width * this.dir);
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
