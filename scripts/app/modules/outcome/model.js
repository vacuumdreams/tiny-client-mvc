export default class {
	constructor(response, params) {
		this.name = response.name;
		this._value = response.value;
		this.value = this.getValue(response.value);
		this.moduleClass = this.getClassName(response.name);
		[this.breakdown, this.breakdownBorder] = this.getBreakDown(response.breakdown, params.dasharray);
		this.distribution = this.getDistribution(response.distribution, params.dasharray);
	}

	dotify(value, character = '.') {
		return value.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, `$1${character}`);
	}

	getValue(value) {
		return this.dotify(value);
	}

	getClassName(name) {
		return name.toLowerCase();
	}

	getBreakDown(breakdown, dasharray) {
		let maxValue = 0,
			diagonal = (dasharray / 3.14) * 0.95,
			stepBy = diagonal / breakdown.length,
			offsetPoints = [],
			offsetBorder = [],
			closeTag = `${diagonal},${diagonal} ${diagonal * 0.05},${diagonal}`;

		breakdown.forEach((item) => {
			if (maxValue < item) {
				maxValue = item;
			}
		});

		breakdown.forEach((item, index) => {
			offsetPoints.push(`${0.05 * diagonal + (stepBy * index)},${diagonal * item / maxValue / 1.25}`);
			offsetBorder.push(`${0.05 * diagonal + (stepBy * index)},${diagonal * item / maxValue / 1.275}`);
		});

		offsetBorder.push(closeTag);
		offsetPoints.push(closeTag);

		return [offsetPoints.join(' '), offsetBorder.join(' ')];
	}

	getDistribution(distribution, dasharray) {
		let self = this;
		distribution.forEach((item) => {
			item.value = self.dotify(self._value * item.percent / 100);
			item.offset = self.getOffset(item.percent, (item.cssClass === 'mobile') ? dasharray : -dasharray);
		});

		return distribution;
	}

	getOffset(percent, base) {
		return base - (base * percent / 100);
	}
}