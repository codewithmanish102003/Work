import React, { useState } from 'react';

const CompleteTask = ({data,bgcolor}) => {
  const [buttonText, setButtonText] = useState('Completed');

  const handleCompletedClick = (e) => {
    e.preventDefault();
    alert("Are You Sure..??")
    setButtonText('Need Nothing To Do');
  };
  return (
    <div className={`h-full flex-shrink-0 w-full sm:w-[327px] ${bgcolor} rounded-xl px-4 sm:px-5 py-4 sm:py-6`}>
      <div className="flex justify-between items-center">
        <h3 className="bg-blue-900 text-white px-2 sm:px-3 py-1.5 sm:py-2 text-xs sm:text-sm rounded-lg">{data.category}</h3>
        <h4 className="text-xs sm:text-sm font-semibold">{data.taskDate}</h4>
      </div>
      <div className='h-[50%] mt-3 sm:mt-5'>
        <h1 className="font-semibold text-lg sm:text-2xl">{data.taskTitle}</h1>
        <p className="text-xs sm:text-sm mt-2">{data.taskDescription}</p>
      </div>
      <div className='flex justify-between mt-3 sm:mt-4'>
        <button 
          onClick={handleCompletedClick} 
          className='bg-blue-900 text-white w-full py-2 sm:py-3 px-2 sm:px-3 text-xs sm:text-sm rounded-lg hover:bg-blue-800 transition-colors'
        >
          {buttonText}
        </button>
      </div>
    </div>
  );
}

export default CompleteTask