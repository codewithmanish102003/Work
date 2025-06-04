import AllTask from '../Other/AllTask'
import CreateTask from '../Other/CreateTask'
import Header from '../Other/Header'
import Hero from '../Other/Hero'

const AdminDashboard = () => {
    return (
        <div className='min-h-screen pt-2 w-full bg-gray-100'>
            <Header/>
            <Hero/>
            <CreateTask/>
            <AllTask/>
        </div>
    )
}



export default AdminDashboard
