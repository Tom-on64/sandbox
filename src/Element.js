import { types } from "./data.js";

export default class Element {
    constructor(color, type, components) {
        this.color = color;
        this.type = type ?? types.none;
        this.components = components ?? [];
        this.passIndex = 0;

        this.componentLookup = Object.fromEntries(this.components.map((c) => [c.constructor.name, c]));
    }

    update(i) {
        this.components.forEach((c) => c.update(i)); 
    }

    getComponent(type) {
        return this.componentLookup[type.name];
    }
}
