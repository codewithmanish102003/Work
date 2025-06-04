import React, { useEffect, useState } from 'react';
import { fetchUserData } from '../../services/api';

const AllTask = () => {
  const [users, setUsers] = useState([]);
  const [filter, setFilter] = useState('all'); // State for filtering tasks

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

  // Filter out admin from authData
  const employees = users.filter(user => user.role !== 'admin');

  return (
    <div className="bg-gray-100 p-5 m-5 border-2 rounded">
      {/* Filter Dropdown */}
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-lg sm:text-xl font-semibold ">All Tasks</h1>
        <select
          value={filter}
          onChange={e => setFilter(e.target.value)}
          className="bg-blue-700 text-white text-sm sm:text-base py-2 px-4 rounded"
        >
          <option value="all">All Tasks</option>
          <option value="newTask">New Task</option>
          <option value="active">Active Task</option>
          <option value="completed">Completed</option>
          <option value="failed">Failed</option>
        </select>
      </div>

      {/* Header Row */}
      <div className="bg-blue-900  mb-2 py-2 px-4 grid grid-cols-2 sm:grid-cols-5 gap-2 rounded">
        <h2 className="text-sm sm:text-lg font-medium text-white">Employee Name</h2>
        <h3 className={`text-sm sm:text-lg font-medium text-white ${filter === 'newTask' ? 'block' : 'hidden'} sm:block`}>
          New Task
        </h3>
        <h5 className={`text-sm sm:text-lg font-medium text-white ${filter === 'active' ? 'block' : 'hidden'} sm:block`}>
          Active Task
        </h5>
        <h5 className={`text-sm sm:text-lg font-medium text-white ${filter === 'completed' ? 'block' : 'hidden'} sm:block`}>
          Completed
        </h5>
        <h5 className={`text-sm sm:text-lg font-medium text-white ${filter === 'failed' ? 'block' : 'hidden'} sm:block`}>
          Failed
        </h5>
      </div>

      {/* Employee Task List */}
      <div id="taskList" className="h-[80%] overflow-auto">
        {employees.map((e, idx) => (
          <div
            key={idx}
            className="border-2 border-blue-900 mb-2 py-2 px-4 grid grid-cols-2 sm:grid-cols-5 gap-2 rounded"
          >
            <h2 className="text-sm sm:text-lg font-medium">{e.firstname}</h2>
            <h3
              className={`text-sm sm:text-lg font-medium  ${
                filter === 'newTask' ? 'block' : 'hidden'
              } sm:block`}
            >
              {e.taskCounts.newTask}
            </h3>
            <h5
              className={`text-sm sm:text-lg font-medium  ${
                filter === 'active' ? 'block' : 'hidden'
              } sm:block`}
            >
              {e.taskCounts.active}
            </h5>
            <h5
              className={`text-sm sm:text-lg font-medium  ${
                filter === 'completed' ? 'block' : 'hidden'
              } sm:block`}
            >
              {e.taskCounts.completed}
            </h5>
            <h5
              className={`text-sm sm:text-lg font-medium  ${
                filter === 'failed' ? 'block' : 'hidden'
              } sm:block`}
            >
              {e.taskCounts.failed}
            </h5>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllTask;