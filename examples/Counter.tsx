import React, {useState} from 'react';

interface CounterProps {
    initialValue?: number
    step?: number
}

export function Counter({initialValue = 0, step = 1}: CounterProps) {

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
