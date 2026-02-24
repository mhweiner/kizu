// eslint-disable-next-line @typescript-eslint/no-require-imports, @typescript-eslint/no-var-requires
const React = require('react');

function Greeting({name, age, showAge = false}) {

    return React.createElement(
        'div', {className: 'greeting'},
        React.createElement('h1', null, 'Hello, ', name, '!'),
        showAge && age && React.createElement('p', null, 'You are ', age, ' years old.'),
        React.createElement('p', null, 'Welcome to our application!')
    );

}

module.exports = {Greeting};
