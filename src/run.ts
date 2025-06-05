import {TestResults} from './test';
import ora from 'ora';
import {printResultsByFile, printSummary} from './output';
import {calculateFinalResults} from './calculateFinalResults';
import {workerPool} from './workerPool';
import {shouldExitWithError} from './shouldExitWithError';
import {getSpecFiles} from './getSpecFiles';

const testResultsByFile: TestResultsByFile = {};
let numCompletedTests = 0;

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

async function start() {

    const specFiles = await getSpecFiles();

    console.log(`Found ${specFiles.length} spec files.\n`);
    status.start('Running tests...');
    await workerPool(specFiles, addTestResults);
    finish(specFiles);

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

function finish(specFiles: string[]) {

    status.stop();

    const finalResults = calculateFinalResults(specFiles, testResultsByFile);

    printResultsByFile(testResultsByFile);
    printSummary(finalResults);
    if (shouldExitWithError(finalResults)) process.exit(1);

}

start().catch(console.log.bind(console));
