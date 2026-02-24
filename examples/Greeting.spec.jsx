/* eslint-disable @typescript-eslint/no-require-imports, @typescript-eslint/no-var-requires */

// Setup jsdom environment
require('./setup-jsdom');

const {test} = require('../dist/test'); // require('kizu').test
const {Greeting} = require('./Greeting.jsx');
const React = require('react');
const {render, screen} = require('@testing-library/react');

test('renders greeting with name', (assert) => {

    render(React.createElement(Greeting, {name: 'Alice'}));

    assert.equal(screen.getByText('Hello, Alice!').textContent, 'Hello, Alice!');
    assert.equal(screen.getByText('Welcome to our application!').textContent, 'Welcome to our application!');

});

test('shows age when showAge is true', (assert) => {

    render(React.createElement(Greeting, {name: 'Bob', age: 25, showAge: true}));

    assert.equal(screen.getByText('You are 25 years old.').textContent, 'You are 25 years old.');

});

test('does not show age when showAge is false', (assert) => {

    render(React.createElement(Greeting, {name: 'Charlie', age: 30, showAge: false}));

    assert.equal(screen.queryByText('You are 30 years old.'), null);

});

test('does not show age when age is not provided', (assert) => {

    render(React.createElement(Greeting, {name: 'David', showAge: true}));

    assert.equal(screen.queryByText('You are'), null);

});
