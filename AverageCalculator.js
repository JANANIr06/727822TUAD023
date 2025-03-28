import React, { useState } from 'react';
import axios from 'axios';

const AverageCalculator = () => {
    const [numbers, setNumbers] = useState([]);
    const [average, setAverage] = useState(null);
    const [manualInput, setManualInput] = useState('');

    // Fetch numbers from API
    const fetchNumbers = async (type) => {
        try {
            const response = await axios.get(`http://20.244.56.144/test/${type}`);
            const fetchedNumbers = response.data.numbers;
            updateNumbers(fetchedNumbers);
        } catch (error) {
            console.error('Error fetching numbers:', error);
        }
    };

    // Update numbers and calculate average
    const updateNumbers = (numArray) => {
        setNumbers(numArray);
        if (numArray.length > 0) {
            const avg = numArray.reduce((a, b) => a + b, 0) / numArray.length;
            setAverage(avg.toFixed(2));
        } else {
            setAverage(null);
        }
    };

    // Handle manual number input
    const handleManualInput = (e) => {
        setManualInput(e.target.value);
    };

    // Process manual input
    const handleCalculate = () => {
        const numArray = manualInput.split(',').map(num => parseFloat(num.trim())).filter(num => !isNaN(num));
        updateNumbers(numArray);
    };

    return (
        <div className="container">
            <h2>Enter Numbers (comma-separated) or Fetch from API</h2>
            <input
                type="text"
                value={manualInput}
                onChange={handleManualInput}
                placeholder="Enter numbers e.g., 5,10,15"
            />
            <button onClick={handleCalculate}>Calculate</button>
            <br />
            <select onChange={(e) => fetchNumbers(e.target.value)}>
                <option value="">Select API</option>
                <option value="primes">Prime Numbers</option>
                <option value="fibo">Fibonacci Numbers</option>
                <option value="even">Even Numbers</option>
                <option value="rand">Random Numbers</option>
            </select>
            <h3>Numbers: {numbers.join(', ')}</h3>
            <h3>Average: {average !== null ? average : 'N/A'}</h3>
        </div>
    );
};

export default AverageCalculator;
