#!/usr/bin/env node

// Universal CLI entry point that works with both CJS and ESM
// and automatically handles TypeScript files using tsx (with ts-node fallback)

const { existsSync } = require('fs');
const { resolve } = require('path');

// Try to load the built CLI (production mode)
const builtCliPath = resolve(__dirname, '../dist/cli.js');

if (existsSync(builtCliPath)) {
    // Production mode - use built CLI
    const { runCLI } = require(builtCliPath);
    runCLI();
} else {
    // Development mode - try tsx first, fallback to ts-node
    try {
        require('tsx/cjs');
    } catch (error) {
        try {
            // Fallback to ts-node if tsx is not available
            require('ts-node/register');
        } catch (error) {
            // No TypeScript runtime available
            console.error('Error: No TypeScript runtime found. Please install either:');
            console.error('  npm install --save-dev tsx (recommended, faster)');
            console.error('  npm install --save-dev ts-node');
            process.exit(1);
        }
    }
    // Only try source in development when built files don't exist
    const { runCLI } = require('../src/cli');
    runCLI();
}
