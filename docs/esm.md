# Module System Support (ESM & CJS)

kizu works seamlessly with both **CommonJS (CJS)** and **ES Modules (ESM)** projects. Here's how it handles different module systems:

## **How It Works**

kizu uses a **hybrid approach** that gives you the best of both worlds:

- **Test Runner**: Runs in CommonJS mode for maximum compatibility
- **Your Test Code**: Can use any module system (CJS or ESM)
- **TypeScript Compilation**: Uses `tsx` for fast TypeScript compilation

## **ESM Projects**

If your project uses ESM (`"type": "module"` in package.json):

```typescript
// test.spec.ts - Your test files can use ESM syntax
import { test } from 'kizu';
import { myESMFunction } from './myESMModule.js'; // ESM imports work fine

test('ESM test', (assert) => {
  const result = myESMFunction();
  assert.equal(result, 'expected');
});
```

**What happens:**
1. kizu uses `tsx` to compile your TypeScript files to JavaScript
2. Runs the compiled code (which preserves your ESM imports/exports)
3. Your ESM code works exactly as expected

## **CJS Projects**

If your project uses CommonJS:

```typescript
// test.spec.ts - Your test files can use CJS syntax
import { test } from 'kizu';
const { myFunction } = require('./myModule'); // CJS imports work fine

test('CJS test', (assert) => {
  const result = myFunction();
  assert.equal(result, 'expected');
});
```

## **Why This Approach?**

**Benefits:**
- ✅ **Works everywhere** - No module system conflicts
- ✅ **Uses your TypeScript setup** - Respects your tsconfig
- ✅ **No build step needed** - Runs tests immediately
- ✅ **Predictable behavior** - Same experience across projects

**Technical Details:**
- kizu uses `tsx` for TypeScript compilation (fast and reliable)
- This prevents module system conflicts in the test runner
- Your test code can still use any module system
- The compilation preserves your original module syntax

## **Mocking Dependencies**

**For CJS modules:** Use [cjs-mock](https://github.com/mhweiner/cjs-mock) for easy dependency mocking:

```typescript
import { test } from 'kizu';
import { mock } from 'cjs-mock';

test('mocked test', (assert) => {
  const mockedModule = mock('./myModule', {
    './dependency': { someFunction: () => 'mocked' }
  });
  
  assert.equal(mockedModule.doSomething(), 'mocked');
});
```

**For ESM modules:** ESM mocking is more complex and not fully supported by most tools. Jest has some ESM mocking capabilities, but they're limited and can be unreliable. For the best testing experience, consider using CJS for modules you need to mock.

If you have any issues running in ESM projects, please [open an issue](https://github.com/mhweiner/kizu/issues).