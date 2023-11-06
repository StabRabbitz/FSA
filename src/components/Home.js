import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import FormSimple from './FormSimple';
import ResultBox from './ResultBox';
import Button from './Button';
import MiscInfo from './MiscInfo';
import SignIn from './SignIn';

const Home = () => {


  return (

    <div>
      <div className=''>
          <h2 className='max-w-2xl mx-auto text-center mt-3 mb-5 text-xl font-semibold'>Are you Properly Contributing to your Flexible Spending Account (FSA)?</h2>
          <p className=' mx-auto text-center text-lg mb-3'>
            Fill out the information below so that you can make an informed decision and take maximum advantage of
            your FSA.
          </p>
          <p className='mx-auto text-center text-sm text-gray-700 mb-5'>
            Your privacy is important to us, the information you input will not be shared with any third party.
          </p>
      </div>

      <div className='flex justify-center'>
        <FormSimple />
        <ResultBox />
      </div>

      <SignIn />
      <MiscInfo />

    </div>
  );
};

export default Home;
