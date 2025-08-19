import {FinalResults} from './run.js';

export function shouldExitWithError(finalResults: FinalResults) {

    return !!finalResults.filesWithNoTests.length || finalResults.numSuccessfulTests / finalResults.numTests !== 1;

}
