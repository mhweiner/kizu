#!/usr/bin/env node

// Universal CLI entry point that works with both CJS and ESM
// and automatically handles TypeScript files using tsx (with ts-node fallback)

const { existsSync } = require('fs');
const { resolve } = require('path');

// Try to load the built CLI first (production mode)
const cjsCliPath = resolve(__dirname, '../dist/cjs/cli.js');
const esmCliPath = resolve(__dirname, '../dist/esm/cli.js');

if (existsSync(cjsCliPath)) {
    // Production mode - use built CJS
    const { runCLI } = require(cjsCliPath);
    runCLI();
} else if (existsSync(esmCliPath)) {
    // Production mode - use built ESM
    const { runCLI } = require(esmCliPath);
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
    const { runCLI } = require('../src/cli');
    runCLI();
}
