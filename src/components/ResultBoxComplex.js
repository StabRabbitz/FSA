import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const ResultBoxComplex = ({ serverResponse, setServerResponse }) => {
    // fetch('api/')
    //   .then(res => res.json())
    //   .then(data => console.log(data))
    //   .catch(e => console.log(e));

    //serverResponse = [avgMedicalExpenses, yearlyCont, monthlyCont, salaryAfterCont, taxSaving]
    let divText = '';

    if (isNaN(serverResponse[0]) || isNaN(serverResponse[1])) {
        divText = <div>Inputs Required</div>
    } else if (serverResponse[0] && serverResponse[1]) {
        divText = (
          <div>
            <strong>Optimal FSA Contribution for 2024:</strong>
            <br />
            <strong className='text-red-600'>${serverResponse[1]}</strong>
            <br />
            <br />
            <strong>Tax Savings:</strong>
            <br />
            <strong className='text-red-600'>${serverResponse[4]}</strong>
            <br />
            <br />
            <br />
            <br />
            <strong>Your Expected Medical Expenses in 2024:</strong>
            <br />
            <strong className='text-red-600'>${serverResponse[0]}</strong>
            <br />
            <br />
            <strong>Salary After Contribution:</strong>
            <br />
            <strong className='text-red-600'>${serverResponse[3]}</strong>
            <br />
            <strong>Monthly Cost of Contribution:</strong>
            <br />
            <strong className='text-red-600'>${serverResponse[2]}</strong>
          </div>
        )
    } else {
        divText = <div>Inputs Required</div>;
      }

return (
    <div className="bg-white p-8 rounded shadow-md w-full sm:w-96">
        <div className='max-w-3xl mx-auto text-center mt-3 mb-5 text-xl font-semibold'>{divText}</div>
    </div>
)
};

export default ResultBoxComplex;