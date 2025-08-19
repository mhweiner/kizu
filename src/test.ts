import {createAssertionPredicates, AssertionAPI} from './assertions/index.js';
import {serializeError, ErrorObject} from 'serialize-error';
import {toResultAsync} from './lib/toResult.js';

export type TestResults = {
    description: string
    assertions: Assertion[]
    error?: ErrorObject
};

export type Assertion = {
    pass: boolean
    description: string
    diagnostic?: string
    stack?: string
};

process.on('unhandledRejection', (err: any) => {

    sendTestResults({
        description: 'Unhandled Promise Rejection',
        assertions: [],
        error: serializeError(err),
    });

});

export async function test(description: string, experiment: (assert: AssertionAPI) => void) {

    const assertions: Assertion[] = [];
    const expAsync = async () => experiment(createAssertionPredicates(assertions));
    const [err] = await toResultAsync(expAsync());

    if (err) {

        sendTestResults({
            description,
            assertions: [],
            error: serializeError(err),
        });

    } else {

        sendTestResults({description, assertions});

    }

}

function sendTestResults(results: TestResults) {

    // @ts-ignore
    process.send(results);

}
