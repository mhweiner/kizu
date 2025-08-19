/* eslint-disable max-lines-per-function */
import {test} from './test.js';
import {isTestPassing} from './isTestPassing.js';
import {serializeError} from 'serialize-error';

test('isTestPassing()', (assert) => {

    assert.isTrue(isTestPassing({
        description: 'test',
        assertions: [
            {pass: true, description: 'assertion 1'},
            {pass: true, description: 'assertion 2'},
            {pass: true, description: 'assertion 3'},
        ],
    }), 'test passes if all assertions pass');

    assert.isFalse(isTestPassing({
        description: 'test',
        assertions: [
            {pass: true, description: 'assertion 1'},
            {pass: false, description: 'assertion 2'},
            {pass: true, description: 'assertion 3'},
        ],
    }), 'test fails if one or more assumptions fail');

    assert.isFalse(isTestPassing({
        description: 'test',
        assertions: [],
    }), 'test fails if no assertions');

    assert.isFalse(isTestPassing({
        description: 'test',
        assertions: [
            {pass: true, description: 'assertion 1'},
        ],
        error: serializeError(new Error()),
    }), 'test fails if there is an error, even if all assertions pass');

});
