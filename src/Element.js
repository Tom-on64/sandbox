export default class Element {
    constructor(color, components) {
        this.color = color;
        this.components = components ?? [];
        this.passIndex = 0;
        this.#updateComponentLookup();
    }

    update(i) {
        this.components.forEach((c) => c.update(i)); 
    }

    getComponent(type) {
        return this.componentLookup[type.name];
    }

    addComponent(component) {
        this.components.push(component);
        this.#updateComponentLookup();
    }

    #updateComponentLookup() {
        this.componentLookup = Object.fromEntries(this.components.map((c) => [c.constructor.name, c]));
    }
}
