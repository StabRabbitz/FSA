import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const FormComplex = () => {
    const [income, setIncome] = useState('');
    const [taxBracket, setTaxBracket] = useState('');
    const [employeeContrib, setEmployeeContrib] = useState('');
    const [pastExpenses, setPastExpenses] = useState('');

 const handleSubmit = () => {
    // Save data provided by user into a body called data
    // Send a POST request to server with body
 }
return (
    // <div>FormComplex</div>
    <div>
        <div>
            
          <label> What is your annual income?: </label>
          <input
            type="text"
            value={income}
            onChange={(e) => setIncome(e.target.value)}
          />
        </div>
        <button onClick={handleSubmit}>Submit</button>
    </div>
)
}

export default FormComplex;