import {test} from '../src'; // from 'kizu'
import {helloworld} from './helloworld';

test('returns "hello, world"', (assert) => {

    assert.equal(helloworld(), 'hello, world');

});
