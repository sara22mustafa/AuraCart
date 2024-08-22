import { useFormik} from 'formik'
import * as Yup from 'yup';
import React, { useState } from 'react'
import axios from 'axios';
import { ColorRing } from 'react-loader-spinner';
import { useNavigate } from 'react-router-dom';


export default function Register() {
   
    const[Issucsses,setIssucsses]=useState(false);
    const[Errormessage,seterror]=useState(undefined);
    const[isloading,setloading]=useState(false);
    const navigate=useNavigate();
    const UserDate={
       name: "",
      email:"",
      password:"",
      rePassword:"",
      phone:""
    }
    const schema=Yup.object({
       name: Yup.string().min(5,"name is short").max(20,"name is long").required("Name is required"),
      email:Yup.string().email("Email Not Valid").required("Email is Required"),
      password:Yup.string().required('Password Rquired').min(8,"password is short"),
      rePassword:Yup.string().required("Is required").oneOf([Yup.ref('password')]," should match Password"),
      phone:Yup.string().matches(/^01[0125][0-9]{8}/,"Phone Number should start with 01 and contain 9 numbers")
   
    })
   
    async function MySubmit(values){
      setloading(true);
      // console.log(values)
const res= await axios.post(`https://ecommerce.routemisr.com/api/v1/auth/signup`,values)
.then(function(x){
  // console.log(x,"s");
  setIssucsses(true);
  setTimeout(function(){
    setIssucsses(false)
    navigate("/login")
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
    {Issucsses?<div className='alert alert-success text-center container mt-3'>congratulation your account has been</div>:""}
    <div className='w-75 m-auto p-5 mb-2'>
<h2>Register Now:</h2>



<form onSubmit={MyFormik.handleSubmit}>
        <div className="form-group mb-2">
          <label htmlFor="FullName" className='mb-1'>Full Name</label>
          <input type="text" id='FullName' name='name' value={MyFormik.values.name} className='form-control' onChange={MyFormik.handleChange} onBlur={MyFormik.handleBlur} />
          {MyFormik.errors.name && MyFormik.touched.name ? <div className='alert alert-danger my-2'> {MyFormik.errors.name} </div> :""}
        </div>

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
        <div className="form-group mb-2">
          <label htmlFor="rePassword" className='mb-1'>RePassword</label>
          <input type="password" id='rePassword' name='rePassword' value={MyFormik.values.rePassword} className='form-control' onChange={MyFormik.handleChange} onBlur={MyFormik.handleBlur} />
          {MyFormik.errors.rePassword && MyFormik.touched.rePassword ? <div className='alert alert-danger my-2'> {MyFormik.errors.rePassword} </div> :""}        
        </div>
        <div className="form-group mb-4">
          <label htmlFor="phone" className='mb-1'>Phone</label>
          <input type="tel" id='phone' name='phone' value={MyFormik.values.phone} className='form-control' onChange={MyFormik.handleChange} onBlur={MyFormik.handleBlur} />
          {MyFormik.errors.phone && MyFormik.touched.phone ? <div className='alert alert-danger my-2'> {MyFormik.errors.phone} </div> :""}
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
 :"Register" }
  
        </button>
        </div>
      </form>

    </div>
    </>
  )
}

