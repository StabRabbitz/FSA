import React, { useEffect, useState } from 'react'
import { useFetcher, Navigate } from 'react-router-dom'

const ProtectedRoute = ({ children }) => {
  // Not sure what the difference between useNavigate and Navigate is
  // const navigate = useNavigate();
  const [isAuthenticated, setAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect( () => {
    const checkAuth = async () => {
      fetch('/isLoggedIn')
      .then(res => {
        if (!res.ok) { // replace does this thing where 
          alert('Not allowed!')
            setAuthenticated(false); 
            setIsLoading(false);
        }
        setAuthenticated(true);
        setIsLoading(false);
        return res.json()
      })
      .then(data => console.log(data))
      .catch(err => {
        console.log(err);
        setAuthenticated(false); 
        setIsLoading(false);

      })
    }
    checkAuth();
  }, [Navigate]);

  if (isLoading) {
    return <div>Loading...</div>; // or some loading spinner
  }
  // children automatically passed as props? replace is for history??
  // I think it's returning before the 
  return isAuthenticated ? children : <Navigate to='/' replace/> 
}

export default ProtectedRoute;