#!/usr/bin/env node

// Universal CLI entry point that works with both CJS and ESM
// and automatically handles TypeScript files using tsx

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
    // Development mode - use tsx for better performance
    require('tsx/cjs');
    const { runCLI } = require('../src/cli');
    runCLI();
}
