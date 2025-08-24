import {Assertion} from '../test';

export function fail(assertions: Assertion[], description?: string) {

    assertions.push({pass: false, description: description ?? 'fail()'});

}
