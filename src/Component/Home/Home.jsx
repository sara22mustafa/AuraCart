import axios from 'axios'
import React, { createContext, useContext, useEffect, useState } from 'react'
import { BallTriangle } from 'react-loader-spinner'
import { useQuery } from 'react-query'
import SimpleSlider from '../Slider/Slider'
import Loading from '../Loading/Loading'
import CategorySlider from '../CategorySlider/CategorySlider'
import { Link } from 'react-router-dom'
import { CartContext } from '../../Context/CartContext'
import toast from 'react-hot-toast'

export default function Products() {
//   const[AllProduct,setAllProduct]=useState([])
// async function getAllProducts(){
//  let res= await axios.get(`https://ecommerce.routemisr.com/api/v1/products`)
//  setAllProduct(res.data.data)
//  console.log(res.data.data)
// }
// useEffect(function(){
// getAllProducts()
// },[])



const {addProductToCart}=useContext(CartContext);

async function addCart(productId){
  const res=await addProductToCart(productId);
  


if(res){
   toast.success("added successfully",{duration:1500 ,position:"top-center"})
}
else{
   toast.error("Error Occured....",{duration:1500 ,position:"top-center"}) 
}
}

async function getAllProducts(){
 return await axios.get(`https://ecommerce.routemisr.com/api/v1/products`)
 
   }
const {data,isError,isFetching,isLoading} =useQuery("getAllProducts",getAllProducts ,{refetchOnMount:false});
// console.log(data?.data.data)
  return <>

<div className='container my-4'>
  <div className="row  gx-0 mt-3 mb-3">
   <div className="col-md-9">
    <SimpleSlider/>
   </div>
   <div className="col-md-3">
<div >
<img style={{height:"200px"}}  className="w-100"  src={require('../../images/slideright1.webp')}/>
</div>
<div>
<img style={{height:"200px"}}  className="w-100"  src={require('../../images/slideright2.jpeg')}/>
</div>
   </div>
  </div>

</div>

<div className='container categ'>
<h4 className='pt-3 fw-bolder'>Shop Popular Categories</h4>
  <CategorySlider/>
</div>

 {data?.data.data? 
 


<div className="container my-5">
<div className="row gy-3">
  
 {data?.data.data.map((products,index)=>

 <div key={index} className="col-md-2 productss overflow-hidden">
  <Link to={`/ProductDetails/${products.id}`}>
    <div className="product ">
      <img src={products.imageCover} className='w-100 mb-2' alt='product'></img>
      <h3 className='text-main h6 fw-bold p-1'>{products.category.name}</h3>
      <h2 className='h6 p-1'>{products.title.split(" ").slice(0,2).join(" ")}</h2>
     <div className='d-flex justify-content-between p-1'>
  
      {products.priceAfterDiscount ? <p> <span className='text-decoration-line-through'>{products.price }</span> - {products.priceAfterDiscount }</p>:<p> {products.price}</p>}
     
     
     
     <p><i className="fa-solid fa-star me-1 " style={{color:"gold"}}></i>
     {products.ratingsAverage}</p>
     </div>
    </div>
 </Link>
 <button  onClick={()=>addCart(products.id)} className='btn text-white text-center d-block m-auto bg-main btnAdd mb-3 w-100'>Add To Cart +</button>
  </div>
// 
)}
  
</div>
  </div> : <div className='d-flex bg-opacity-25 bg-black  vh-100 justify-content-center align-items-center'>
<Loading/>
 </div>



}
 

  {/* {AllProduct ? <div className="container">
<div className="row gy-3">
 {AllProduct.map((products,index)=>

 <div key={index} className="col-md-2 ">
    <div className="product p-1">
      <img src={products.imageCover} className='w-100 mb-2' alt='product'></img>
      <h3 className='text-main h6 fw-bold'>{products.category.name}</h3>
      <h2 className='h6'>{products.title.split(" ").slice(0,2).join(" ")}</h2>
     <div className='d-flex justify-content-between'>
  
      {products.priceAfterDiscount ? <p> <span className='text-decoration-line-through'>{products.price }</span> - {products.priceAfterDiscount }</p>:<p> {products.price}</p>}
     
     
     
     <p><i className="fa-solid fa-star me-1 " style={{color:"gold"}}></i>
     {products.ratingsAverage}</p>
     </div>
    </div>
  </div>
 
)}
  
</div>
  </div> :<div className='d-flex bg-opacity-25 bg-black  vh-100 justify-content-center align-items-center'>
 <BallTriangle
  height={300}
  width={300}
  radius={5}
  color="#4fa94d"
  ariaLabel="ball-triangle-loading"
  wrapperStyle={{}}
  wrapperClass=""
  visible={true}
  />
 </div>}
  */}
  
  
  </>
}
