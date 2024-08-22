import React,{ useContext }    from 'react'
import { jwtDecode } from 'jwt-decode'
import { UserContext } from '../../Context/UserContext';

export default function Profile() {

    let{userData}=useContext(UserContext);
    
    let encoded = localStorage.getItem('UserToken');
    let decodedToken = jwtDecode(encoded);

  return <>
    {/* <h1>Hello : {decodedToken.name}</h1> */}
    <h1>Hello : {userData?.name}</h1>
    <h1>Hello : {userData?.email}</h1>

  </>
}
 