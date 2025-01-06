
import React, { useContext } from 'react';
import { fetchUserData } from '../../services/api';
import { useEffect, useState } from 'react';




const AllTask = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const usersData = await fetchUserData();
        setUsers(usersData);
      } catch (error) {
        console.error('Error fetching all users data:', error);
      }
    };

    fetchData();
  }, []);


  console.log(users);
  

  // Filter out admin from authData
  const employees = users.filter(user => user.role !== 'admin');

  return (
    <div className='bg-[#1c1c1c] p-5 mt-5 rounded'>
      <div className='bg-red-400 mb-2 py-2 px-4 flex justify-between rounded'>
        <h2 className='w-1/5 text-lg font-medium '>Employee Name</h2>
        <h3 className='w-1/5 text-lg font-medium '>New Task</h3>
        <h5 className='w-1/5 text-lg font-medium '>Active Task</h5>
        <h5 className='w-1/5 text-lg font-medium '>Completed</h5>
        <h5 className='w-1/5 text-lg font-medium '>Failed</h5>
      </div>
      <div id="taskList" className='h-[80%] overflow-auto'>
        {employees.map((e, idx) => (
          <div key={idx} id="taskList" className='border-2 border-emerald-500 mb-2 py-2 px-4 flex justify-between rounded'>
            <h2 className='w-1/5 text-lg font-medium'>{e.firstname}</h2>
            <h3 className='w-1/5 text-lg font-medium text-blue-600 '>{e.taskCounts.newTask}</h3>
            <h5 className='w-1/5 text-lg font-medium text-yellow-500 '>{e.taskCounts.active}</h5>
            <h5 className='w-1/5 text-lg font-medium text-green-600 '>{e.taskCounts.completed}</h5>
            <h5 className='w-1/5 text-lg font-medium text-red-600 '>{e.taskCounts.failed}</h5>
          </div>
        ))}
      </div>
    </div>
  )
}

export default AllTask