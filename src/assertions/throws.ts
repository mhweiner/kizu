import {Assertion} from '../test.js';
import {isError} from './isError.js';

export async function throws(
    assertions: Assertion[],
    experiment: () => any,
    expectedErr: Error|RegExp,
    description?: string
) {

    if (typeof experiment !== 'function')
        throw new Error('experiment must be a function');
    if (!(expectedErr instanceof Error) && !(expectedErr instanceof RegExp))
        throw new Error('expectedErr is not an instance of Error or a RegExp');

    let actualErr: Error | undefined;

    try {

        const result = experiment();

        // Check if the result is a Promise
        if (result && typeof result.then === 'function') {

            // Handle async function - wait for the promise to resolve or reject
            await result;
            // If we get here, the promise resolved without throwing
            throw new Error('experiment did not throw an error');

        }
        // If we get here, the sync function completed without throwing
        throw new Error('experiment did not throw an error');

    } catch (e) {

        actualErr = e as Error;

    }

    if (!actualErr) {

        throw new Error('experiment did not throw an error');

    }

    isError(assertions, actualErr, expectedErr, description || 'throws()');

}
