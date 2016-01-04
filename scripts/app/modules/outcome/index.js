import Model from 'module.outcome.model';
import View from 'module.outcome.view';

export default class {
	constructor(response, template, params) {
		let model = new Model(response, params),
			view = new View(model, template);

		view.render();
	}
}