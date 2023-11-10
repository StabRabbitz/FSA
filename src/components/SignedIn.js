import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import FormComplex from './FormComplex';
import ResultBoxComplex from './ResultBoxComplex';
import Button from './Button';

const SignedIn = () => {
  const [serverResponse, setServerResponse] = useState([]);

  return (
    <>
     <div className='mt-16'>
            <h2 className='max-w-3xl mx-auto text-center mt-3 mb-5 text-xl font-semibold'>
              Optimal FSA Contribution:
            </h2>
      </div>
    <div className='flex justify-center'>
        <ResultBoxComplex serverResponse={serverResponse} setServerResponse={setServerResponse} />
     </div>
     <div className='mt-16'>
            <p className=' max-w-3xl mx-auto text-center text-lg mb-3'>
              Fill out the required fields to generate optimal contribution
            </p>
      </div>
    <div className='flex justify-center'>
        <FormComplex serverResponse={serverResponse} setServerResponse={setServerResponse} />
    </div>

    </>
  );
};

export default SignedIn;