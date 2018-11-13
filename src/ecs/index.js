import Entity from "./Entity";

const entities = {};
const groups = {};

export default class ECS {
	static createEntity(kind) {
		const entity = new Entity();
		const components = Entity.getTemplate(kind) || [];

		for (const componentParts of components) {
			entity.addComponent(...componentParts);
		}

		// map entities by id for fast access
		entities[entity.id] = entity;

		return entity;
	}

	static getEntity(id) {
		return entities[id];
	}

	static getEntities(...ids) {
		const ents = [];

		for (const id of ids) {
			const entity = ECS.getEntity(id);
			if (!entity) {
				console.warn(`couldn't get entity with id ${id}`);
				continue;
			}
			ents.push(entity);
		}

		return ents;
	}

	static getGroup(name) {
		const group = groups[name];
		if (!group) {
			console.warn(`no group named ${name}`);
			return;
		}
		return group.components || [];
	}

	static createGroup(name, ...componentNames) {
		console.debug(`[createGroup] ${name}: ${componentNames}`);
		groups[name] = {
			names: componentNames,
			components: []
		};
	}

	static filterEntities(...withComponents) {
		return Object.keys(entities)
			.filter(entityId => {
				// no components passed, return all entities
				if (withComponents.length === 0) {
					return true;
				}

				// return only the entities with given components
				for (const componentName of withComponents) {
					if (!entities[entityId][componentName]) {
						return false;
					}
				}
				return true;
			})
			.map(entityId => entities[entityId]);
	}
}
