import React, { useContext } from 'react';
import { AuthContext } from '../../Context/AuthProvider';
import axios from 'axios';

const FailedTask = ({ data, bgcolor }) => {
  const { user, userData, setUserData } = useContext(AuthContext);

  const handleReviveTask = async () => {
    alert("Are You sure??")
    try {
      // Update the task status
      const updatedTask = { ...data, active: true, failed: false };

      // Send the updated task to the backend
      await axios.put(`http://localhost:3000/api/tasks/${data._id}`, updatedTask, {
        headers: {
          Authorization: `Bearer ${user}`,
        },
      });

      // Update the task counts
      const updatedTaskCounts = {
        ...userData.taskCounts,
        active: userData.taskCounts.active + 1,
        failed: userData.taskCounts.failed - 1,
      };

      // Update the tasks array
      const updatedTasks = userData.tasks.map(task =>
        task._id === data._id ? updatedTask : task
      );

      // Update the user data
      const updatedUserData = {
        ...userData,
        tasks: updatedTasks,
        taskCounts: updatedTaskCounts,
      };

      // Update the context state
      setUserData(updatedUserData);
    } catch (error) {
      console.error('Error updating task:', error);
    }
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
        <button
          className='w-full bg-blue-500 py-2 px-3 text-sm rounded-lg'
          onClick={handleReviveTask}
        >
          Revive The Task
        </button>
      </div>
    </div>
  );
};

export default FailedTask;