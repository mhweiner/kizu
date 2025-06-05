<picture>
    <source srcset="docs/kitest-logo-light.svg" media="(prefers-color-scheme: light)">
    <source srcset="docs/kitest-logo-dark.svg" media="(prefers-color-scheme: dark)">
    <img src="docs/kitest-logo-light.svg" alt="Logo" style="margin: 0 0 10px" size="250">
</picture>

[![build status](https://github.com/mhweiner/kitest/actions/workflows/release.yml/badge.svg)](https://github.com/mhweiner/kitest/actions)
[![SemVer](https://img.shields.io/badge/SemVer-2.0.0-blue)]()
[![Conventional Commits](https://img.shields.io/badge/Conventional%20Commits-1.0.0-yellow.svg)](https://conventionalcommits.org)
[![AutoRel](https://img.shields.io/badge/v2-AutoRel?label=AutoRel&labelColor=0ab5fc&color=grey&link=https%3A%2F%2Fgithub.com%2Fmhweiner%2Fautorel)](https://github.com/mhweiner/autorel)

**kitest** is a fast, minimalist test runner for TypeScript and JavaScript, with a small, easy-to-learn API that lets you focus on your tests — not your tooling.

Fast, minimal, precise, safe, atomic, and easy to use.

## Features

**🚀 Fast & Reliable**
- Multi-process parallel test runner. Each test file is run in its own process/runtime for performance and isolation benefits. _Use on a multicore machine for best results._
- Optimized for speed and simplicity.
- Minimal dependencies.

**😀 Easy to Use**
- Very simple functional [assertion API](docs/api.md). No need to learn a DSL or framework.
- Built-in [powerful diff visualization tool](#visual-diff-tool) and clean, organized output.
- Failed tests are easy to find, grouped at the end of the output.
- Errors or unhandled promise rejections are buffered and grouped under the test file in the output. This helps you know where they came from.
- Clean stack traces with no extra noise.

**🛡 Defensive**
- Uncaught errors and unhandled promise rejections will cause the test to fail.
- Any spec files without tests, or tests without assertions, result in a failed test.
- Strict and deep equality comparison by default.

**🔒 Out-of-the-box Typescript support**
- No special configuration needed, and no plugins to install. 
- Works great with [c8](https://github.com/bcoe/c8) for code coverage.
- Handles compilation errors gracefully.

# Quick Examples

```typescript
import {test} from 'kitest';

// Basic test

function greet(name: string): string {
  return `hello, ${name}`;
}

test('greet()', (assert) => {
  assert.equal(hello('world'), 'hello, world');
});

// Error handling

function throwError(): never {
  throw new Error('oops');
}

test('throwError()', (assert) => {
  assert.throws(() => throwError(), /oops/);
});

// Async test

async function fetchData(): Promise<string> {
  return Promise.resolve('data');
}

test('fetchData()', async (assert) => {
  const data = await fetchData();
  assert.equal(data, 'data');
});
```

# Table of Contents

- [Getting Started](docs/gettingStarted.md)
- [Examples](#examples)
- [API](docs/api.md)
- [Visual Diff Tool](docs/visualDiff.md)
- [Best Practices](docs/bestPractices.md)
- [Inspiration, Philosophy & Attribution](docs/inspiration.md)
- [FAQ](docs/faq.md)
- [Support, Feedback, and Contributions](#support-feedback-and-contributions)
- [Sponsorship](#sponsorship)
- [License](LICENSE)

# Getting Started

To install and get started with `kitest`, see our [Getting Started](docs/gettingStarted.md) guide.

# Examples

See the [examples](examples) and [src](src) folders for more examples.

# Support, feedback, and contributions

- Star this repo if you like it!
- Submit an [issue](https://github.com/mhweiner/kitest/issues) with your problem, feature request or bug report
- Issue a PR against `main` and request review. Make sure all tests pass and coverage is good.
- Write about this project in your blog, tweet about it, or share it with your friends!

# Sponsorship
<br>
<picture>
    <source srcset="docs/aeroview-white.svg" media="(prefers-color-scheme: dark)">
    <source srcset="docs/aeroview-black.svg" media="(prefers-color-scheme: light)">
    <img src="docs/aeroview-black.svg" alt="Logo" height="20">
</picture>
<br>

Aeroview is a lightning-fast, developer-friendly, AI-powered logging IDE. Get started for free at [https://aeroview.io](https://aeroview.io).

Want to sponsor this project? [Reach out](mailto:mhweiner234@gmail.com?subject=I%20want%20to%20sponsor%20kitest).

# Other useful libraries

- [autorel](https://github.com/mhweiner/autorel): Automate semantic releases based on conventional commits. Similar to semantic-release but much simpler.
- [brek](https://github.com/mhweiner/brek): A powerful yet simple configuration library for Node.js. It’s structured, typed, and designed for dynamic configuration loading, making it perfect for securely managing secrets (e.g., AWS Secrets Manager).
- [jsout](https://github.com/mhweiner/jsout): A Syslog-compatible, small, and simple logger for Typescript/Javascript projects.
- [cjs-mock](https://github.com/mhweiner/cjs-mock): NodeJS module mocking for CJS (CommonJS) modules for unit testing purposes.
- [typura](https://github.com/aeroview/typura): Simple and extensible runtime input validation for TS/JS, written in TS.