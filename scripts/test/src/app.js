'use strict';

const response = {
	responseJSON: [
		{},
		{}
	]
};

class App {
	constructor() {
		this.template = '';
		this.createModules(this.getResponse(), this.template);
	}

	getResponse() {
		return response.responseJSON;
	}

	createModules(response, tpl) {
		response.forEach((item) => {
			let outcome = new Outcome();
		});
	}
}