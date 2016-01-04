import tplService from 'mustache';

export default class {
	constructor(model, template) {
		this.model = model;
		this.template = template;
		this.element = document.getElementById(`module-${model.moduleClass}`);
	}

	render() {
		this.element.innerHTML = tplService.to_html(this.template, this.model);
	}
}