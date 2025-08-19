import {diff as diffObj} from 'deep-object-diff';
import {diffChars as diffStr} from 'diff';
import chalk from 'chalk';
import {inspect} from 'node:util';

export function getDiff(actual: any, expected: any) {

    if (actual === expected) return '';

    if (typeof actual === 'string' && typeof expected === 'string') {

        return stringVisualDiff(actual, expected);

    } else if (typeof actual === 'object' && typeof expected === 'object') {

        return inspect(diffObj(actual, expected), {
            colors: true,
            depth: null,
        });

    } else {

        return '';

    }

}

export function stringVisualDiff(actual: string, expected: string) {

    return diffStr(actual, expected).reduce((str, part) => str + (
        part.added ? chalk.bgGreen.black(part.value) : part.removed
            ? chalk.bgRed.white(part.value) : chalk.white(part.value)
    ), '');

}
