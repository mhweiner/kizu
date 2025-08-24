import {Command} from 'commander';
import {Flags, run} from './run';

// Simple package.json import that works for both ESM and CommonJS
const packageJson = {
    version: '0.0.0-autorel', // This will be replaced during build
};

export async function runCLI() {

    const program = new Command();

    program
        .name('kizu')
        .version(packageJson.version, '--version, -v')
        .description('⚫️ kizu\n\nAn easy-to-use, fast, and defensive Typescript/Javascript test runner designed to help you to write simple, readable, and maintainable tests.')
        .option('--fail-only, -f', 'Only show failures in the output.', false)
        .argument('<glob>', 'Glob pattern to match files to run tests on.')
        .parse(process.argv);

    const flags = program.opts() as Flags;
    const filesGlob = program.args[0];

    return run(flags, filesGlob).catch(console.log.bind(console));

}


