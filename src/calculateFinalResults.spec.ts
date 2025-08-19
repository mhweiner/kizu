/* eslint-disable max-lines-per-function */

import {test} from './test.js';
import {calculateFinalResults} from './calculateFinalResults.js';
import {TestResultsByFile} from './run.js';
import {serializeError} from 'serialize-error';

test('4 files, 2/5 tests pass, 1 file without tests, 1 test with error', (assert) => {

    // given
    const specFiles = ['./fake/a.ts', './fake/b.ts', './fake/c.ts', './fake/d.ts'];
    const testResults: TestResultsByFile = {
        './fake/a.ts': [
            {
                description: 'this test should have 1 assertion and pass',
                assertions: [{pass: true, description: 'assertion 1'}],
            },
            {
                description: 'this test should have 2 assertions and passes, one fails',
                assertions: [
                    {pass: true, description: 'assertion 1'},
                    {pass: false, description: 'assertion 2'},
                ],
            },
        ],
        './fake/b.ts': [
            {
                description: 'this test should have 1 assertion and pass',
                assertions: [{pass: true, description: 'assertion 1'}],
            },
            {
                description: 'this test should fail because it has an error',
                assertions: [],
                error: serializeError(new Error()),
            },
        ],
        './fake/c.ts': [
            {
                description: 'this test should have 1 assertion and fail',
                assertions: [{description: 'fail', pass: false}],
            },
        ],
    };

    // when
    const results = calculateFinalResults(specFiles, testResults);

    // then
    assert.equal(results, {
        numFiles: 3,
        numTests: 5,
        numSuccessfulTests: 2,
        filesWithNoTests: ['./fake/d.ts'],
        numAssertions: 5,
        numSuccessfulAssertions: 3,
    });

});
