import {isTestPassing} from './isTestPassing.js';
import {TestResultsByFile} from './run.js';
import {TestResults} from './test.js';

export function sortTestResults(resultsByFile: TestResultsByFile): Map<string, TestResults[]> {

    const sortedResults = new Map<string, TestResults[]>();

    const passingFiles: [string, TestResults[]][] = [];
    const failingFiles: [string, TestResults[]][] = [];

    // Separate passing and failing files
    for (const [file, tests] of Object.entries(resultsByFile)) {

        const hasFailingTests = tests.some((test) => !isTestPassing(test));

        if (hasFailingTests) {

            failingFiles.push([file, tests]);

        } else {

            passingFiles.push([file, tests]);

        }

    }

    // Sort passing files first, failing files last
    const sortedFiles = [...passingFiles, ...failingFiles];

    for (const [file, tests] of sortedFiles) {

        // Sort tests: passing tests first, failing tests last
        const sortedTests = [...tests].sort((a, b) => Number(isTestPassing(b)) - Number(isTestPassing(a)));

        // Sort assertions inside each test: passing assertions first
        for (const test of sortedTests) {

            test.assertions.sort((a, b) => Number(b.pass) - Number(a.pass));

        }

        sortedResults.set(file, sortedTests);

    }

    return sortedResults;

}
