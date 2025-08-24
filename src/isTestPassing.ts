import {TestResults} from './test';

/**
 * All assertions must pass, with no errors, and at least one assertion.
 * @param test
 */
export function isTestPassing(test: TestResults) {

    if (!test.assertions.length) return false;
    if (test.error) return false;

    return test.assertions.reduce((pass, assertion) => pass && assertion.pass, true);

}
