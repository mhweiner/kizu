import {cpus} from 'os';
import {fork} from 'child_process';
import {TestResults} from './test';
import {toResult} from './lib/toResult';
import {extname} from 'path';

const numCores = cpus().length; // will be the size of our worker pool

let numWorkers = 0;
let currentSpecFileIndex = 0;

function getTypeScriptRuntime(): string[] {

    try {

        // Try to use tsx first (much faster)
        require.resolve('tsx/cjs');
        console.log('Using tsx for TypeScript compilation');
        return ['-r', 'tsx/cjs'];

    } catch (error) {

        // tsx not found
        throw new Error('tsx not found. You can install it with `npm install --save-dev tsx`');

    }

}

function createWorker(file: string): any {

    const isTypeScript = extname(file) === '.ts';

    let execArgv: string[] = [];

    if (isTypeScript) {

        execArgv = getTypeScriptRuntime();

    }

    const [err, worker] = toResult(() => fork(file, [], {execArgv}));

    if (err) {

        throw new Error(`failed to create worker for ${file}`);

    }

    return worker;

}

function setupWorker(
    worker: any,
    file: string,
    addTestResults: (file: string, testResults: TestResults) => void,
    next: () => void,
    reject: (error: Error) => void
) {

    worker.on('close', (code: number) => {

        console.log(`Worker for ${file} closed with code: ${code}`);
        numWorkers--;
        next();

    });

    worker.on('error', (error: Error) => {

        console.error(`Worker for ${file} error:`, error);
        numWorkers--;
        reject(new Error(`Worker process error for ${file}: ${error.message}`));

    });

    worker.on('message', (msg: any) => addTestResults(file, msg as TestResults));

}

export function workerPool(
    specFiles: string[],
    addTestResults: (file: string, testResults: TestResults) => void
): Promise<void> {

    return new Promise((resolve, reject) => {

        function next() {

            if (currentSpecFileIndex >= specFiles.length && numWorkers === 0) resolve();
            if (currentSpecFileIndex >= specFiles.length) return;
            if (numWorkers >= numCores) return;

            const file = specFiles[currentSpecFileIndex];

            let worker: any;

            try {

                worker = createWorker(file);

            } catch (error) {

                return reject(error);

            }

            numWorkers++;
            currentSpecFileIndex++;

            setupWorker(worker, file, addTestResults, next, reject);
            next();

        }

        next();

    });

}
