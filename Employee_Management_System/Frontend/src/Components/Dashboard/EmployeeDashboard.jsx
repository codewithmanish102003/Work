import Header from '../Other/Header'
import TasklistNumber from '../Other/TasklistNumber'
import TaskList from '../TaskList/TaskList'

const EmployeeDashboard = () => {

  return (
    <div className='min-h-screen pt-2 w-full bg-gray-100 '>
    <Header/>
    <TasklistNumber/>
    <TaskList/>
    </div>
  )
}



export default EmployeeDashboard
