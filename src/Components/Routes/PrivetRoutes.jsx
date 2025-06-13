// src/components/PrivateRoute.jsx


import React, { useContext } from 'react'
import { AuthContext } from '../../Contexts/AuthContext';
import { Navigate } from 'react-router';
import Looding1 from '../../Pages/Shared/Looding/Looding1';

function PrivetRoutes({ children }) {
    const { user, loading } = useContext(AuthContext);
  if (loading) return <Looding1></Looding1> ;
  if (!user) return <Navigate to="/login" />;
  return children;
}

export default PrivetRoutes














// import { useContext } from "react";
// import { Navigate } from "react-router-dom";
// import { AuthContext } from "../contexts/AuthProvider";

// export default function PrivateRoutes({ children }) {
//   const { user, loading } = useContext(AuthContext);
//   if (loading) return <div>Loading...</div>;
//   if (!user) return <Navigate to="/login" />;
//   return children;
// }
