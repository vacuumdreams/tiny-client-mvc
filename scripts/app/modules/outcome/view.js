import tplService from 'mustache';

export default class {
	constructor(model, template) {
		this.model = model;
		this.template = template;
		this.element = document.getElementById(`module-${model.moduleClass}`);
	}

	render() {
		let self = this;

		self.element.innerHTML = tplService.to_html(self.template, self.model);
		setTimeout(() => {
			self.element.className = `${self.element.className} outcome-${self.model.moduleClass} loaded`;
		}, 0);
		
	}
}