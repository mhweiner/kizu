/* eslint-disable @typescript-eslint/no-require-imports */

const {test} = require('../dist/test'); // require('kizu').test
const helloworld = require('./helloworld-js');

test('returns "hello, world"', (assert) => {

    assert.equal(helloworld(), 'hello, world');

});
