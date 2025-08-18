/* eslint-disable max-lines-per-function */
export function deepStrictEqual(actual: any, expected: any): boolean {

    if (actual === expected) return true;

    // Handle RegExp comparison - expected can be RegExp, actual should be string
    if (expected instanceof RegExp) {

        if (typeof actual !== 'string') return false;
        return expected.test(actual);

    }

    // Handle case where actual is RegExp but expected is not RegExp
    if (actual instanceof RegExp && !(expected instanceof RegExp)) {

        return false;

    }

    if (isPrimitive(actual) && isPrimitive(expected)) return actual === expected;
    if (Array.isArray(actual) !== Array.isArray(expected)) return false;
    if (typeof actual !== typeof expected) return false;
    if (actual === null || expected === null) return false;

    // Handle Map objects
    if (actual instanceof Map && expected instanceof Map) {

        if (actual.size !== expected.size) return false;
        for (const [key, value] of actual) {

            if (!expected.has(key) || !deepStrictEqual(value, expected.get(key))) return false;

        }
        return true;

    }

    // Handle Set objects
    if (actual instanceof Set && expected instanceof Set) {

        if (actual.size !== expected.size) return false;
        for (const item of actual) {

            let matchFound = false;

            for (const item2 of expected) {

                if (deepStrictEqual(item, item2)) {

                    matchFound = true;
                    break;

                }

            }
            if (!matchFound) return false;

        }
        return true;

    }

    // Handle object comparison
    const keys1 = Object.keys(actual);
    const keys2 = Object.keys(expected);

    if (keys1.length !== keys2.length) return false;

    for (const key of keys1) {

        if (!Object.prototype.hasOwnProperty.call(expected, key)) return false;
        if (!deepStrictEqual(actual[key], expected[key])) return false;

    }

    return true;

}

// Helper function to check if a value is a primitive
function isPrimitive(value: any): boolean {

    return value !== Object(value);

}
