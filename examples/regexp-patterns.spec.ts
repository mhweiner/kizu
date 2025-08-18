/* eslint-disable max-lines-per-function */
import {test} from '../src/test';

test('RegExp pattern matching examples', (assert) => {

    // Basic string pattern matching
    assert.equal('hello world', /hello/);
    assert.equal('hello world', /world$/);
    assert.equal('hello world', /^hello/);
    assert.equal('hello world', /hello.*world/);

    // Email validation
    const email = 'user@example.com';

    assert.equal(email, /^[^@]+@[^@]+\.[^@]+$/);
    assert.equal(email, /@example\.com$/);
    assert.equal(email, /^user@/);

    // Phone number validation
    const phone = '+1-555-123-4567';

    assert.equal(phone, /^\+\d{1,3}-\d{3}-\d{3}-\d{4}$/);

    // Date validation
    const date = '2024-01-15';

    assert.equal(date, /^\d{4}-\d{2}-\d{2}$/);

    // Mixed exact values and RegExp patterns in objects
    const user = {
        name: 'John Doe',
        email: 'john.doe@company.com',
        phone: '+1-555-123-4567',
        age: 30,
        isActive: true,
    };

    const expectedUser = {
        name: 'John Doe',
        email: /@company\.com$/, // RegExp pattern
        phone: /^\+\d{1,3}-\d{3}-\d{3}-\d{4}$/, // RegExp pattern
        age: 30, // Exact value
        isActive: true, // Exact value
    };

    assert.equal(user, expectedUser);

    // Complex nested structures with RegExp
    const data = {
        users: [
            {
                name: 'Alice',
                email: 'alice@example.com',
                preferences: {
                    theme: 'dark',
                    notifications: true,
                    lastLogin: '2024-01-15T10:30:00Z',
                },
            },
            {
                name: 'Bob',
                email: 'bob@test.org',
                preferences: {
                    theme: 'light',
                    notifications: false,
                    lastLogin: '2024-01-14T15:45:00Z',
                },
            },
        ],
        metadata: {
            count: 2,
            lastUpdated: '2024-01-15T12:00:00Z',
            version: '1.2.3',
        },
    };

    const expectedData = {
        users: [
            {
                name: 'Alice',
                email: /@example\.com$/, // RegExp pattern
                preferences: {
                    theme: 'dark',
                    notifications: true,
                    lastLogin: /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}Z$/, // RegExp pattern
                },
            },
            {
                name: 'Bob',
                email: /@test\.org$/, // RegExp pattern
                preferences: {
                    theme: 'light',
                    notifications: false,
                    lastLogin: /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}Z$/, // RegExp pattern
                },
            },
        ],
        metadata: {
            count: 2,
            lastUpdated: /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}Z$/, // RegExp pattern
            version: /^\d+\.\d+\.\d+$/, // RegExp pattern
        },
    };

    assert.equal(data, expectedData);

    // Array with mixed types and RegExp
    const items = [
        'hello world',
        'test@example.com',
        42,
        true,
        '2024-01-15',
    ];

    const expectedItems = [
        /hello/, // RegExp pattern
        /@example\.com$/, // RegExp pattern
        42, // Exact value
        true, // Exact value
        /^\d{4}-\d{2}-\d{2}$/, // RegExp pattern
    ];

    assert.equal(items, expectedItems);

});

test('RegExp pattern matching edge cases', (assert) => {

    // Empty string patterns
    assert.equal('', /^$/);
    assert.equal('test', /^test$/);

    // Special characters in patterns
    assert.equal('user.name@example.com', /user\.name@example\.com/);
    assert.equal('path/to/file.txt', /path\/to\/file\.txt/);

    // Unicode patterns
    assert.equal('café', /café/);
    assert.equal('🚀 rocket', /🚀/);

    // Complex patterns
    const jsonString = '{"name": "John", "age": 30}';

    assert.equal(jsonString, /^\{.*\}$/);
    assert.equal(jsonString, /"name":\s*"John"/);

});

test('RegExp pattern matching - understanding failures', (assert) => {

    // This test demonstrates how RegExp pattern matching works
    // When a string doesn't match a RegExp pattern, the assertion fails

    // These assertions pass because the strings match the patterns
    assert.equal('hello world', /hello/);
    assert.equal('user@example.com', /@example\.com$/);
    assert.equal('test123', /\d+/);

    // The following would fail (commented out to keep test passing):
    // assert.equal('hello world', /goodbye/); // Would fail - no match
    // assert.equal('user@example.com', /^[^@]+$/); // Would fail - contains @
    // assert.equal('test123', /^[a-z]+$/); // Would fail - contains numbers
    // assert.equal(123, /hello/); // Would fail - non-string with RegExp

});
