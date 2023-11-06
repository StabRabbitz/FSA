import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './components/home';
import Login from './components/Login';
import Signup from './components/Signup';

const App = () => {
    return (
    //   <Routes>
    //     <Route path="/" element={<Home />} />
    //   </Routes>
    <>
        <h1 className="text-4xl text-pink-500 bg-black">
            FSA APP
        </h1>
        <Home />
        <br/>
        <h1>JOHN CHANGES</h1>
        <Signup/>
        <Login/>

    </>
    );
  };

export default App;