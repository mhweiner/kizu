import {Assertion} from '../test';
import * as util from 'util';
import chalk from 'chalk';
import {AssertionError} from './AssertionError';

export function isFalse(assertions: Assertion[], condition: boolean, description?: string) {

    const descWithDefault = description || 'isFalse()';

    if (!condition) {

        assertions.push({pass: true, description: descWithDefault});

    } else {

        const diagnostic = createDiagnostic(condition);
        const stack = new AssertionError('is not false').stack;

        assertions.push({pass: false, description: descWithDefault, diagnostic, stack});

    }

}

function createDiagnostic(actual: any) {

    const actualStr = util.inspect(actual, {colors: true, depth: null});

    const sectionActual = `${chalk.gray.bold('Actual:')}\n\n${actualStr}`;

    return `${sectionActual}\n`;

}

