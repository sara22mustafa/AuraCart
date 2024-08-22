import React from 'react'
import { Navigate } from 'react-router-dom'

export default function ProductRout({children}) {
  if(localStorage.getItem("tkn")==null){
    return<>
    
    <Navigate to={"/login"}></Navigate>
    </>
  }
  return<>
  {children}
  </>
}
