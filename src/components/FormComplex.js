import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import ResultBox from './ResultBox';

const FormComplex = ({serverResponse, setServerResponse}) => {
  const [form, setForm] = useState({
    name: '',
    salary: '',
    taxBracket: '',
    employeeContrib: '',
    medCost1: '',
    medCost2: '',
    medCost3: '',
  });
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('handle submit 1')
    const data = {
      name: form.name,
      salary: form.salary,
      taxBracket: form.taxBracket,
      employerContrib: form.employeeContrib,
      medCost1: form.medCost1,
      medCost2: form.medCost2,
      medCost3: form.medCost3,
    };
    console.log('handle submit 2')
    fetch('http://localhost:3000/api/updateuser', {
      method: 'PATCH',
      credentials: "include",
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((res) => res.json())
      .then((calculations) => {
        console.log('handle submit 3')
        console.log(calculations);
        setServerResponse([calculations.avgMedicalExpenses, calculations.yearlyCont, calculations.monthlyCont, calculations.salaryAfterCont, calculations.taxSavings])
      })
      .catch((err) => {
        console.log(err);
      });
  };


  return (
    <div className='mb-20'>
      <div className='flex justify-center mt-5'>
        <form className="bg-white p-8 rounded shadow-md sm:w-5/12 " onSubmit={handleSubmit}>
          <label className="text-lg font-semibold text-gray-700">
            Name:
          </label>
          <input
            type="text"
            className="w-full border rounded p-2 mt-2 focus:outline-none focus:border-blue-500"
            name="name"
            placeholder='John Doe'
            onChange={handleChange}
          />
          <label className="text-lg font-semibold text-gray-700">
            Annual Income:
          </label>
          <input
            type="number"
            className="w-full border rounded p-2 mt-2 focus:outline-none focus:border-blue-500"
            name="salary"
            placeholder='$'
            onChange={handleChange}
          />
          <label className="text-lg font-semibold text-gray-700">
            Tax Percentage:
          </label>
          <input
            type="number"
            id="taxBracket"
            className="w-full border rounded p-2 mt-2 focus:outline-none focus:border-blue-500"
            name="taxBracket"
            placeholder='ex. 25%'
            onChange={handleChange}
          />
          <label className="text-lg font-semibold text-gray-700">
           Total Medical Expenses in 2021:
          </label>
          <input
            type="number"
            className="w-full border rounded p-2 mt-2 focus:outline-none focus:border-blue-500"
            name="medCost1"
            placeholder='$'
            onChange={handleChange}
          />
          <label className="text-lg font-semibold text-gray-700">
           Total Medical Expenses in 2022:
          </label>
          <input
            type="number"
            className="w-full border rounded p-2 mt-2 focus:outline-none focus:border-blue-500"
            name="medCost2"
            placeholder='$'
            onChange={handleChange}
          />
          <label className="text-lg font-semibold text-gray-700">
           Total Medical Expenses in 2023:
          </label>
          <input
            type="number"
            className="w-full border rounded p-2 mt-2 focus:outline-none focus:border-blue-500"
            name="medCost3"
            placeholder='$'
            onChange={handleChange}
          />
          <label className="text-lg font-semibold text-gray-700">
            Employer FSA Contribution Amount:
          </label>
          <input
            type="number"
            className="w-full border rounded p-2 mt-2 focus:outline-none focus:border-blue-500"
            name="employerContrib"
            placeholder='$'
            onChange={handleChange}
          />
          <button
            type="submit"
            className="mt-3 flex w-full justify-center rounded-md bg-blue-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
            onClick={handleSubmit}
          >
            Submit
          </button>
        </form>
        {/* <ResultBoxComplex /> */}
      </div>
    </div>
  );
};

export default FormComplex;
