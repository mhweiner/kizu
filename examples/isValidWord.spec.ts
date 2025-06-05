import {test} from '../src'; // from '@kitest/kitest'
import {mock} from 'cjs-mock';
import * as mod from './isValidWord'; // just used for type

const dict = ['dog', 'cat', 'fish'].join('\n');
const mockMod: typeof mod = mock('./isValidWord', {
    fs: {promises: {readFile: () => Promise.resolve(dict)}},
});

test('valid word returns true', async (assert) => {

    const result = await mockMod.isValidWord('dog');

    assert.isTrue(result);

});

test('invalid word returns false', async (assert) => {

    const result = await mockMod.isValidWord('nope');

    assert.isFalse(result);

});
