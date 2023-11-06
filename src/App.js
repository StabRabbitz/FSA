import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './components/home';
import Protected from './components/Protected';

const App = () => {
    return (
    <>
        {/* <h1 className="text-4xl text-pink-500 bg-black">
            FSA APP
        </h1>
        <Home />
        <br/> */}

        <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/protected" element={<Protected/>}/>
        </Routes>

    </>
    );
  };

export default App;