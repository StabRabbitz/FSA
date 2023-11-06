import React, { useEffect, useState } from 'react';
import { Link, Navigate } from 'react-router-dom';

const FormSimple = () => {
  const [form, setForm] = useState({
    expense23: '',
    expense22: '',
    expense21: '',
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = () => {
    const data = {
      expense23,
      expense22,
      expense21,
    };
    fetch('http://localhost:3000/', {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((res) => res.json())
      .then((expenses) => {
        console.log(expenses);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div>
      <form className="bg-white p-8 rounded shadow-md w-full sm:w-96">
        <label className="text-lg font-semibold text-gray-700">
          What were your total average medical expenses in 2023? :
        </label>
        <input
          type="text"
          className="w-full border rounded p-2 mt-2 focus:outline-none focus:border-blue-500"
          name="expense23"
          onChange={handleChange}
        />
        <label className="text-lg font-semibold text-gray-700">
          What were your total average medical expenses in 2022? :
        </label>
        <input
          type="text"
          className="w-full border rounded p-2 mt-2 focus:outline-none focus:border-blue-500"
          name="expense22"
          onChange={handleChange}
        />
        <label className="text-lg font-semibold text-gray-700">
          What were your total average medical expenses in 2021? :
        </label>
        <input
          type="text"
          className="w-full border rounded p-2 mt-2 mb-3 focus:outline-none focus:border-blue-500"
          name="expense21"
          onChange={handleChange}
        />
        <button
          type="submit"
          className="flex w-full justify-center rounded-md bg-blue-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
          onClick={handleSubmit}
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default FormSimple;
