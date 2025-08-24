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
            return ['-r', 'ts-node/register'];

        } catch (error) {

            // No TypeScript runtime available
            throw new Error('No TypeScript runtime found. Please install either:\n  npm install --save-dev tsx (recommended, faster)\n  npm install --save-dev ts-node');

        }

    }

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

            // Use tsx for TypeScript files (faster than ts-node), fallback to ts-node if not available
            const isTypeScript = extname(file) === '.ts';
            const execArgv = isTypeScript ? getTypeScriptRuntime() : [];

            const [err, worker] = toResult(() => fork(file, [], {execArgv}));

            if (err) {

                return reject(new Error(`failed to create worker for ${file}`));

            }

            numWorkers++;
            currentSpecFileIndex++;
            worker.on('close', () => {

                numWorkers--;
                next();

            });
            worker.on('message', (msg) => addTestResults(file, msg as TestResults));
            next();

        }

        next();

    });

}
