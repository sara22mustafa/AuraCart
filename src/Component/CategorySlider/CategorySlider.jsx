import axios from 'axios'
import React from 'react'
import { useQuery } from 'react-query'
import Loading from '../Loading/Loading'
import Slider from 'react-slick'

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default function CategorySlider() {
   async function getCategories(){
        return await axios(`https://ecommerce.routemisr.com/api/v1/categories`)
    }
    const {data, isLoading}=useQuery("categorySlider",getCategories)

// console.log(data)
 if(isLoading){
    return<>
    <div className='d-flex justify-content-center my-5'>
  <Loading/>
    </div>
   
    </>
   
 }


var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 7,
    slidesToScroll: 1,
  };
  return <>
 <Slider {...settings}>
   
      {data.data.data.map((category,index)=>
<div key={index} >
<img src={category.image}style={{height:"200px"}} className='w-100 my-3'></img>
<h4 className='text-center h6'>{category.name}</h4>
</div>)}
    
    </Slider>


  
  
  </>
}
