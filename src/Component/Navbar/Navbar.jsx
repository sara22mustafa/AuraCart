import React, { useContext, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import myImg from "../../images/logo.png";
import { AuthContext } from '../../Context/AuthContext';
import { CartContext } from '../../Context/CartContext';
import '../../index.css'

export default function Register() {
  const { myToken, settoken } = useContext(AuthContext);
  const navigate = useNavigate();

  function logout() {
    settoken(null);
    localStorage.removeItem("tkn");
    navigate("/login");
  }

  useEffect(() => {
    const val = localStorage.getItem("tkn");
    if (val != null) {
      settoken(val);
    }
  }, [settoken]);

  const { numOfCartItems } = useContext(CartContext);

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light bg-light fixed-top">
        <div className="container-fluid p-2">
          <Link className="navbar-brand" to={'/home'}>
            <img src={myImg} alt='logo' />
            <span>AuraCart</span>
          </Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            {myToken ? (
              <ul className="navbar-nav mr-auto">
                <li className="nav-item mx-1">
                  <Link className="nav-link text-muted fs-5" to={'/Home'}>Home</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link fs-5 text-muted" to={'/categories'}>Categories</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link fs-5 text-muted" to={'/brands'}>Brands</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link fs-5 text-muted" to={'/AllOrders'}>All Order</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link fs-5 text-muted position-relative" to={'/cart'}>
                    Cart
                    <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                      {numOfCartItems ? numOfCartItems : ""}
                    </span>
                  </Link>
                </li>
              </ul>
            ) : ""}
            <ul className="navbar-nav ms-auto d-flex align-items-center">
              <li className="nav-item">
                <ul className='d-flex list-unstyled socialm'>
                  <li>
                    <i className="fa-brands fa-instagram me-3 px-1 fs-4"></i>
                    <i className="fa-brands fa-facebook me-3 px-1 fs-4"></i>
                    <i className="fa-brands fa-tiktok me-3 px-1 fs-4"></i>
                    <i className="fa-brands fa-twitter me-3 px-1 fs-4"></i>
                    <i className="fa-brands fa-linkedin me-3 px-1 fs-4"></i>
                    <i className="fa-brands fa-youtube me-3 px-1 fs-4"></i>
                  </li>
                </ul>
              </li>
              {myToken ? (
                <li className="nav-item">
                  <span role='button' onClick={logout} className='fs-5 text-muted'>Logout</span>
                </li>
              ) : (
                <>
                  <li className="nav-item">
                    <Link className="nav-link fs-5 text-muted" to={'/register'}>Register</Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link fs-5 text-muted" to={'/login'}>Login</Link>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}

// import React, { useContext, useEffect } from 'react'
// import { Link, useNavigate } from 'react-router-dom'

// import myImg from "../../images/logo.png"
// import { AuthContext } from '../../Context/AuthContext'
// import { CartContext } from '../../Context/CartContext'

// export default function Register() {
// const{myToken,settoken}=useContext(AuthContext)
// const navigate=useNavigate();
//   function logout(){
//   settoken(null);
//   localStorage.removeItem("tkn");
//   navigate("/login")
//   }

//   useEffect(function(){
//     const val= localStorage.getItem("tkn");
//     if(val !=null){
//       settoken(val)
//     }
//   },[])

//   const{numOfCartItems}=useContext(CartContext);
  
//   return (
//     <>
//    <nav className="navbar navbar-expand-lg navbar-light bg-light fixed-top   ">
    
// <div className="container-fluid p-2">
// <Link className="navbar-brand" to={'/home'}>
//   <img src={myImg} width="55" height="49" alt='logo' />
//   <span>AuraCart</span>
// </Link>
//     <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
//       <span className="navbar-toggler-icon" />
//     </button>
  
  
  
  
//   <div className="collapse navbar-collapse" id="navbarSupportedContent">
//     {myToken ?
//     <ul className="navbar-nav mr-auto">
//       <li className="nav-item mx-1 ">
//         <Link className="nav-link   text-muted  fs-5   text-muted" to={'/Home'}>Home</Link>
//       </li>


      

     


//       <li className="nav-item">
//         <Link className="nav-link fs-5   text-muted 
//         " to={'/categories'}>Categories</Link>
//       </li>


//       <li className="nav-item">
//         <Link className="nav-link fs-5   text-muted 
//         " to={'/brands'}>Brands</Link>
//       </li>

      
//       <li className="nav-item">
//         <Link className="nav-link fs-5   text-muted 
//         " to={'/AllOrders'}>All Order</Link>
//       </li>

//       <li className="nav-item">
//         <Link className="nav-link fs-5   text-muted 
//          position-relative" to={'/cart'}>Cart
//         <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
//      {numOfCartItems?numOfCartItems :""}
     
    
//   </span>
        
//         </Link>
//       </li>


//     </ul>:"" }
    

   
//     <ul className="navbar-nav ms-auto d-flex align-items-center">
//       <li className="nav-item">
//         <ul className='d-flex  list-unstyled socialm '>

//             <li>
//             <i className="fa-brands fa-instagram me-3   px-1 fs-4"></i>
//             <i className="fa-brands fa-facebook me-3  px-1 fs-4"></i>
//             <i className="fa-brands fa-tiktok me-3  px-1 fs-4"></i>
//             <i className="fa-brands fa-twitter me-3  px-1 fs-4"></i>
//             <i className="fa-brands fa-linkedin me-3  px-1 fs-4"></i>
//             <i className="fa-brands fa-youtube me-3  px-1 fs-4"></i>
//             </li>
//         </ul>
//       </li>


      

//       { myToken ?  <li className="nav-item">
//         <span role='button  ' onClick={logout} className='fs-5  text-muted '>Logout</span>
//       </li> :<>
      
//       <li className="nav-item">
//         <Link className="nav-link fs-5   text-muted 
//          " to={'/register'}>Register</Link>
//       </li>
//       <li className="nav-item">
//         <Link className="nav-link fs-5   text-muted 
//         " to={'/login'}>Login</Link>
//       </li>
      
//       </>}
     
//     </ul>
//   </div>
//   </div>
// </nav> 

    
//     </>
//   )
// }