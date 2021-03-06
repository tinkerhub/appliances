'use strict';

const Appliance = require('../appliance');
const { State } = require('abstract-things');

module.exports = Appliance.type(BaseAppliance => class Sensor extends BaseAppliance.with(State) {
	/**
	 * Mark appliance as a `sensor`.
	 */
	static get type() {
		return 'sensor';
	}

	static availableAPI(builder) {
		builder.action('values')
			.description('Get all sensor values')
			.returns('object')
			.done();
	}

	value(sensorType) {
		return this.getState(sensorType);
	}

	get sensorTypes() {
		return [];
	}

	values() {
		const result = {};
		for(const type of this.sensorTypes) {
			result[type] = this.getState(type);
		}
		return result;
	}

	updateValue(sensorType, value) {
		if(this.updateState(sensorType, value)) {
			this.emitEvent(sensorType, value);
			return true;
		} else {
			return false;
		}
	}
});
