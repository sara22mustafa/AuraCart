import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Loading from '../Loading/Loading'

export default function Categories() {
  const [allCateg, setallCateg] = useState(null)
  async function getAllCategories(){
     const{data}= await axios.get(`https://ecommerce.routemisr.com/api/v1/categories`)
     setallCateg(data.data)
    //  console.log(data)
  }
  useEffect(() => {
   getAllCategories()
  }, [])
   if(!allCateg){
    return<>
      <div className="container d-flex justify-content-center">
              <Loading/>
      </div>
    </>
   }
  return <>
  
  <div className="container py-5">
  <h2 className='mt-5  fw-bolder pt-4  ' >Popular Categories :</h2>

    <div className="row g-5 cursor-pointer rounded-3 mt-1">
      
      {allCateg.map((items)=>(
        <div className="col-md-4 col-lg-3">
          <div className="cated bg-main-light text-center shadow " >
            <figure>
              <img src={items.image} alt={items.name} className='w-100'style={{height:"350px"}}></img>
              <h3 className='h4 p-3 shadow-lg'>{items.name}</h3>
            </figure>
          </div>


      </div>
      ))}
      
    </div>
  </div>
  </>
}
