import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const Button = ({btnPrompt}) => {
    
return (
    <button
    type="submit"
    className="flex w-full justify-center rounded-md bg-blue-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
  >
    {btnPrompt}
  </button>
)
}


export default Button;