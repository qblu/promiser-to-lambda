'use strict';

const Promise = require('bluebird');
const promiserToLambda = require('../index');

module.exports.promiseSucceedResolve = promiserToLambda(() => {
	return Promise.resolve('This should succeed')
		.delay(1000);
});

module.exports.promiseSucceedRaw = promiserToLambda(() => {
	return 'This should also succeed';
});

module.exports.promiseFailThrow = promiserToLambda(() => {
	throw new Error('This should fail');
});

module.exports.promiseFailReject = promiserToLambda(() => {
	return Promise.resolve('foobar')
		.delay(1000)
		.then(() => { throw new Error('This should also fail'); });
});
