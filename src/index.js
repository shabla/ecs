import React from "react";
import { render } from "react-dom";
import { Provider } from "react-redux";
import { ConnectedRouter } from "connected-react-router";
import store, { history } from "./store";
import App from "./containers/app";

import "sanitize.css/sanitize.css";
import "./index.css";

import ECS from "./ecs";

ECS.createGroup("render", "health");

ECS.createEntity().addComponent("health", 100);
ECS.createEntity()
	.addComponent("health", 100)
	.addComponent("render");
ECS.createEntity("player");
ECS.createEntity("monster");
ECS.createEntity("monster");
ECS.createEntity("monster");

console.log("entities", ECS.filterEntities());

console.log("getEntities()", ECS.getEntities());
console.log("getEntities(2, 3)", ECS.getEntities(2, 3));

// Systems
const RenderSystem = (function() {
	const system = {
		name: "render"
	};

	system.update = () => {
		const entities = ECS.getGroup("render");
		console.log(`render system update`, entities);
	};

	return system;
})();

RenderSystem.update();

render(
	<Provider store={store}>
		<ConnectedRouter history={history}>
			<App />
		</ConnectedRouter>
	</Provider>,
	document.querySelector("#root")
);
