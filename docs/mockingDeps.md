# Mocking Dependencies

You can use [cjs-mock](https://npmjs.org/cjs-mock) to mock dependencies (only works with CommonJS modules). This is especially useful for mocking file system operations, network requests, or other side effects.

_isValidWord.ts_
```typescript
import {readFile} from 'fs/promises';

export async function isValidWord(word: string) {
  const validWords = await getValidWords();
  return validWords.indexOf(word) !== -1;
}

async function getValidWords() {
  const contents = await readFile('./dict.txt', 'utf-8');
  return contents.split('\n');
}
```
_isValidWord.spec.ts_
```typescript
import {test} from 'kizu';
import {mock} from 'cjs-mock';
import * as mod from './isValidWord'; // just used for typing

const dict = ['dog', 'cat', 'fish'].join('\n');
const mockMod: typeof mod = mock('./isValidWord', {
    'fs/promises': {readFile: () => Promise.resolve(dict)},
});

test('valid word returns true', async (assert) => {
  const result = await mockMod.isValidWord('dog');
  assert.equal(result, true);
});

test('invalid word returns false', async (assert) => {
  const result = await mockMod.isValidWord('nope');
  assert.equal(result, false);
});
```

For more examples, see [examples](../examples) or [src](../src).