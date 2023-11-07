import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import Home from './components/Home';
import FormComplex from './components/FormComplex';
import ProtectedRoute from './components/ProtectedRoute';

const App = () => {

    const user = undefined;
    // needs to be true or false depending on the jwt

    return (
      <div className='bg-gray-100'>
          <header className="bg-blue-500 p-4 drop-shadow-lg">
            <h1 className="text-4xl text-white text-center font-extrabold"><Link to="/">FlexWise</Link></h1>
            <p className="text-1xl text-white text-center font-bold"> An FSA Optimizer</p>
          </header> 
       
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/signedIn" element={
                <ProtectedRoute user={user}>
                  <FormComplex />
                </ProtectedRoute>
              }
            />
            <Route path="*" element={<p>There's nothing here: 404</p>}/>
          </Routes>
      </div>
    );
  };

export default App;