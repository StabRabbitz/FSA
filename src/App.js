import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './components/home';
import Protected from './components/Protected';

const App = () => {
    return (
    <>
        <header className="bg-blue-500 p-4 drop-shadow-lg">
        <h1 className="text-4xl text-white text-center font-extrabold">FlexWise</h1>
            <p className="text-1xl text-white text-center font-bold"> An FSA Optimizer</p>
        </header> 
        <main className="bg-gray-100 p-4">
        <Home />

    </>
    );
  };

export default App;