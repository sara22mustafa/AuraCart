import axios from 'axios';
import React, { useContext } from 'react'
import { useQuery } from 'react-query';
import { Navigate, useParams } from 'react-router-dom'
import Loading from '../Loading/Loading';
import { CartContext } from '../../Context/CartContext';
import toast from 'react-hot-toast';

export default function ProductDetails() {
    const {id}= useParams();
    
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

    function getProductDetails(){
        return axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`)
    }
    const{data ,isLoading,isError}=useQuery(`productDetails-${id}`,getProductDetails)
    // console.log(data?.data.data)
    if(isLoading){
        return<>
        <div className="container d-flex justify-content-center">
            <Loading/>
        </div>
        
        </>
    }
    if(isError){
        return<>
        <Navigate to={"/Home"}></Navigate>
        </>
    }
    const dataDetalils=data.data.data
  return <>
  <div className='container'>
    <div className="row align-items-center">
        <div className="col-md-3">
<figure className='pt-3'>
    <img src={dataDetalils.imageCover} className='w-100'></img>
</figure>
        </div>
   

    <div className="col-md-9">
        <article className='ms-2'>
            <h1>{dataDetalils.title}</h1>
            <p>{dataDetalils.description}</p>
            {/* <p>
            {dataDetalils.id} 
            </p> */}


            <h3 className='h4'>{dataDetalils.category.name}</h3>
            <div className="d-flex justify-content-between ">
            <h4 className='h5 text-main fw-bolder'>{dataDetalils.price} EGP</h4>
           
           <h5 className='h4 fw-bloder'><i className='fa fa-star rating-color'></i>{dataDetalils.ratingsAverage}</h5>
            </div>
         
            <button onClick={()=>{
                addCart(dataDetalils.id)
            }} className='text-white text-center btn bg-main w-100 mt-3 '>Add To Cart +</button>
        </article>

    </div>
     
  </div>
   </div>
  
  </>
}
