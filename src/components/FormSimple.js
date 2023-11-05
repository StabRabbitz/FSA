import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const FormSimple = () => {
  const [expense23, setExpense23] = useState('');
  const [expense22, setExpense22] = useState('');
  const [expense21, setExpense21] = useState('');

  const handleSubmit = () => {
    // Save data provided by user into a body called data
    // Send a POST request to server with body
  };
  return (
    // <div>FormSimple</div>
    <div>
      <div className="bg-white p-8 rounded shadow-md w-full sm:w-96">
        <label className="text-lg font-semibold text-gray-700">
          What were your total average medical expenses in 2023? :
        </label>
        <input
          type="text"
          className="w-full border rounded p-2 mt-2 focus:outline-none focus:border-blue-500"
          value={expense23}
          onChange={(e) => setExpense23(e.target.value)}
        />
      </div>
      <button
        type="submit"
        className="flex w-max justify-center rounded-md bg-blue-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
      >
        Submit
      </button>
    </div>
  );
};

export default FormSimple;
