import Component from "./Component";

const ENTITY_TYPES = {
	player: [["health", 100], ["position", 0, 0]],
	monster: [["health", 50]]
};

let _count = 0;

export default class Entity {
	static getTemplate(type) {
		return ENTITY_TYPES[type];
	}

	constructor() {
		this.id = ++_count;
	}

	addComponent(type, ...args) {
		const component = Component.TYPES[type];
		if (!component) {
			console.warn(`unknown component ${type}`);
			return this;
		}

		this[type] = component(...args);

		return this;
	}
}
