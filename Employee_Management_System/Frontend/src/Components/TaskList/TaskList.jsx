import React, { useContext } from 'react';
import { AuthContext } from '../../Context/AuthProvider';
import AcceptTask from './AcceptTask';
import CompleteTask from './CompleteTask';
import FailedTask from './FailedTask';
import NewTask from './NewTask';

const TaskList = () => {
  const { userData } = useContext(AuthContext);

  return (
    <div id="taskList" className="flex flex-wrap md:flex-nowrap items-start justify-start gap-4 w-[98vw] px-2 md:px-5 py-5 mt-5 md:mt-10 rounded overflow-x-auto border-2 mx-2 md:mx-5">
      {userData?.tasks.length === 0 ? (
        <p className="text-gray-500 text-center w-full">No tasks given yet....</p>
      ) : (
        userData?.tasks.map((e, idx) => {
          if (e.active) {
            return <AcceptTask key={idx} data={e} bgcolor={"bg-white"} />;
          }
          if (e.newTask) {
            return <NewTask key={idx} data={e} bgcolor={"bg-blue-900"} />;
          }
          if (e.completed) {
            return <CompleteTask key={idx} data={e} bgcolor={"bg-white"} />;
          }
          if (e.failed) {
            return <FailedTask key={idx} data={e} bgcolor={"bg-white"} />;
          }
          return null;
        })
      )}
    </div>
  );
};

export default TaskList;