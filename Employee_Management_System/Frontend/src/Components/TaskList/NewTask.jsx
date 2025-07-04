import axios from 'axios';
import { useContext } from 'react';
import { toast } from 'react-toastify';
import { AuthContext } from '../../Context/AuthProvider';


const NewTask = ({ data, bgcolor }) => {
  const { user, userData, setUserData } = useContext(AuthContext);

  const handleAcceptTask = async () => {
    if (!window.confirm("Are You Sure...??")) {
      return;
    }

    try {
      // Update the task status
      const updatedTask = { ...data, active: true, newTask: false };

      // Send the updated task to the backend
      await axios.put(`http://localhost:3000/api/tasks/${data._id}`, updatedTask, {
        headers: {
          Authorization: `Bearer ${user}`,
        },
      });

      // Ensure taskCounts exists and has valid values
      const currentTaskCounts = userData?.taskCounts || {
        active: 0,
        newTask: 0,
        completed: 0,
        failed: 0
      };

      // Update the task counts with validation
      const updatedTaskCounts = {
        ...currentTaskCounts,
        active: Math.max(0, currentTaskCounts.active + 1),
        newTask: Math.max(0, currentTaskCounts.newTask - 1),
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
      toast.success('Task accepted successfully!');
    } catch (error) {
      console.error('Error updating task:', error);
      toast.error('Failed to accept task. Please try again.');
    }
  };

  return (
    <div className={`h-full flex-shrink-0 w-full sm:w-[327px] ${bgcolor} rounded-xl px-4 sm:px-5 py-4 sm:py-6`}>
      <div className="flex justify-between items-center">
        <h3 className="bg-white px-2 sm:px-3 py-1.5 sm:py-2 text-xs sm:text-sm rounded-lg">{data.category}</h3>
        <h4 className="text-xs sm:text-sm font-semibold text-white">{data.taskDate}</h4>
      </div>
      <div className='h-[50%] mt-3 sm:mt-5'>
        <h1 className="font-semibold text-lg sm:text-2xl text-white">{data.taskTitle}</h1>
        <p className="text-xs sm:text-sm mt-2 text-white">{data.taskDescription}</p>
      </div>
      <div className='flex justify-between mt-3 sm:mt-4'>
        <button
          className='w-full bg-white py-2 sm:py-3 px-2 sm:px-3 text-xs sm:text-sm rounded-lg hover:bg-gray-100 transition-colors'
          onClick={handleAcceptTask}
        >
          Accept Task
        </button>
      </div>
    </div>
  );
};

export default NewTask;