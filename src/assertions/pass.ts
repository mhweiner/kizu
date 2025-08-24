import {Assertion} from '../test';

export function pass(assertions: Assertion[], description?: string) {

    assertions.push({pass: true, description: description ?? 'pass()'});

}
