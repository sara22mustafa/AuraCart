import React, { useContext } from 'react'
import { CartContext } from '../../Context/CartContext'
import Loading from '../Loading/Loading';
import toast from 'react-hot-toast';
import { Link, Navigate } from 'react-router-dom';

export default function Cart() {
  const{numOfCartItems,clearitem,AllProduct,totalCartPrice,updatProductToCart,removeCartItems}=useContext(CartContext);
  console.log(AllProduct)
  if(!AllProduct){
    return<>
    <div className='d-flex justify-content-center'>
      <Loading/>
      </div> 
    
    </>
   
  }

  async function updatItemsCart(id,count){
    updatProductToCart(id,count)
  }

  async function removeItems(id){
 const res=   await removeCartItems(id)
    if(res){
      toast.success("deleted successfully",{duration:1500 ,position:"top-center"})
   }
   else{
      toast.error("Error Occured....",{duration:1500 ,position:"top-center"}) 
   }
  }
  // console.log(AllProduct.length);
  return <>
  {AllProduct.length > 0?
  <div className='w-75 m-auto p-3 bg-main-light pt-5 mt-4'>
      <h3 className='fw-bold mt-5'>Shopping Cart</h3>
      <h4 className='h5 text-main fw-bold h2 py-2'>Total Cart Price : {totalCartPrice}</h4>
      <div className='d-flex justify-content-between my-5'>
<button className='btn btn-danger ' onClick={()=>{
  clearitem()
  }}>Clear All</button>
<Link to={'/payment'}><button className='btn btn-info text-white'>Confirm Payment</button></Link>
  
      </div>
        
      {AllProduct.map((product,index)=>
       <div className='row border-bottom border-1 py-3' key={index}>
       <div className="col-md-1">
   <figure>
     <img src= {product.product.imageCover}alt={product.product.title} className='w-100' />
   </figure>
   </div>
   <div className="col-md-8">
   <h3 className='h6 fw-bold pt-2'>{product.product.title}</h3>
   <h6 className='text-main'>price: {product.price} EGP</h6>
   <button  className='btn'  onClick={()=>{
    removeItems(product.product.id)
   }}>
   <i className="fa-solid fa-trash-can text-danger me-1" 
  
   ></i>
     Remove</button>
   </div>
  <div className="col-md-3">
   <button className=' border-text text-main '  onClick={(()=>updatItemsCart(product.product.id,product.count +1))} >+</button>
  <span className='p-3 h6 '>{product.count}</span>
  <button disabled={product.count===1?"disable":false} className=' border-text text-main ' onClick={(()=>updatItemsCart(product.product.id,product.count -1))}>-</button>
  </div>
  
       </div>)}
      
      </div> :<div className='d-flex justify-content-center'>
    
        <img src={require("../../images/empty.jpg")} className='w-50'></img>
      
        </div>}
  
  
  
  </>
}






































// {cartDetails?
//   <div className='w-75 m-auto p-3 bg-main-light'>
//     <h3 className='fw-bold'>Shopping Cart</h3>
//     {/* <h4 className='h5 text-main fw-bold h2 py-2'>Total Cart Price : {cartDetails.data.totalCartPrice }</h4> */}
//     {/* <button className='btn btn-danger ' onClick={()=>{
//   clearAllItems()
//   }}>Clear All</button> */}
//       {cartDetails?.data.products.map((products,index)=>
//       <div key={index} className='row border-bottom border-1 py-3'>
       
//      <div className="col-md-1">
//   <figure>
//     <img src= {products.product.imageCover}alt={products.product.title} className='w-100' />
//   </figure>
//   </div>
//   <div className="col-md-8">
//   <h3 className='h6 fw-bold pt-2'>{products.product.title}</h3>
//   <h6 className='text-main'>price: {products.price} EGP</h6>
//   <button onClick={()=>removeItems(products.product.id)} className='btn'>
//   <i className="fa-solid fa-trash-can text-danger me-1"></i>
//     Remove</button>
//   </div>
//  <div className="col-md-3">
//    <button className=' border-text text-main ' onClick={()=>{
//      updatProduct(products.product.id ,products.count +1)
//    }}>+</button>
//  <span className='p-3 h6 '>{products.count}</span>
//  <button disabled={products.count===1?"disable":false} className=' border-text text-main ' onClick={()=>{
//    updatProduct(products.product.id ,products.count -1)
//  }}>-</button>
//  </div>
 
 
 
//    </div> 
  
//    )}
  
//  </div>:<div className='d-flex justify-content-center'>
 
 
//    <Loading/>
//  </div>