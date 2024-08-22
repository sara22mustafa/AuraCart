import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Loading from '../Loading/Loading'

export default function Brands() {
  const [allBrands, setallBrands] = useState(null)
   async function getbrands(){
    const{data}= await axios.get(`https://ecommerce.routemisr.com/api/v1/brands`)
    setallBrands(data.data)
  }

  useEffect(() => {
    getbrands()
  }, [])

  if(!allBrands){
    return<>
    
    <div className="container d-flex justify-content-center">
            <Loading/>
        </div>
    </>
   }
  
  return<>

  <section>

     <div className="container py-5">
     <h2 className='mt-5  fw-bolder pt-3' >Popular Brands :</h2>
    <div className="row g-5 cursor-pointer rounded-3 mt-2">
      
      {allBrands.map((items)=>(
        <div className="col-lg-3 col-md-4">
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
  </section>
  
  
  
  
  </>
}
