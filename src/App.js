import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './components/home';

const App = () => {
    return (
    //   <Routes>
    //     <Route path="/" element={<Home />} />
    //   </Routes>
    <>
        <header className="bg-blue-500 p-4 drop-shadow-lg">
        <h1 className="text-4xl text-white text-center font-extrabold">FlexWise</h1>
            <p className="text-1xl text-white text-center font-bold"> An FSA Optimizer</p>
        </header> 
        <main className="bg-gray-100 p-4">
        <Home />
        </main>
  </>
    );
  };

export default App;