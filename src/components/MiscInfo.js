import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const MiscInfo = () => {
    
return (
    <div className='mx-56 my-10'>
        <div className='mt-16 mb-5 text-xl font-semibold'>FSA Facts:</div>

        <article className='text-lg'>
            <ul>
                <li className='list-disc my-2'>
                    Money in an FSA account can be used to pay eligble medical expenses.
                </li>
                <li className='list-disc my-2'>
                    An FSA Plan is provided by your employer. Funds allocated to an FSA 
                    Plan are decided at beginning of year and are deducted from your paycheck monthly.
                    
                </li>
                
                <li className='list-disc my-2'>
                    If FSA money is not used by end of year, it is lost unless the employer allows for one of 2 options:
                        1.) 2.5 month grace period into next year
                        2.) $650 to be rollover
                </li>
                
                <li className='list-disc mt-2'>
                    2023 FSA Contribution limit: $3,050
                </li>
            </ul>

        </article>
    </div>
)
}


export default MiscInfo;