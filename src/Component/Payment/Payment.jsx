import { useFormik } from 'formik'
import React, { useContext, useEffect } from 'react'
import { CartContext } from '../../Context/CartContext'
import axios from 'axios'
import toast from 'react-hot-toast'
import { Await, useNavigate } from 'react-router-dom'

export default function Payment() {
   const{CartId,getLoggedUserCart,setnumOfCartItems}= useContext(CartContext)
   const nav=useNavigate()
  //  console.log(CartId)
    function check(values){
        // console.log(values)
    }
    let UserDataPay={
        details: "",
        phone: "",
        city: ""
    }

    function ConfirmCashPayment(){
        axios.post(`https://ecommerce.routemisr.com/api/v1/orders/${CartId}`,{
            "shippingAddress":UserDataPay 
       
        
        },{
            headers:{
                token:localStorage.getItem("tkn")
            }
        }).then((res)=>{
            // console.log(res,"jjj")
            if(res.data.status==="success"){
            toast.success("payment complet success")
            getLoggedUserCart();
            setnumOfCartItems(0)

            setTimeout(() => {
              nav('/home')
            }, 3000);
            
            }
        }).catch((err)=>{ console.log(err)})
           
        
      }


   async function ConfirmONlinePayment(){
      return  axios.post(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${CartId}`,{
            "shippingAddress":UserDataPay 
       
        
        },{
            headers:{
                token:localStorage.getItem("tkn")
            },
             params:{
              url:"http://localhost:3000"
             }
              
            }
        ).then((res)=>{
            console.log(res.data,"jjj")
            if(res.data.status ==="success"){
              toast.success("payment complet success")
           
  
              
                window.open(res.data.session.url)
              
          getLoggedUserCart();
              setnumOfCartItems(0)
              return true
            }
          
        }).catch((err)=>{ console.log(err)})
           
        
      }
     
 let myFormikPay=useFormik({
        initialValues:UserDataPay,
        onSubmit:check
    })
  return <>
  
 
    <div className="container w-50 bg-main-light p-4 mt-5">
        <h2 className='mt-5'>Check out :</h2>
        <form onSubmit={myFormikPay.handleSubmit}>
 <div className="form-group my-4">
    <label className='fw-bloder h3 text-main' htmlFor="CityInput">City:</label >

    <input type="text" className="form-control my-2 py-2"
     id="CityInput"  placeholder="Enter city" 
     value={myFormikPay.values.city} name='city'
     onChange={myFormikPay.handleChange}
      />
  </div>

   <div className="form-group my-4">
    <label className='fw-bloder h3 text-main' htmlFor="UserPhone">phone :</label>
    <input type="tel" className="form-control my-2 py-2" id="UserPhone" name='phone'
     value={myFormikPay.values.phone} onChange={myFormikPay.handleChange}
     placeholder="Enter Phone" />
  </div>

  <div className="form-group my-4">
    <label htmlFor="CityInput" className='fw-bloder h3 text-main'>Details:</label>
    <input type="text" className="form-control my-2 py-2" id="DetailsInput"  name='details'
     value={myFormikPay.values.details} onChange={myFormikPay.handleChange}
      placeholder="Enter Details" />
  
  <button type="submit" className="btn bg-main text-white mt-4 py-2"
   onClick={()=>{
    ConfirmCashPayment()
  }}
  >Confirm Cash Payment</button>
  
  <button type="submit" className="btn bg-main text-white mt-4 py-2 ms-3"
 onClick={()=>{
  ConfirmONlinePayment()
}}
  >online Cash Payment</button>
  
  </div>
  
</form>
    </div> 
 

  </>
}
