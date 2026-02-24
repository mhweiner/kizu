# TSX/JSX Support

Kizu has excellent support for testing TSX and JSX files! You can test React components, Preact components, Solid components, or any other JSX-based framework with full TypeScript support and modern testing utilities.

## Features

- ✅ **TSX Support**: Full TypeScript support for JSX-based components
- ✅ **JSX Support**: JavaScript JSX components with CommonJS compatibility
- ✅ **Framework Agnostic**: Works with React, Preact, Solid, and other JSX frameworks
- ✅ **React Testing Library**: Built-in support for component testing (when using React)
- ✅ **DOM Environment**: Automatic jsdom setup for browser-like testing
- ✅ **Type Safety**: Full TypeScript support with proper type checking
- ✅ **Modern Patterns**: Support for hooks, functional components, and modern JSX patterns

## Quick Start

### 1. Install Dependencies

**For React:**
```bash
npm install -D react react-dom @testing-library/react @types/react @types/react-dom jsdom
```

**For Preact:**
```bash
npm install -D preact @testing-library/preact @types/react jsdom
```

**For Solid:**
```bash
npm install -D solid-js @testing-library/solid jsdom
```

**For other JSX frameworks:**
```bash
npm install -D jsdom
# Plus your framework's testing utilities
```

### 2. Create JSX Components

**React Component (TSX):**
```tsx
// Counter.tsx
import React, { useState } from 'react';

interface CounterProps {
  initialValue?: number;
  step?: number;
}

export function Counter({ initialValue = 0, step = 1 }: CounterProps) {
  const [count, setCount] = useState(initialValue);

  const increment = () => setCount(count + step);
  const decrement = () => setCount(count - step);
  const reset = () => setCount(initialValue);

  return (
    <div className="counter">
      <h2>Counter: {count}</h2>
      <button onClick={increment}>+{step}</button>
      <button onClick={decrement}>-{step}</button>
      <button onClick={reset}>Reset</button>
    </div>
  );
}
```

**Preact Component (TSX):**
```tsx
// PreactCounter.tsx
import { useState } from 'preact/hooks';

interface CounterProps {
  initialValue?: number;
}

export function PreactCounter({ initialValue = 0 }: CounterProps) {
  const [count, setCount] = useState(initialValue);

  return (
    <div className="counter">
      <h2>Count: {count}</h2>
      <button onClick={() => setCount(count + 1)}>+</button>
      <button onClick={() => setCount(count - 1)}>-</button>
    </div>
  );
}
```

**Solid Component (TSX):**
```tsx
// SolidCounter.tsx
import { createSignal } from 'solid-js';

interface CounterProps {
  initialValue?: number;
}

export function SolidCounter({ initialValue = 0 }: CounterProps) {
  const [count, setCount] = createSignal(initialValue);

  return (
    <div class="counter">
      <h2>Count: {count()}</h2>
      <button onClick={() => setCount(count() + 1)}>+</button>
      <button onClick={() => setCount(count() - 1)}>-</button>
    </div>
  );
}
```

**JavaScript (JSX):**
```jsx
// Greeting.jsx
const React = require('react');

function Greeting({ name, age, showAge = false }) {
  return React.createElement('div', { className: 'greeting' },
    React.createElement('h1', null, 'Hello, ', name, '!'),
    showAge && age && React.createElement('p', null, 'You are ', age, ' years old.'),
    React.createElement('p', null, 'Welcome to our application!')
  );
}

module.exports = { Greeting };
```

### 3. Test Your Components

**TypeScript Test (TSX):**
```tsx
// Counter.spec.tsx
import './setup-jsdom.mjs'; // Setup DOM environment
import { test } from 'kizu';
import { Counter } from './Counter';
import React from 'react';
import { render, screen, fireEvent, cleanup } from '@testing-library/react';

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
```

**JavaScript Test (JSX):**
```jsx
// Greeting.spec.jsx
require('./setup-jsdom'); // Setup DOM environment
const { test } = require('kizu');
const { Greeting } = require('./Greeting.jsx');
const React = require('react');
const { render, screen } = require('@testing-library/react');

test('renders greeting with name', (assert) => {
  render(React.createElement(Greeting, { name: 'Alice' }));
  
  assert.equal(screen.getByText('Hello, Alice!').textContent, 'Hello, Alice!');
  assert.equal(screen.getByText('Welcome to our application!').textContent, 'Welcome to our application!');
});

test('shows age when showAge is true', (assert) => {
  render(React.createElement(Greeting, { name: 'Bob', age: 25, showAge: true }));
  
  assert.equal(screen.getByText('You are 25 years old.').textContent, 'You are 25 years old.');
});
```

## Setup Files

You'll need to create setup files for the DOM environment:

**For TSX (ES modules):**
```javascript
// setup-jsdom.mjs
import { JSDOM } from 'jsdom';

const dom = new JSDOM('<!DOCTYPE html><html><body></body></html>', {
  url: 'http://localhost',
  pretendToBeVisual: true,
  resources: 'usable'
});

global.window = dom.window;
global.document = dom.window.document;
global.navigator = dom.window.navigator;

// Make sure document.body exists
if (!global.document.body) {
  global.document.body = global.document.createElement('body');
  global.document.documentElement.appendChild(global.document.body);
}
```

