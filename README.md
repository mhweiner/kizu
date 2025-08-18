<picture>
    <source srcset="docs/kizu-logo-light.svg" media="(prefers-color-scheme: light)">
    <source srcset="docs/kizu-logo-dark.svg" media="(prefers-color-scheme: dark)">
    <img src="docs/kizu-logo-light.svg" alt="Logo">
</picture>

[![build status](https://github.com/mhweiner/kizu/actions/workflows/release.yml/badge.svg)](https://github.com/mhweiner/kizu/actions)
[![SemVer](https://img.shields.io/badge/SemVer-2.0.0-blue)]()
[![Conventional Commits](https://img.shields.io/badge/Conventional%20Commits-1.0.0-yellow.svg)](https://conventionalcommits.org)
[![AutoRel](https://img.shields.io/badge/%F0%9F%9A%80%20AutoRel-2D4DDE)](https://github.com/mhweiner/autorel)

Kizu is a fast, minimalist test runner for TypeScript and JavaScript, with a small, easy-to-learn API that lets you focus on your tests — not your tooling.

Designed to help you write simple, readable, and maintainable tests.

## Features

### **🚀 Fast & Reliable**
- Multi-process parallel test runner. Each test file is run in its own process/runtime for performance and isolation benefits. _Use on a multicore machine for best results._
- Optimized for speed and simplicity.
- Minimal dependencies.

### **😀 Easy to Use**
- Very simple functional [assertion API](docs/api.md). No need to learn a DSL or framework.
- **One assertion method does it all**: `assert.equal()` handles primitives, objects, arrays, Maps, Sets, and even RegExp pattern matching!
- Built-in [powerful diff visualization tool](/docs/visualDiff.md)
- Clean, organized output.
- Failed tests are easy to find, grouped at the end of the output.
- Errors or unhandled promise rejections are buffered and grouped under the test file in the output. This helps you know where they came from.
- Clean stack traces with no extra noise.

### **🛡 Defensive**
- Uncaught errors and unhandled promise rejections will cause the test to fail.
- Any spec files without tests, or tests without assertions, result in a failed test.
- Strict and deep equality comparison by default.

### **🔒 Out-of-the-box Typescript support**
- No special configuration needed, and no plugins to install. 
- Works great with [c8](https://github.com/bcoe/c8) for code coverage.
- Handles compilation errors gracefully.

### **✨ Powerful `assert.equal()` - One Assertion to Rule Them All**
The `assert.equal()` method is incredibly versatile and handles most of your testing needs:

- **Primitive comparison**: Numbers, strings, booleans, null, undefined
- **Deep object equality**: Compares nested objects, arrays, Maps, and Sets
- **RegExp pattern matching**: Test string values against RegExp patterns in the expected value
- **Mixed comparisons**: Combine exact values and RegExp patterns in the same object
- **Visual diffs**: Beautiful, detailed output when assertions fail
- **Type safety**: Full TypeScript support with proper type checking

Note: `assert.equal()` compares values by value (deep equality), not by reference.

This single assertion method eliminates the need for multiple specialized assertion methods or complex mocking while providing powerful, flexible testing capabilities.

## Quick Examples

For more examples, see the [examples](examples) and [src](src) folders.

```bash
# Run all tests in the src directory and its subdirectories, and only show failures in the output.
npx kizu 'src/**/*.test.ts' --fail-only
# Run a specific test file
npx kizu 'src/example.test.ts'
```

```typescript
// example.test.ts

import {test} from 'kizu';

// Basic test
function greet(name: string): string {
  return `hello, ${name}`;
}

test('greet', (assert) => {
  assert.equal(greet('world'), 'hello, world');
});

// Deep object comparison
test('user object', (assert) => {
  const actual = {
    name: 'John',
    age: 30,
    email: 'john@example.com',
    preferences: {
      theme: 'dark',
      notifications: true
    }
  };
  
  const expected = {
    name: 'John',
    age: 30,
    email: 'john@example.com',
    preferences: {
      theme: 'dark',
      notifications: true
    }
  };
  
  assert.equal(actual, expected); // Deep equality comparison
});

// RegExp pattern matching ✨ NEW!
test('email validation', (assert) => {
  const email = 'user@example.com';
  
  // Match email pattern
  assert.equal(email, /^[^@]+@[^@]+\.[^@]+$/);
  
  // Match domain
  assert.equal(email, /@example\.com$/);
  
  // Match username
  assert.equal(email, /^user@/);
});

// Complex data structures
test('complex data', (assert) => {
  const actual = {
    users: [
      { name: 'Alice', email: 'alice@company.com' },
      { name: 'Bob', email: 'bob@company.com' }
    ],
    metadata: {
      count: 2,
      lastUpdated: '2024-01-15'
    }
  };
  
  const expected = {
    users: [
      { name: 'Alice', email: /@company\.com$/ }, // RegExp in nested objects!
      { name: 'Bob', email: /@company\.com$/ }
    ],
    metadata: {
      count: 2,
      lastUpdated: /^\d{4}-\d{2}-\d{2}$/ // Date pattern
    }
  };
  
  assert.equal(actual, expected);
});

// Error handling
function throwError(): never {
  throw new Error('oops');
}

test('throwError', (assert) => {
  assert.throws(() => throwError(), /oops/);
});

// Async test
async function fetchData(): Promise<string> {
  return Promise.resolve('data');
}

test('fetchData', async (assert) => {
  const data = await fetchData();
  assert.equal(data, 'data');
});
```

## Table of Contents

- [Quick Start](docs/quickStart.md)
- [CLI](docs/cli.md)
- [Test API](docs/api.md)
- [Visual Diff Tool](docs/visualDiff.md)
- [Example Tests](examples)
- [Best Practices](docs/bestPractices.md)
- [Inspiration, Philosophy & Attribution](docs/inspiration.md)
- [FAQ](docs/faq.md)
- [Support, Feedback, and Contributions](#support-feedback-and-contributions)
- [Sponsorship](#sponsorship)
- [License](LICENSE)

## Getting Started

To install and get started with `kizu`, see our [Getting Started](docs/gettingStarted.md) guide.
See the [examples](examples) and [src](src) folders for more examples.

## Support, feedback, and contributions

- Star this repo if you like it!
- Submit an [issue](https://github.com/mhweiner/kizu/issues) with your problem, feature request or bug report
- Issue a PR against `main` and request review. Make sure all tests pass and coverage is good.
- Write about this project in your blog, tweet about it, or share it with your friends!

## Sponsorship
<br>
<picture>
    <source srcset="docs/aeroview-white.svg" media="(prefers-color-scheme: dark)">
    <source srcset="docs/aeroview-black.svg" media="(prefers-color-scheme: light)">
    <img src="docs/aeroview-black.svg" alt="Logo" height="20">
</picture>
<br>

Aeroview is a lightning-fast, developer-friendly, AI-powered logging IDE. Get started for free at [https://aeroview.io](https://aeroview.io).

Want to sponsor this project? [Reach out](mailto:mhweiner234@gmail.com?subject=I%20want%20to%20sponsor%20kizu).

## Related projects

- [cjs-mock](https://github.com/mhweiner/cjs-mock): NodeJS module mocking for CJS (CommonJS) modules for unit testing purposes.
- [autorel](https://github.com/mhweiner/autorel): Automate semantic releases based on conventional commits. Similar to semantic-release but much simpler.
- [brek](https://github.com/mhweiner/brek): A powerful yet simple configuration library for Node.js. It’s structured, typed, and designed for dynamic configuration loading, making it perfect for securely managing secrets (e.g., AWS Secrets Manager).
- [jsout](https://github.com/mhweiner/jsout): A Syslog-compatible, small, and simple logger for Typescript/Javascript projects.