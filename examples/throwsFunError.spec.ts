import {test} from '../src'; // from 'kizu'
import {throwsFunError} from './throwsFunError';

// test with RegExp
test('throws an error with supercalifragilisticexpialidocious', (assert) => {

    assert.throws(
        throwsFunError,
        /supercalifragilisticexpialidocious/
    );

});

// test with Error object
test('throws a specific error obj', (assert) => {

    assert.throws(
        throwsFunError,
        new Error('supercalifragilisticexpialidocious is not a function')
    );

});
