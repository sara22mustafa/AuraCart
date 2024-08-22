import { useFormik} from 'formik'
import * as Yup from 'yup';
import React, { useContext, useState } from 'react'
import axios from 'axios';
import { ColorRing } from 'react-loader-spinner';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../Context/AuthContext';


export default function Register() {
    const{settoken,myToken}=useContext(AuthContext)
    const[Issucsses,setIssucsses]=useState(false);
    const[Errormessage,seterror]=useState(undefined);
    const[isloading,setloading]=useState(false);
    const navigate=useNavigate();
    const UserDate={
    
      email:"",
      password:""
      
      
    }
    const schema=Yup.object({
       
      email:Yup.string().email("Email Not Valid").required("Email is Required"),
      password:Yup.string().required('Password Rquired').min(8,"password is short"),
    
    
   
    })
   
    async function MySubmit(values){
      setloading(true);
      // console.log(values)
const res= await axios.post(`https://ecommerce.routemisr.com/api/v1/auth/signin`,values)
.then(function(x){
  console.log(x,"s");
  if(x.data.message == "success"){
    console.log(x.data.token)
    localStorage.setItem("tkn" ,x.data.token)
    settoken(x.data.token)
  }
  setIssucsses(true);
  setTimeout(function(){
    setIssucsses(false)
    navigate('/home')
  },3000);
  setloading(false)
})

.catch(function(x){
  // console.log(x,"f")
  seterror(x.response.data.message)
  setTimeout(function(){
    seterror(undefined)
  },3000);
  setloading(false)
})
 


    }
    const MyFormik=useFormik({
        initialValues:UserDate,
        validationSchema:schema,
        onSubmit:MySubmit
      
    })
  return (
    <>
   {Errormessage ?<div className='alert alert-danger text-center container mt-3'>{Errormessage}</div>:""}
    {Issucsses?<div className='alert alert-success text-center container mt-3'>Welcome Back</div>:""}
    <div className='w-75 m-auto p-5 mb-2'>
<h2>Login Now:</h2>



<form onSubmit={MyFormik.handleSubmit}>
        
        <div className="form-group mb-2">
          <label htmlFor="Email" className='mb-1'>Email</label>
          <input type="email" id='Email' name='email' value={MyFormik.values.email} className='form-control' onChange={MyFormik.handleChange} onBlur={MyFormik.handleBlur}/>
          {MyFormik.errors.email && MyFormik.touched.email ? <div className='alert alert-danger my-2'> {MyFormik.errors.email} </div> :""}
        </div>

        <div className="form-group mb-2">
          <label htmlFor="password" className='mb-1'>Password</label>
          <input type="password" id='password' name='password' value={MyFormik.values.password} className='form-control' onChange={MyFormik.handleChange} onBlur={MyFormik.handleBlur} />
          {MyFormik.errors.password && MyFormik.touched.password ? <div className='alert alert-danger my-2'> {MyFormik.errors.password} </div> :""}
        </div>
        
     

        <div className="div d-flex justify-content-between">
        <button type="submit" className="btn bg-main text-white d-block ms-auto" 
        disabled={!(MyFormik.isValid && MyFormik.dirty)}>
          {isloading ?
       <ColorRing
  visible={true}
  height="30"
  width="30"
  ariaLabel="color-ring-loading"
  wrapperStyle={{}}
  wrapperClass="color-ring-wrapper"
  colors={['#fff', '#fff', '#fff', '#fff', '#fff']}
  />
 :"Login" }
  
        </button>
        </div>
      </form>

    </div>
    </>
  )
}

