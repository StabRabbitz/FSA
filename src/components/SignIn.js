import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const SignIn = () => {
    const [userName, setUserName] = useState('');
    const handleSubmit = () => {

    }
    return (
        // <div>Sign In</div>
        <div>
            <div>
              <label> User Name: </label>
              <input
                type="text"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
              />
            </div>
            <button onClick={handleSubmit}>Submit</button>
        </div>
    )
}


export default SignIn;