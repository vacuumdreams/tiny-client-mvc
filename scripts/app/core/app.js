import response from 'module.outcome.response';
import Outcome from 'module.outcome';

class App {
	constructor() {
		this.template = document.getElementById('outcome-template').innerHTML;
		this.createModules(this.getResponse(), this.template);
	}

	getResponse() {
		return response.responseJSON;
	}

	createModules(response, tpl) {
		let circleElement = document.querySelector('.outcome-circle'),
			dasharray = (circleElement) ? parseFloat(window.getComputedStyle(circleElement)['stroke-dasharray']) : false;

		response.forEach((res) => {
			let outcome = new Outcome(res, tpl, { 'dasharray': dasharray });
		});
	}
};

export default new App();