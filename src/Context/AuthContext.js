import React, {createContext, useState } from 'react';

export const AuthContext=createContext();

export default function AuthContextProvider({children}) {
const[token,settoken]=useState(null)
return <AuthContext.Provider value={{myToken: token , settoken}}>
    {children}  
 </AuthContext.Provider>
}

