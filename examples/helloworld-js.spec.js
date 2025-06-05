/* eslint-disable @typescript-eslint/no-require-imports, @typescript-eslint/no-var-requires */

const test = require('../dist/test').test; // require('@kitest/kitest').test
const helloworld = require('./helloworld-js');

test('returns "hello, world"', (assert) => {

    assert.equal(helloworld(), 'hello, world');

});
