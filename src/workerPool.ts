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
        return ['-r', 'tsx/cjs'];

    } catch (error) {

        try {

            // Fallback to ts-node if tsx is not available
            require.resolve('ts-node/register');

            console.warn('Warning: tsx not found, using ts-node as a fallback. This is slower. We recommend installing tsx (npm install --save-dev tsx) for much faster execution.');

            return ['-r', 'ts-node/register'];

        } catch (error) {

            // No TypeScript runtime available
            throw new Error('No TypeScript runtime found. Please install either:\n  npm install --save-dev tsx (recommended, faster)\n  npm install --save-dev ts-node');

        }

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
            worker.on('close', () => {

                numWorkers--;
                next();

            });
            worker.on('message', (msg: any) => addTestResults(file, msg as TestResults));
            next();

        }

        next();

    });

}
