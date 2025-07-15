import {Assertion} from '../test';
import {isError} from './isError';
import {equal} from './equal';
import {throws} from './throws';
import {isTrue} from './isTrue';
import {isFalse} from './isFalse';
import {fail} from './fail';
import {pass} from './pass';

export type AssertionAPI = {
    pass: (description?: string) => void
    fail: (description?: string) => void
    isTrue: (condition: boolean, description?: string) => void
    isFalse: (condition: boolean, description?: string) => void
    equal: (actual: any, expected: any, description?: string) => void
    isError: (actual: any, expected: any, description?: string) => void
    errorsEquivalent: (actual: any, expected: any, description?: string) => void // deprecated
    throws: (experiment: () => any, expectedErr: Error|RegExp, description?: string) => Promise<void>
};

export function createAssertionPredicates(assertions: Assertion[]): AssertionAPI {

    return {
        pass: (description?: string) => pass(assertions, description),
        fail: (description?: string) => fail(assertions, description),
        isTrue: (condition: boolean, description?: string) => isTrue(assertions, condition, description),
        isFalse: (condition: boolean, description?: string) => isFalse(assertions, condition, description),
        equal: (actual: any, expected: any, description?: string) => (
            equal(assertions, actual, expected, description)
        ),
        isError: (actual: any, expected: any, description?: string) => (
            isError(assertions, actual, expected, description)
        ),
        errorsEquivalent: (actual: any, expected: any, description?: string) => (
            isError(assertions, actual, expected, description)
        ), // deprecated
        throws: (experiment: () => any, expectedErr: Error|RegExp, description?: string) => (
            throws(assertions, experiment, expectedErr, description)
        ),
    };

}
