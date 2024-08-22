import React from 'react'
import MyImg from '../../images/error.svg'
export default function NotFound() {
  return (
    <>
    <div className='d-flex justify-content-center align-items-center mt-5'>
        <img src={MyImg} alt='error'  className='w-50 ' />
    </div>
    </>
  )
}
