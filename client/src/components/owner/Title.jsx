import React from 'react'

function Title({title,subtitle}) {
  return (
    <div>
      <h1 className='font-medium text-2xl'>{title}</h1>
      <h2 className='text-sm md:text-base text-gray-500/90 mt-2 max-w-156'>{subtitle}</h2>
    </div>
  )
}

export default Title
