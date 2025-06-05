import {test} from '../src'; // from '@kitest/kitest'
import {helloworld} from './helloworld';

test('returns "hello, world"', (assert) => {

    assert.equal(helloworld(), 'hello, world');

});
