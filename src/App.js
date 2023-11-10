import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import Home from './components/Home';
import SignedIn from './components/SignedIn';
import Signup from './components/Signup';

const App = () => {
    return (
      <div className='bg-gray-100'>
          <header className="bg-blue-500 p-4 drop-shadow-lg">
            <h1 className="text-4xl text-white text-center font-extrabold"><Link to="/">FlexWise</Link></h1>
            <p className="text-1xl text-white text-center font-bold"> An FSA Optimizer</p>
          </header> 
       
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/signedIn" element={<SignedIn />} />
            <Route path="/signUp" element={<Signup />} />
          </Routes>
      </div>
    );
  };

export default App;