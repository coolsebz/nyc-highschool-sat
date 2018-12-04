import DataAggregator from './DataAggregator.worker';

export default class WebWorker {
	constructor() {
		return new DataAggregator();
	}
}
