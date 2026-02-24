// Setup jsdom environment first
import './setup-jsdom.mjs';

import {test} from '../src'; // from 'kizu'
import {Counter} from './Counter';
import React from 'react';
import {render, screen, fireEvent, cleanup} from '@testing-library/react';

test('renders counter with initial value', (assert) => {

    render(<Counter initialValue={5} />);

    assert.equal(screen.getByText('Counter: 5').textContent, 'Counter: 5');
    cleanup();

});

test('increments counter when + button is clicked', (assert) => {

    render(<Counter initialValue={0} step={2} />);

    const incrementButton = screen.getByText('+2');

    fireEvent.click(incrementButton);

    assert.equal(screen.getByText('Counter: 2').textContent, 'Counter: 2');
    cleanup();

});

test('decrements counter when - button is clicked', (assert) => {

    render(<Counter initialValue={10} step={3} />);

    const decrementButton = screen.getByText('-3');

    fireEvent.click(decrementButton);

    assert.equal(screen.getByText('Counter: 7').textContent, 'Counter: 7');
    cleanup();

});

test('resets counter when Reset button is clicked', (assert) => {

    render(<Counter initialValue={5} />);

    // First increment
    const incrementButton = screen.getByText('+1');

    fireEvent.click(incrementButton);
    assert.equal(screen.getByText('Counter: 6').textContent, 'Counter: 6');

    // Then reset
    const resetButton = screen.getByText('Reset');

    fireEvent.click(resetButton);
    assert.equal(screen.getByText('Counter: 5').textContent, 'Counter: 5');
    cleanup();

});
