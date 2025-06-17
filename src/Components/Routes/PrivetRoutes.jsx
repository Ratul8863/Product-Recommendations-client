// src/components/PrivateRoute.jsx


import React, { useContext } from 'react'
import { AuthContext } from '../../Contexts/AuthContext';
import { Navigate, useLocation } from 'react-router';
import Looding1 from '../../Pages/Shared/Looding/Looding1';

function PrivetRoutes({ children }) {
 const location = useLocation();
    console.log(location)


    const { user, loading } = useContext(AuthContext);
  if (loading) return <Looding1></Looding1> ;
  if (!user) return <Navigate to="/login" state={location.pathname} />;
  return children;
}

export default PrivetRoutes














