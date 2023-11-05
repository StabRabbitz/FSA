import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './components/home';

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
    </>
    );
  };

export default App;