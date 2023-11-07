import React, { useEffect, useState } from 'react'
import { useFetcher, Navigate } from 'react-router-dom'

const ProtectedRoute = ({ children }) => {
  // Not sure what the difference between useNavigate and Navigate is
  // const navigate = useNavigate();
  const [isAuthenticated, setAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const checkAuth = async () => {
    console.log('Checking auth');
    try {
      const response = await fetch('/api/isLoggedIn');
      console.log(response);
      if (response.ok) {
        setAuthenticated(true);
      }
      setIsLoading(false);
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    checkAuth();
  }, []);

  // show something in case request takes a while
  if (isLoading) {
    return <div>Loading...</div>;
  }
  // children automatically passed as props? replace is for history??
  // I think it's returning before the 
  return isAuthenticated ? children : <Navigate to='/' replace />
}

export default ProtectedRoute;