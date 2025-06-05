import {test} from '../src'; // from '@kitest/kitest'
import {InvalidPhoneNumber, validatePhoneNumber} from './validate';

test('validatePhoneNumber', (assert) => {

    assert.equal(validatePhoneNumber('+15551231234'), undefined, 'valid phone number should return undefined');
    assert.throws(() => validatePhoneNumber('123'), new InvalidPhoneNumber(), 'invalid phone number should throw InvalidPhoneNumber');

});

