import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const ResultBox = () => {
    fetch('api/')
      .then(res => res.json())
      .then(data => console.log(data))
      .catch(e => console.log(e));

return (
    <div className="bg-white p-8 rounded shadow-md w-full sm:w-96">
        <div className='max-w-3xl mx-auto text-center mt-3 mb-5 text-xl font-semibold'>Results:</div>
    </div>
)
};

export default ResultBox;