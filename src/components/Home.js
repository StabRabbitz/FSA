import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import FormSimple from './FormSimple';
import ResultBox from './ResultBox';
import Button from './Button';
import MiscInfo from './MiscInfo';

const Home = () => {

return (
    <div>
        <h2>Are you Properly Contributing to your FSA?</h2>
        <p> This FSA Calculator will help you estimate your health spending for the year so you can make an informed decision and take maximum advantage of your FSA. Your privacy is important to us, the information you input throughout this tool will not be shared with any third party.</p>
        <div>
            <FormSimple />
            <ResultBox />
        </div>
        <div>Log in to calculate the optimal FSA contribution for you!</div>
        <div>
            <Button />
            <Button />
        </div>
        <MiscInfo />
        
    </div>
)
}


export default Home;