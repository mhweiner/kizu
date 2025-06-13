import kleur from 'kleur';
import {TestResultsByFile, FinalResults} from './run';
import {isTestPassing} from './isTestPassing';
import {Assertion, TestResults} from './test';
import {deserializeError, ErrorObject} from 'serialize-error';
import {sortTestResults} from './sortTestResults';

const log = console.log;
const successSymbol = kleur.green('✔');
const failureSymbol = kleur.red('✖');
const hr = kleur.gray('\n────────────────────────────────\n');

const noTestErrorTpl = (files: string[]) => kleur.red().bold(`
Error: ${files.length} spec file(s) have no tests. This could indicate a compilation error 
(ie. Typescript), or an early runtime error. All spec files must have at least one test. 
The following spec files do not have any attempted or completed tests:

${files.join(', ')}
`);

export function printResultsByFile(resultsByFile: TestResultsByFile, showOnlyFailures: boolean = false) {

    const sortedResults = sortTestResults(resultsByFile);

    for (const [filename, tests] of sortedResults) {

        printFileResults(filename, tests, showOnlyFailures);

    }

}

export function printFileResults(
    filename: string,
    tests: TestResults[],
    showOnlyFailures: boolean = false
) {

    const hasFailure = tests.some((test) => !isTestPassing(test));

    if (showOnlyFailures && !hasFailure) return;

    const header = `${kleur.underline().blue(filename)} ${hasFailure ? failureSymbol : successSymbol}\n`;

    log(header);
    tests.forEach(((test) => {

        if (showOnlyFailures && isTestPassing(test)) return;

        log(`${test.description} ${isTestPassing(test) ? successSymbol : failureSymbol}`);
        test.assertions.forEach((assertion) => {

            if (showOnlyFailures && assertion.pass) return;

            log(kleur.gray(`  ${assertion.description} ${assertion.pass ? successSymbol : failureSymbol}`));
            !assertion.pass && printFailedAssertionDiag(assertion);

        });
        test.error && printError(test.error);
        log('');

    }));

}

function printError(serializedError: ErrorObject) {

    log(hr);
    log(deserializeError(serializedError));
    log(hr);

}

function printFailedAssertionDiag(assertion: Assertion) {

    if (!assertion.diagnostic && !assertion.stack) return;

    log(hr);
    assertion.diagnostic && log(assertion.diagnostic);
    assertion.stack && log(kleur.grey(filterStackTrace(assertion.stack)));
    log(hr);

}

export function printSummary(finalResults: FinalResults) {

    const successRate = finalResults.numSuccessfulTests / finalResults.numTests;
    const assertionSuccessRate = finalResults.numSuccessfulAssertions / finalResults.numAssertions;
    const numFilesWithNoTests = finalResults.filesWithNoTests.length;

    if (assertionSuccessRate === 1) {

        log(kleur.bold().green(`${successSymbol} ${finalResults.numSuccessfulAssertions}/${finalResults.numAssertions} assertions passed`));

    } else {

        log(kleur.bold().red(`${failureSymbol} ${finalResults.numSuccessfulAssertions}/${finalResults.numAssertions} assertions passed`));

    }

    if (successRate === 1) {

        log(kleur.bold().green(`${successSymbol} ${finalResults.numSuccessfulTests}/${finalResults.numTests} tests passed`));

    } else {

        log(kleur.bold().red(`${failureSymbol} ${finalResults.numSuccessfulTests}/${finalResults.numTests} tests passed`));

    }

    numFilesWithNoTests && log(noTestErrorTpl(finalResults.filesWithNoTests));

}

function filterStackTrace(stack: string) {

    const ignoreRegex = [
        /at Generator.next \(<anonymous>\)/,
        /at new Promise \(<anonymous>\)/,
        /assertions\/index.[ts|js]{2}/,
        /\/kizu\/[src|dist]{3,4}\/test.[ts|js]{2}/,
    ].reduce((combined, exp) => (
        new RegExp(`${combined.source}|${exp.source}`)
    ), new RegExp('a^'));

    return stack.split('\n').reduce((acc, line) => (
        !ignoreRegex.test(line) ? acc.concat([line]) : acc
    ), [] as string[]).join('\n');

}
