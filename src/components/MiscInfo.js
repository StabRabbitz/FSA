import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const MiscInfo = () => {
    
return (
    <div class = "text-center">
        <div class = "mx-auto max-w-md"></div>
        <br></br>
        <div>
            <br></br>
            FSA Plan goes through employer
            Plan is decided at begining of year, deducted from paycheck monthly & pretax
            Employer holds on to money, so when paying medical expenses money comes from employer
            Employer can decide whether or not to contribute to FSA
        </div>
        
        <div>
            <br></br>
            FSA can be used for certain medical expenses
            If FSA money is not used by end of year it is lost unless employer allows for one of 2 options:
            2.5 month grace period into next year
            $650 rollover
        </div>
        
        <div>
            2023 FSA Contribution limit: $3,050. THIS IS NOT FINANCIAL ADVICE.
        </div>
    </div>
)
}


export default MiscInfo;