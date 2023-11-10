import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import FormSimple from './FormSimple';
import ResultBox from './ResultBox';
import Button from './Button';
import MiscInfo from './MiscInfo';
import SignIn from './SignIn';

const Home = () => {
  const [serverResponse, setServerResponse] = useState([]);

  return (

    <div>
      <div className='mt-10'>
          <h2 className='max-w-3xl mx-auto text-center mt-3 mb-5 text-xl font-semibold'>
            Are You Properly Contributing to your Flexible Spending Account (FSA)?
          </h2>
          <p className=' max-w-3xl mx-auto text-center text-lg mb-3'>
            Fill out the information below so that you can make an informed decision and take maximum advantage of
            your FSA.
          </p>
      </div>

      <div className='flex justify-center'>
        <FormSimple serverResponse={serverResponse} setServerResponse={setServerResponse} />
        <ResultBox serverResponse={serverResponse} setServerResponse={setServerResponse} />
      </div>
      <div className='mt-2'>
          <p className='mx-auto text-center text-sm text-gray-500 mb-5'>
            Your privacy is important to us, the information you input will not be shared with any third party.
          </p>
       </div>

      <SignIn />
      <br/>
      <br/>
      <br/>
      <div className='mb-20'>
      <div className='flex justify-center mt-5'>
        <div className="bg-white p-8 rounded shadow-md sm:w-6/12">
        {/* <div className='max-w-3xl mx-auto text-center mt-3 mb-5 text-xl font-semibold'>   </div> */}
        <h2 className='max-w-3xl mx-auto text-center mt-3 mb-5 text-xl font-semibold'>
            FSA Info:
        </h2>
        <p className=' max-w-3xl mx-auto text-center text-lg mb-3'>

                    Money in an FSA account can be used to pay eligble medical expenses.

                    <br/>
                    <br/>

                    An FSA Plan is provided by your employer. Funds allocated to an FSA 
                    Plan are decided at beginning of year and are deducted from your paycheck monthly.
                    
                    <br/>
                    <br/>
                

                    If FSA money is not used by end of year, it is lost unless the employer allows for one of 2 options:
                        1.) 2.5 month grace period into next year
                        2.) $650 to be rollover

                    <br/>
                    <br/>
                

                    2023 FSA Contribution limit: $3,050
                
  
        </p>
        <br />
        
        </div>
      </div>
      </div>
      {/* <MiscInfo /> */}
      <br/>
      <br/>
      <br/>
    </div>
  );
};

export default Home;

//sm:w-96
