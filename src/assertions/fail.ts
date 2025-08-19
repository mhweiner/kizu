import {Assertion} from '../test.js';

export function fail(assertions: Assertion[], description?: string) {

    assertions.push({pass: false, description: description ?? 'fail()'});

}
