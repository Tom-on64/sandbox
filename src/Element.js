import { types } from "./data.js";

export default class Element {
    constructor(color, type = types.none) {
        this.color = color;
        this.type = type;

        this.maxSpeed = 0;
        this.acc = 0;
        this.vel = 0;
        this.passIndex = 0;
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

    /* @abstract */
    move(i) {}

    getUpdateCount() {
        const abs = Math.abs(this.vel);
        const floor = Math.floor(abs);
        const rem = abs - floor;
        return floor + (Math.random() > rem ? 1 : 0);
    }

    updateVelocity() {
        this.vel += this.acc;
        if (Math.abs(this.vel) > this.maxSpeed)
            this.vel = Math.sign(this.vel) * this.maxSpeed;
    }

    resetVelocity() {
        this.vel = 0;
    }
}
