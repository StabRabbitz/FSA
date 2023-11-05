import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const FormSimple = () => {
    const [expense23, setExpense23] = useState('');
    const [expense22, setExpense22] = useState('');
    const [expense21, setExpense21] = useState('');

 const handleSubmit = () => {
    // Save data provided by user into a body called data
    // Send a POST request to server with body
 }
return (
    // <div>FormSimple</div>
    <div>
        <div>
          <label> What were your total average medical expenses in 2023? : </label>
          <input
            type="text"
            value={expense23}
            onChange={(e) => setExpense23(e.target.value)}
          />
        </div>

        
        <button onClick={handleSubmit}>Submit</button>

    </div>
)
}

export default FormSimple;