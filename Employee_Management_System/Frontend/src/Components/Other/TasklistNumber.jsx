import React, { useContext } from 'react';
import { AuthContext } from '../../Context/AuthProvider';

const TasklistNumber = () => {
  const { userData } = useContext(AuthContext);
  
  // Default values for task counts
  const taskCounts = userData?.taskCounts || {
    newTask: 0,
    completed: 0,
    active: 0,
    failed: 0
  };

  return (
    <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4 border-2 mx-2 md:mx-5 p-3 md:p-5'>
      <div className='h-28 sm:h-32 w-full bg-blue-900 rounded-xl p-4 md:p-6 flex flex-col justify-between'>
        <h2 className='text-2xl sm:text-3xl md:text-4xl font-semibold text-white'>{taskCounts.newTask}</h2>
        <h3 className='text-sm sm:text-base md:text-lg font-medium text-white'>Task Assigned</h3>
      </div>
      <div className='h-28 sm:h-32 w-full bg-white rounded-xl p-4 md:p-6 flex flex-col justify-between'>
        <h2 className='text-2xl sm:text-3xl md:text-4xl font-semibold'>{taskCounts.completed}</h2>
        <h3 className='text-sm sm:text-base md:text-lg font-medium'>Completed Task</h3>
      </div>
      <div className='h-28 sm:h-32 w-full bg-white rounded-xl p-4 md:p-6 flex flex-col justify-between'>
        <h2 className='text-2xl sm:text-3xl md:text-4xl font-semibold'>{taskCounts.active}</h2>
        <h3 className='text-sm sm:text-base md:text-lg font-medium'>Active Task</h3>
      </div>
      <div className='h-28 sm:h-32 w-full bg-white rounded-xl p-4 md:p-6 flex flex-col justify-between'>
        <h2 className='text-2xl sm:text-3xl md:text-4xl font-semibold'>{taskCounts.failed}</h2>
        <h3 className='text-sm sm:text-base md:text-lg font-medium'>Failed Task</h3>
      </div>
    </div>
  );
};

export default TasklistNumber;