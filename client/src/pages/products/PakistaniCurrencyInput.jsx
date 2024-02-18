import React, { useState } from 'react';

const PakistaniCurrencyInput = () => {
  const [formattedValue, setFormattedValue] = useState('');
  const [numericValue, setNumericValue] = useState('');

  const handleInputChange = (event) => {
    const inputValue = event.target.value;

    // Remove non-numeric characters
    const numericInput = inputValue.replace(/[^\d.]/g, '');

    // Format the numeric value as Pakistani currency
    const formattedInput = new Intl.NumberFormat('en-PK', {
      style: 'currency',
      currency: 'PKR',
      minimumFractionDigits: 0,
    }).format(numericInput);

    setFormattedValue(formattedInput);
    setNumericValue(numericInput);
  };

  return (
    <div>
      <label>Pakistani Currency Input:</label>
      <input
        type="text"
        value={formattedValue}
        onChange={handleInputChange}
        placeholder="Enter amount in PKR"
        style={{ width: '200px', padding: '5px' }}
      />

      <p>Formatted Value: {formattedValue}</p>
      <p>Numeric Value: {numericValue}</p>
    </div>
  );
};

export default PakistaniCurrencyInput;
