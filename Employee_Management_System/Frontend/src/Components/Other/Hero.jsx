import React from 'react'

const Hero = () => {
  return (
    <div className='flex flex-col md:flex-row items-center gap-4 border-2 m-2 md:m-5 p-2 md:p-5'>
      <div className='flex w-32 h-32 md:w-40 md:h-40 border-5 rounded-full bg-gray-400 text-center items-center justify-center'>
         <h1 className='text-5xl md:text-7xl text-blue-900'>AU</h1>
      </div>
      <div className='text-center md:text-left'>
        <h1 className='text-lg md:text-xl'>Admin User</h1>
        <p className='text-sm md:text-base'>Management Department</p>
      </div>
    </div>
  )
}

export default Hero
