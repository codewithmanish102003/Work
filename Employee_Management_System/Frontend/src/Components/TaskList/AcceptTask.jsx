import axios from 'axios';
import React, { useContext } from 'react';
import { toast } from 'react-toastify';
import { AuthContext } from '../../Context/AuthProvider';

const AcceptTask = ({ data, bgcolor }) => {
  const { user, userData, setUserData } = useContext(AuthContext);

  const handleUpdateTask = async (updatedTask, updatedTaskCounts) => {
    try {
      console.log(`Updating task with ID: ${data._id}`); 
      // Send the updated task to the backend
      await axios.put(`http://localhost:3000/api/tasks/${data._id}`, updatedTask, {
        headers: {
          Authorization: `Bearer ${user}`,
        },
      });

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
      toast.error('Failed to update task status. Please try again.');
    }
  };

  const handleMarkAsCompleted = () => {
    if (!window.confirm("Are You Sure...??")) {
      return;
    }
    
    // Ensure taskCounts exists and has valid values
    const currentTaskCounts = userData?.taskCounts || {
      active: 0,
      newTask: 0,
      completed: 0,
      failed: 0
    };

    const updatedTask = { ...data, active: false, completed: true, failed: false };
    const updatedTaskCounts = {
      ...currentTaskCounts,
      active: Math.max(0, currentTaskCounts.active - 1),
      completed: currentTaskCounts.completed + 1,
    };
    
    handleUpdateTask(updatedTask, updatedTaskCounts);
    toast.success('Task marked as completed!');
  };

  const handleMarkAsFailed = () => {
    if (!window.confirm("Are You Sure...??")) {
      return;
    }

    // Ensure taskCounts exists and has valid values
    const currentTaskCounts = userData?.taskCounts || {
      active: 0,
      newTask: 0,
      completed: 0,
      failed: 0
    };

    const updatedTask = { ...data, active: false, completed: false, failed: true };
    const updatedTaskCounts = {
      ...currentTaskCounts,
      active: Math.max(0, currentTaskCounts.active - 1),
      failed: currentTaskCounts.failed + 1,
    };
    handleUpdateTask(updatedTask, updatedTaskCounts);
    toast.success('Task marked as failed!');
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
      <div className='flex flex-col sm:flex-row gap-2 sm:gap-3 mt-3 sm:mt-4'>
        <button
          className='bg-blue-900 text-white py-2 sm:py-3 px-2 sm:px-3 text-xs sm:text-sm rounded-lg hover:bg-blue-800 transition-colors'
          onClick={handleMarkAsCompleted}
        >
          Mark as Completed
        </button>
        <button
          className='bg-blue-900 text-white py-2 sm:py-3 px-2 sm:px-3 text-xs sm:text-sm rounded-lg hover:bg-blue-800 transition-colors'
          onClick={handleMarkAsFailed}
        >
          Mark as Failed
        </button>
      </div>
    </div>
  );
};

export default AcceptTask;