import {test} from '../src'; // from 'kizu'
import {toResultAsync} from '../src/lib/toResult';
import {throwsFunError, throwsFunErrorAsync} from './throwsFunError';

// test with RegExp
test('throwsFunError(): throws an error with supercalifragilisticexpialidocious', (assert) => {

    assert.throws(
        throwsFunError,
        /supercalifragilisticexpialidocious/
    );

});

// test with Error object
test('throwsFunError(): throws a specific error obj', (assert) => {

    assert.throws(
        throwsFunError,
        new Error('supercalifragilisticexpialidocious is not a function')
    );

});

test('throwsFunErrorAsync(): throws an error with supercalifragilisticexpialidocious', async (assert) => {

    await assert.throws(
        throwsFunErrorAsync,
        /supercalifragilisticexpialidocious/
    );

});

test('throwsFunErrorAsync(): throws an error with supercalifragilisticexpialidocious (using isError)', async (assert) => {

    const [err] = await toResultAsync(throwsFunErrorAsync());

    assert.isError(
        err,
        /supercalifragilisticexpialidocious/
    );

});

test('throwsFunErrorAsync(): throws specific error obj (using isError)', async (assert) => {

    const [err] = await toResultAsync(throwsFunErrorAsync());

    assert.isError(
        err,
        new Error('supercalifragilisticexpialidocious is not a function')
    );

});


