export default class Component {
	static TYPES = {
		health: max => ({
			current: max,
			max
		}),

		position: (x, y) => ({ x, y }),

		render: () => ({})
	};

	create(type, ...args) {
		return Component.TYPES[type](...args);
	}
}
