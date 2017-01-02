'use strict';

const Promise = require('bluebird');

const promiserToLambda = promiser => {
	return (event, context, callback) => {
		context.callbackWaitsForEmptyEventLoop = false;
		try {
			Promise.resolve([event, context])
				.spread(promiser)
				.then(callback.bind(null, null))
				.catch(callback);
		} catch (error) {
			callback(error);
		}
	};
};

module.exports = promiserToLambda;
