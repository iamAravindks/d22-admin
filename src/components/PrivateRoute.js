import React from "react";
import {  Navigate } from "react-router-dom";
import {useFireBase} from '../context/FireContext'


export default function PrivateRoute({ children })
{
  const {currentUser}=useFireBase()

  
  return currentUser ? children : <Navigate to="/login" />;

}
