import {Assertion} from '../test.js';
import {deepStrictEqual} from '../lib/deepStrictEqual.js';
import * as util from 'util';
import chalk from 'chalk';
import {AssertionError} from './AssertionError.js';
import {getDiff} from '../lib/diff.js';

export function equal(assertions: Assertion[], actual: any, expected: any, description?: string) {

    const descWithDefault = description || 'equal()';

    if (deepStrictEqual(actual, expected)) {

        assertions.push({pass: true, description: descWithDefault});

    } else {

        const diagnostic = createDiagnostic(actual, expected);
        const stack = new AssertionError('not deeply and strictly equivalent').stack;

        assertions.push({pass: false, description: descWithDefault, diagnostic, stack});

    }

}

function createDiagnostic(actual: any, expected: any) {

    const diff = getDiff(actual, expected);
    const actualStr = util.inspect(actual, {colors: true, depth: null});
    const expectedStr = util.inspect(expected, {colors: true, depth: null});

    const sectionActual = `${chalk.gray.bold('Actual:')}\n\n${actualStr}`;
    const sectionExpected = `\n\n${chalk.gray.bold('Expected:')}\n\n${expectedStr}`;
    const sectionDiff = diff && `\n\n${chalk.gray.bold('Diff:')}\n\n${diff}`;

    return `${sectionActual}${sectionExpected}${sectionDiff}\n`;

}

