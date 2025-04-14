import React from 'react'
import { useState } from 'react';

const CompleteTask = ({data,bgcolor}) => {
  const [buttonText, setButtonText] = useState('Completed');

  const handleCompletedClick = (e) => {
    e.preventDefault();
    alert("Are You Sure..??")
    setButtonText('Need Nothing To Do');
  };
  return (
    
    <div className={`h-full flex-shrink-0 w-[327px] ${bgcolor} rounded-xl px-5 py-6`}>
    <div className="flex justify-between items-center">
        <h3 className="bg-red-600 px-3 py-2 text-sm rounded-lg">{data.category}</h3>
        <h4 className="text-sm font-semibold">{data.taskDate}</h4>
    </div>
    <div className='h-[50%]'>
      <h1 className="mt-5 font-semibold text-2xl">{data.taskTitle}</h1>
      <p className="text-sm mt-2">{data.taskDescription}</p>
      </div>
    <div className='flex justify-between mt-4'>
        <button onClick={handleCompletedClick} className='bg-yellow-500 w-full py-2 px-3 text-sm rounded-lg'>
            {buttonText}
        </button>
    </div>
  </div>
  
  )
}

export default CompleteTask