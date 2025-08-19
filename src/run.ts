import {TestResults} from './test.js';
import ora from 'ora';
import {printResultsByFile, printSummary} from './output.js';
import {calculateFinalResults} from './calculateFinalResults.js';
import {workerPool} from './workerPool.js';
import {shouldExitWithError} from './shouldExitWithError.js';
import {getSpecFiles} from './getSpecFiles.js';

const testResultsByFile: TestResultsByFile = {};
let numCompletedTests = 0;

export type Flags = {
    failOnly: boolean
};
export type TestResultsByFile = {[file: string]: TestResults[]};
export type FinalResults = {
    numFiles: number
    numTests: number
    numSuccessfulTests: number
    filesWithNoTests: string[]
    numAssertions: number
    numSuccessfulAssertions: number
};

const status = ora();

export async function run(flags: Flags, filesGlob: string) {

    const specFiles = await getSpecFiles(filesGlob);

    console.log(`Found ${specFiles.length} spec files.\n`);
    status.start('Running tests...');
    await workerPool(specFiles, addTestResults);
    showResults(flags, specFiles);

}

/**
 * Add TestResults and update status.
 * @param file
 * @param results
 */
function addTestResults(file: string, results: TestResults) {

    numCompletedTests = numCompletedTests + 1;
    testResultsByFile[file] = (testResultsByFile[file] || []).concat([results]);
    status.text = `${numCompletedTests} tests completed.`;

}

function showResults(flags: Flags, specFiles: string[]) {

    status.stop();

    const finalResults = calculateFinalResults(specFiles, testResultsByFile);

    printResultsByFile(testResultsByFile, flags.failOnly);
    printSummary(finalResults);
    if (shouldExitWithError(finalResults)) process.exit(1);

}
