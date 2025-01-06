import React, { useContext } from 'react';
import { AuthContext } from '../../Context/AuthProvider';
import AcceptTask from './AcceptTask';
import NewTask from './NewTask';
import CompleteTask from './CompleteTask';
import FailedTask from './FailedTask';

const TaskList = () => {
  const { userData } = useContext(AuthContext);
  console.log(userData);

  return (
    <div id="taskList" className="flex items-center justify-start gap-6 flex-nowrap w-full h-[55%] py-5 mt-10 rounded-lg overflow-x-auto">
      {userData?.tasks.length === 0 ? (
        <p className="text-white">No tasks given yet....</p>
      ) : (
        userData?.tasks.map((e, idx) => {
          if (e.active) {
            return <AcceptTask key={idx} data={e} bgcolor={"bg-green-400"} />;
          }
          if (e.newTask) {
            return <NewTask key={idx} data={e} bgcolor={"bg-red-400"} />;
          }
          if (e.completed) {
            return <CompleteTask key={idx} data={e} bgcolor={"bg-yellow-300"} />;
          }
          if (e.failed) {
            return <FailedTask key={idx} data={e} bgcolor={"bg-blue-400"} />;
          }
          return null; // Default case if no conditions match
        })
      )}
    </div>
  );
};

export default TaskList;