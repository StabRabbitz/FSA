import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const MiscInfo = () => {
    
return (
    <div>
        <div className='mx-10 mt-3 mb-5 text-xl font-semibold'>MiscInfo</div>

        <article className='mx-10 text-lg mb-8'>
            <ul>
                <li>
                    FSA Plan goes through employer
                    Plan is decided at begining of year, deducted from paycheck monthly & pretax
                    Employer holds on to money, so when paying medical expenses money comes from employer
                    Employer can decide whether or not to contribute to FSA
                </li>
                
                <li>
                    FSA can be used for certain medical expenses
                    If FSA money is not used by end of year it is lost unless employer allows for one of 2 options:
                    2.5 month grace period into next year
                    $650 rollover
                </li>
                
                <li>
                    2023 FSA Contribution limit: $3,050
                </li>
            </ul>

        </article>
    </div>
)
}


export default MiscInfo;