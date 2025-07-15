# API

## Index

Methods

- [test()](#test)

Assertions

- [assert.equal()](#assertequal)
- [assert.throws()](#assertthrows)
- [assert.isTrue()](#assertistrue)
- [assert.isFalse()](#assertisfalse)
- [assert.pass()](#assertpass)
- [assert.fail()](#assertfail)
- [assert.isError()](#assertiserror)

## Methods

### `test()`

> `test(title: string, cb: (assert: Assert) => void): void`

Create a test. `cb` can return a Promise or be an async, and the test runner will wait for it to resolve before continuing and executing the next test in the same file/suite/module.

## Assertions

### `assert.equal()`

> `equal(actual: any, expected: any, msg?: string): void`

Asserts deep and strict equality on objects or primitives. This will give you a [visual diff](/docs/visualDiff.md) output for any discrepancies. _This should be used for most assertions._

---

### `assert.throws()`

> `throws(fn: () => any, expected: Error | RegExp, message?: string): void`

Asserts that the given function throws an error, matching either:

- A **RegExp**, tested against the error's `.message`
- An **Error object**, matched deeply using `errorsEquivalent()` (including non-enumerable and custom properties, ignoring stack traces)

Supports both sync and async functions.

#### Why use it?

- No need to manually wrap code in a `try/catch`
- Supports custom error types and meaningful comparisons
- Provides [visual diffs](/docs/visualDiff.md) on mismatch

#### Example

```ts
import { test } from 'kizu';

function mustBe42(num: number): void {
  if (num !== 42) throw new Error('expected 42');
}

test('mustBe42 should throw', (assert) => {
  // using a RegExp
  assert.throws(() => mustBe42(15), /expected/);

  // using a specific Error object
  assert.throws(() => mustBe42(15), new Error('expected 42'));
});
```
---

### `assert.isTrue()`

> `isTrue(value: any, msg?: string): void`

Asserts that the value is `true`.

---

### `assert.isFalse()`

> `isFalse(value: any, msg?: string): void`

Asserts that the value is `false`.

---

### `assert.pass()`

> `pass(msg?: string): void`

Asserts that the test has passed.

---

### `assert.fail()`

> `fail(msg?: string): void`

Asserts that the test has failed.

### `assert.isError()`

> `isError(err: Error, expected: Error | RegExp, msg?: string)`

If `expected` is a `RegExp`, it will be tested against the error's `.message`. Otherwise, under the hood it uses `equal()` to compare the errors, except stack traces are ignored.

You will get a [visual diff](/docs/visualDiff.md) output for any discrepancies.

Errors **must** be an instance of `Error`, or an error will be thrown.

#### Example

```ts
import { test } from 'kizu';

test('isError', (assert) => {
  assert.isError(new Error('expected 42'), /expected/);
  assert.isError(new Error('expected 42'), new Error('expected 42'));
});
```