
import React, { useContext, useEffect, useState } from 'react'
import { CartContext } from '../../Context/CartContext'
import axios, { all } from 'axios';
import Loading from '../Loading/Loading';

export default function AllOrderUser() {
const{cartOwner , getLoggedUserCart}=useContext(CartContext);
const [allorderUser, setallorderUser] = useState(null)
 async function getUserOrder(){
  return await axios.get(`https://ecommerce.routemisr.com/api/v1/orders/user/${cartOwner}`).then((res)=>{
      // console.log(data)
    setallorderUser(res.data)
    return true
  }).catch((err)=>{
    return false
  })
 
}
useEffect(()=>{
  getUserOrder()
},[])
console.log(cartOwner)
console.log(allorderUser)
if(!allorderUser){
  return<>
  <div className='d-flex justify-content-center'>
     <Loading/>
  </div>
 
  </>
}
  return <>
  

<section className='py-5' >
        <div className="container p-5">
          <h2 className='fw-bolder h1  py-2 '>MyOrders :</h2>

          { allorderUser?.map((order)=> (
            <div className="row my-3 p-3 border border-2 rounded-3 bg-main-light">
             <div className="details d-flex  justify-content-between">
              <div className="main">
              <h3 className='h5'>Payment Method : <span className='bg-danger p-1 text-white fw-bold'>{order.paymentMethodType}</span> </h3>
              <h3 className='h5 my-4' >Total Order Price :  <span className='text-main'>{order.totalOrderPrice} EGP</span></h3>
              </div>
              <div className="secondary">
             < h3 className='h5'>  <span className='text-main fw-bolder h5'>Delivered To : </span> {order.shippingAddress.city}</h3>
              </div>
             </div>
              {order.cartItems.map((item)=> (
                <div className='col-md-2  p-0 m-0 my-3 my-md-1 ' >
              <div className="item m-md-1 ">
                <img src={item.product.imageCover} className='w-100 mb-1' alt={item.product.name} />
                  <h4 className='fs-6 ps-2 text-main fw-bold my-2 text-center'>{item.product.category.name}</h4>
                  <h4 className='fs-6 ps-2 fw-bold my-2 text-center'>{(item.product.title).split(' ').slice(0,4).join(' ')}</h4>
                </div>
                </div>
              ))}
            </div>
          ))}
        </div>
    </section>

  </>
}

