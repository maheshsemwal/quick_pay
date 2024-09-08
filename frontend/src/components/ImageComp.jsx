import React from 'react'

const Image = ({imageUrl}) => {
  return (
    <>
      <img src={imageUrl} alt="" className='rounded-full h-14 w-14'/>
    </>
  )
}

export default Image
