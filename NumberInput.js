import React, { useState } from 'react';

const NumberInput = ({ fetchNumbers }) => {
    const [type, setType] = useState('primes');

    const handleSubmit = (e) => {
        e.preventDefault();
        fetchNumbers(type);
    };

    return (
        <div>
            <h2>Select Number Type</h2>
            <select value={type} onChange={(e) => setType(e.target.value)}>
                <option value="primes">Prime</option>
                <option value="fibo">Fibonacci</option>
                <option value="even">Even</option>
                <option value="rand">Random</option>
            </select>
            <button onClick={handleSubmit}>Fetch Numbers</button>
        </div>
    );
};

export default NumberInput;
