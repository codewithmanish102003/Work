import AllTask from '../Other/AllTask'
import CreateTask from '../Other/CreateTask'
import Header from '../Other/Header'

const AdminDashboard = () => {
    return (
        <div className='h-screen p-10 w-full'>
            <Header/>
            <CreateTask/>
            <AllTask/>
        </div>
    )
}



export default AdminDashboard
