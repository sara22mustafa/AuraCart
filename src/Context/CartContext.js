import axios from 'axios';
import React, { createContext, useContext, useEffect, useState } from 'react'
import { AuthContext } from './AuthContext';
export const CartContext=createContext();

export default function CartContextProvider({children}) {
    let headers=localStorage.getItem("tkn");
    const [totalCartPrice, settotalCartPrice] = useState(0);
    const [numOfCartItems, setnumOfCartItems] = useState(0);
    const [AllProduct, setAllProduct] = useState(null);
    const [CartId, setCartId] = useState(null);
    const [cartOwner, setcartOwner] = useState(null);
    const{myToken}=useContext(AuthContext);

    
async function addProductToCart(id){
    return  await axios.post(`https://ecommerce.routemisr.com/api/v1/cart`,{productId :id},{
        headers:{token:headers}
    }).then((respons)=>{
      // console.log(respons)
      settotalCartPrice(respons.data.data.totalCartPrice);
      setnumOfCartItems(respons.data.numOfCartItems );
      setAllProduct(respons.data.data.products)
      setCartId(respons.data.data._id)
    // console.log( respons.data.data._id)
        setcartOwner(respons.data.data.cartOwner)
    return true
    }).catch((err)=>{
      console.log(err,"eror")
    })
        
    
}
  async function getLoggedUserCart(){
    return await axios.get(`https://ecommerce.routemisr.com/api/v1/cart`,{
      headers:{token: headers}
    }).then((respons)=>{
      console.log(respons)
        settotalCartPrice(respons.data.data.totalCartPrice);
        setnumOfCartItems(respons.data.numOfCartItems );
        setAllProduct(respons.data.data.products);
        setcartOwner(respons.data.data.cartOwner)
        setCartId(respons.data.data._id)

    }).catch((err)=>{
      console.log(err,"eror")
    })
}

useEffect(()=>{
  getLoggedUserCart()
},[myToken])

 async function removeCartItems(id){
 return await axios.delete(`https://ecommerce.routemisr.com/api/v1/cart/${id}`,{
    headers:{token:headers}
  }).then((respons)=>{
    settotalCartPrice(respons.data.data.totalCartPrice);
    setnumOfCartItems(respons.data.numOfCartItems );
    setAllProduct(respons.data.data.products);
    return true;
  }).catch((err)=>{
    console.log(err,"eror")
  })
}
async function clearitem(){
  return  await axios.delete(`https://ecommerce.routemisr.com/api/v1/cart`,{
    headers:{token:headers}
  }
).then((respons)=>{
  settotalCartPrice(0);
  setnumOfCartItems(0 );
  setAllProduct([]);
  return true
}).catch((err)=>{
  console.log(err,"eror")
})
}


async function updatProductToCart(id,count){
  return  await axios.put(`https://ecommerce.routemisr.com/api/v1/cart/${id}`,{
    count:count
  },{
      headers:{token:headers}
  }).then((respons)=>{
    settotalCartPrice(respons.data.data.totalCartPrice);
    setnumOfCartItems(respons.data.numOfCartItems );
    setAllProduct(respons.data.data.products);
    return true;

  }).catch((err)=>{
    console.log(err,"eror")  })
}

  return <CartContext.Provider value={{addProductToCart,totalCartPrice, settotalCartPrice,numOfCartItems, setnumOfCartItems,
  AllProduct, setAllProduct, updatProductToCart,removeCartItems,clearitem,CartId  ,getLoggedUserCart,cartOwner
}}>

            {children}

  </CartContext.Provider>
}
