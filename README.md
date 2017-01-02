# promiser-to-lambda

Construct an AWS Lambda handler from a function that returns a promise.

## promiserToLambda(promiser)

Returns an event handler function for use with AWS Lambda. Accepts a single
`promiser` argument, a Lambda handler implemented in promise style. The
`promiser` takes the Lambda `event` and `context` as its two arguments, and is
expected to return a promise whose resolved value will be passed as the
successful result to the Lambda callback. Any error that is thrown within the
promise chain will be caught and returned as the error result of the Lambda
callback. If function throws an error outside of the promise chain, it will be
caught and handled similarly.

**Note:** Because of the way this wrapper is implemented with the Bluebird
library, the `promiser` function is not technically required to return a
Promise. It can return any value that you want to pass to the Lambda handler
callback.

**Note:** This wrapper will also set the `context.callbackWaitsForEmptyEventLoop`
flag to false, preventing Lambda from waiting for the event loop to empty
post-callback. This allows Lambda functions to, for instance, maintain frozen
database connection pools for quicker responses after cold starts.

### Example:

```
const Promise = require('bluebird');
const promiserToLambda = require('promiser-to-lambda');

const promiser = event => {
	return Promise.resolve(event.message)
		.delay(2000)
		.then(message => {
			console.log('Received:', message);
			let output = message.replace(/o/g, 'x');
			console.log('Returning:', output);
			return output;
		});
}

exports.handler = promiserToLambda(promiser);
```
