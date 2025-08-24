import {FinalResults} from './run';

export function shouldExitWithError(finalResults: FinalResults) {

    return !!finalResults.filesWithNoTests.length || finalResults.numSuccessfulTests / finalResults.numTests !== 1;

}
