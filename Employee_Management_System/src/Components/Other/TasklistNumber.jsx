import React, { useContext } from 'react';
import { AuthContext } from '../../Context/AuthProvider';

const TasklistNumber = () => {
  const {userData } = useContext(AuthContext);
  console.log(userData);
  


  return (
    <div className='flex mt-10 justify-between gap-5 screen'>
      <div className='h-40 w-[45%] bg-red-400 rounded-xl py-6 px-9 items-center justify-between'>
        <h2 className='text-2xl font-semibold'>{userData?.taskCounts.newTask}</h2>
        <h3 className='text-xl font-medium'>New Task</h3>
      </div>
      <div className='h-40 w-[45%] bg-yellow-300 rounded-xl py-6 px-9'>
        <h2 className='text-2xl font-semibold'>{userData?.taskCounts.completed}</h2>
        <h3 className='text-xl font-medium'>Completed Task</h3>
      </div>
      <div className='h-40 w-[45%] bg-green-400 rounded-xl py-6 px-9'>
        <h2 className='text-2xl font-semibold'>{userData?.taskCounts.active}</h2>
        <h3 className='text-xl font-medium'>Active Task</h3>
      </div>
      <div className='h-40 w-[45%] bg-blue-400 rounded-xl py-6 px-9'>
        <h2 className='text-2xl font-semibold'>{userData?.taskCounts.failed}</h2>
        <h3 className='text-xl font-medium'>Failed Task</h3>
      </div>
    </div>
  )
}

export default TasklistNumber;