import Header from '../Other/Header'
import TasklistNumber from '../Other/TasklistNumber'
import TaskList from '../TaskList/TaskList'

const EmployeeDashboard = () => {

  return (
    <div className='p-20 bg-[#1c1c1c] h-screen '>
    <Header/>
    <TasklistNumber/>
    <TaskList/>
    </div>
  )
}



export default EmployeeDashboard