**For JSX (CommonJS):**
```javascript
// setup-jsdom.js
const { JSDOM } = require('jsdom');

const dom = new JSDOM('<!DOCTYPE html><html><body></body></html>', {
  url: 'http://localhost',
  pretendToBeVisual: true,
  resources: 'usable'
});

global.window = dom.window;
global.document = dom.window.document;
global.navigator = dom.window.navigator;

// Make sure document.body exists
if (!global.document.body) {
  global.document.body = global.document.createElement('body');
  global.document.documentElement.appendChild(global.document.body);
}
```

## Package.json Configuration

Update your test script to include TSX and JSX files:

```json
{
  "scripts": {
    "test": "kizu '@(examples|src)/**/*.spec.@(ts|js|tsx|jsx)'"
  }
}
```

## Testing Patterns

### Component Rendering
```tsx
test('renders component', (assert) => {
  render(<MyComponent prop="value" />);
  assert.equal(screen.getByText('Expected Text').textContent, 'Expected Text');
  cleanup();
});
```

### User Interactions
```tsx
test('handles user interaction', (assert) => {
  render(<Button onClick={handleClick}>Click me</Button>);
  
  fireEvent.click(screen.getByText('Click me'));
  
  assert.equal(handleClick).toHaveBeenCalled();
  cleanup();
});
```

### Conditional Rendering
```tsx
test('shows content conditionally', (assert) => {
  render(<Component showContent={true} />);
  assert.equal(screen.getByText('Content').textContent, 'Content');
  
  cleanup();
  
  render(<Component showContent={false} />);
  assert.equal(screen.queryByText('Content'), null);
});
```

### Props Testing
```tsx
test('accepts and uses props', (assert) => {
  render(<Greeting name="Alice" age={25} showAge={true} />);
  
  assert.equal(screen.getByText('Hello, Alice!').textContent, 'Hello, Alice!');
  assert.equal(screen.getByText('You are 25 years old.').textContent, 'You are 25 years old.');
  cleanup();
});
```

## Best Practices

1. **Always cleanup**: Use `cleanup()` after each test to prevent DOM pollution
2. **Use semantic queries**: Prefer `getByRole`, `getByLabelText` over `getByText` when possible
3. **Test behavior, not implementation**: Focus on what the user sees and does
4. **Keep tests simple**: One assertion per test when possible
5. **Use TypeScript**: Get full type safety with TSX components

## Testing Other JSX Frameworks

### Preact Testing
```tsx
// PreactCounter.spec.tsx
import './setup-jsdom.mjs';
import { test } from 'kizu';
import { PreactCounter } from './PreactCounter';
import { render, screen, fireEvent, cleanup } from '@testing-library/preact';

test('Preact counter works', (assert) => {
  render(<PreactCounter initialValue={5} />);
  
  assert.equal(screen.getByText('Count: 5').textContent, 'Count: 5');
  
  fireEvent.click(screen.getByText('+'));
  assert.equal(screen.getByText('Count: 6').textContent, 'Count: 6');
  
  cleanup();
});
```

### Solid Testing
```tsx
// SolidCounter.spec.tsx
import './setup-jsdom.mjs';
import { test } from 'kizu';
import { SolidCounter } from './SolidCounter';
import { render, screen, fireEvent, cleanup } from '@testing-library/solid';

test('Solid counter works', (assert) => {
  render(() => <SolidCounter initialValue={3} />);
  
  assert.equal(screen.getByText('Count: 3').textContent, 'Count: 3');
  
  fireEvent.click(screen.getByText('+'));
  assert.equal(screen.getByText('Count: 4').textContent, 'Count: 4');
  
  cleanup();
});
```

### Custom JSX Transform
You can also use TSX/JSX with custom JSX transforms for non-framework usage:

```tsx
// CustomJSX.tsx
// With custom JSX transform (e.g., using @babel/plugin-transform-react-jsx)
function createElement(tag: string, props: any, ...children: any[]) {
  return { tag, props, children };
}

function MyComponent({ name }: { name: string }) {
  return <div>Hello, {name}!</div>;
}

// Test
import { test } from 'kizu';

test('Custom JSX component', (assert) => {
  const result = MyComponent({ name: 'World' });
  assert.equal(result.tag, 'div');
  assert.equal(result.children[0], 'Hello, World!');
});
```

## Examples

Check out the complete examples in the [examples folder](../examples/):
- [Counter.tsx](../examples/Counter.tsx) - TypeScript React component with hooks
- [Counter.spec.tsx](../examples/Counter.spec.tsx) - Comprehensive TSX tests
- [Greeting.jsx](../examples/Greeting.jsx) - JavaScript React component
- [Greeting.spec.jsx](../examples/Greeting.spec.jsx) - JSX tests with CommonJS

## Troubleshooting

### "document is not defined" Error
Make sure you're importing the jsdom setup file at the top of your test files:
```tsx
import './setup-jsdom.mjs'; // For TSX
// or
require('./setup-jsdom'); // For JSX
```

### Multiple Elements Found
Use more specific queries or add cleanup between tests:
```tsx
test('specific test', (assert) => {
  render(<Component />);
  // ... test logic
  cleanup(); // Clean up after each test
});
```

### TypeScript Errors
Ensure you have the proper React types installed:
```bash
npm install -D @types/react @types/react-dom
```
