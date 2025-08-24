/* eslint-disable max-lines-per-function */
import {test, TestResults} from './test';
import {sortTestResults} from './sortTestResults';
import {TestResultsByFile} from './run';

test('sortTestResults should return empty map if there are no test results', (assert) => {

    const resultsByFile = {};

    const sortedResults = sortTestResults(resultsByFile);

    assert.equal(sortedResults.size, 0);

});

test(
    'sortTestResults should return map with failing tests last and failing assertions last',
    (assert) => {

        const resultsByFile: TestResultsByFile = {
            fileWithFailingTests: [
                {
                    description: 'test1',
                    assertions: [
                        {pass: true, description: 'equals'},
                    ],
                },
                {
                    description: 'test2',
                    assertions: [
                        {pass: true, description: 'equals'},
                        {pass: true, description: 'equals'},
                        {pass: false, description: 'equals'},
                        {pass: true, description: 'equals'},
                        {pass: true, description: 'equals'},
                    ],
                },
                {
                    description: 'test3',
                    assertions: [
                        {pass: true, description: 'equals'},
                    ],
                },
                {
                    description: 'test4',
                    assertions: [
                        {pass: true, description: 'equals'},
                        {pass: false, description: 'equals'},
                        {pass: true, description: 'equals'},
                    ],
                },
            ],
            fileWithPassingTests: [
                {
                    description: 'test1',
                    assertions: [
                        {pass: true, description: 'equals'},
                    ],
                },
            ],
        };
        const expected: Map<string, TestResults[]> = new Map([
            ['fileWithPassingTests', resultsByFile.fileWithPassingTests],
            ['fileWithFailingTests', [
                {
                    description: 'test1',
                    assertions: [
                        {pass: true, description: 'equals'},
                    ],
                },
                {
                    description: 'test3',
                    assertions: [
                        {pass: true, description: 'equals'},
                    ],
                },
                {
                    description: 'test2',
                    assertions: [
                        {pass: true, description: 'equals'},
                        {pass: true, description: 'equals'},
                        {pass: true, description: 'equals'},
                        {pass: true, description: 'equals'},
                        {pass: false, description: 'equals'},
                    ],
                },
                {
                    description: 'test4',
                    assertions: [
                        {pass: true, description: 'equals'},
                        {pass: true, description: 'equals'},
                        {pass: false, description: 'equals'},
                    ],
                },
            ]],
        ]);

        const result = sortTestResults(resultsByFile);

        assert.equal(result, expected);

    }
);
