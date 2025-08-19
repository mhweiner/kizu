#!/usr/bin/env node

// Support both ESM and CommonJS
async function main() {
  try {
    // Try ESM first
    const { runCLI } = await import('../dist/esm/cli.js');
    await runCLI();
  } catch (error) {
    // Fallback to CommonJS
    try {
      // Use dynamic import for CommonJS as well to avoid require issues
      const { runCLI } = await import('../dist/cjs/src/cli.js');
      await runCLI();
    } catch (cjsError) {
      console.error('Failed to load kizu CLI:', error.message || error);
      process.exit(1);
    }
  }
}

main().catch(error => {
  console.error('Failed to start kizu:', error.message || error);
  process.exit(1);
});
