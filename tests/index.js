'use strict';

const tests = require('./tests');

Object.keys(tests).forEach(key => {
	tests[key](
		{ hello: 'world' },
		{},
		(err, data) => {
			if (err) {
				console.error(`${key} Lambda handler failed:`, err);
			} else {
				console.log(`${key} Lambda handler succeeded:`, data);
			}
			console.log('');
		}
	);
});
