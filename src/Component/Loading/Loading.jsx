import React from 'react'
import { BallTriangle } from 'react-loader-spinner'

export default function Loading() {
  return (
    <BallTriangle
    height={200}
    width={200}
    radius={5}
    color="#4fa94d"
    ariaLabel="ball-triangle-loading"
    wrapperStyle={{}}
    wrapperClass=""
    visible={true}
    />
  )
}
