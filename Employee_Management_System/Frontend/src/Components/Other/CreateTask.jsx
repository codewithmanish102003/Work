import axios from 'axios';
import { useContext, useEffect, useState } from "react";
import { toast } from 'react-toastify';
import { AuthContext } from '../../Context/AuthProvider';




const CreateTask = () => {

    const [taskTitle, setTaskTitle] = useState('');
    const [taskDescription, setTaskDescription] = useState('');
    const [taskDate, setTaskDate] = useState('');
    const [assignTo, setAssignTo] = useState('');
    const [category, setCategory] = useState('');
    const [employees, setEmployees] = useState([]);
    const { user } = useContext(AuthContext);

    useEffect(() => {
        const fetchEmployees = async () => {
            try {
                const response = await axios.get('http://localhost:3000/api/users');
                setEmployees(response.data);
            } catch (error) {
                console.error('Error fetching employees:', error);
            }
        };

        fetchEmployees();
    }, []);

    const submitHandler = async (e) => {
        e.preventDefault();

        // Create a new task object
        // Create a new task object
        const newTask = {
            active: false,
            newTask: true,
            completed: false,
            failed: false,
            taskTitle,
            taskDescription,
            taskDate,
            category,
            taskNumber: `active-${Date.now()}` // Unique task number
        };

        // Find the employee to whom the task is assigned
        const employeeIndex = employees.findIndex(emp => emp.firstname === assignTo);
        if (employeeIndex !== -1) {
            // Update the tasks array for the found employee
            const updatedEmployees = [...employees];
            updatedEmployees[employeeIndex].tasks.push(newTask);

            // Update task counts
            updatedEmployees[employeeIndex].taskCounts.newTask += 1;

            try {
                const response = await axios.post('http://localhost:3000/api/tasks', {
                    firstname: assignTo,
                    task: newTask
                }, {
                    headers: {
                        Authorization: `Bearer ${user}`
                    }
                });
                toast.success('Task created successfully!');
                setEmployees(updatedEmployees);


            } catch (error) {
                toast.error('Error creating task');
                console.error('Error creating task:', error);
            }
        } else {
            alert('Employee not found');
            toast.error('Employee not found');
        }
        // Reset form fields
        setTaskTitle('');
        setTaskDate('');
        setAssignTo('');
        setCategory('');
        setTaskDescription('');

    };
    return (
        <div className='p-2 md:p-5 mt-5 border-2 rounded m-2 md:m-5'>
            <h1 className="text-xl md:text-2xl font-bold mb-2">Assign Task</h1>
            <form action="" onSubmit={(e) => { submitHandler(e) }} className='flex flex-col md:flex-row md:flex-wrap items-start justify-between gap-4'>
                <div className='w-full md:w-1/2'>
                    <div>
                        <h3 className='text-sm mb-0.5'>Task Title</h3>
                        <input value={taskTitle} onChange={(e) => {
                            setTaskTitle(e.target.value)
                        }} className="text-sm py-3 px-2 w-full md:w-4/5 rounded outline-none bg-transparent border-[1px] border-gray-400 mb-4" type="text" name="" id="" placeholder='Make A Ui Design' />
                    </div>
                    <div>
                        <h3 className='text-sm mb-0.5'>Date</h3>
                        <input value={taskDate} onChange={(e) => {
                            setTaskDate(e.target.value)
                        }} className="text-sm py-3 px-2 w-full md:w-4/5 rounded outline-none bg-transparent border-[1px] border-gray-400 mb-4" type="date" />
                    </div>
                    <div>
                        <h3 className='text-sm mb-0.5'>Assign To</h3>
                        <input value={assignTo} onChange={(e) => {
                            setAssignTo(e.target.value)
                        }} className="text-sm py-3 px-2 w-full md:w-4/5 rounded outline-none bg-transparent border-[1px] border-gray-400 mb-4" type="text" placeholder='Employee Name' />
                    </div>
                    <div>
                        <h3 className='text-sm mb-0.5'>Category</h3>
                        <input value={category} onChange={(e) => {
                            setCategory(e.target.value)
                        }} className="text-sm py-3 px-2 w-full md:w-4/5 rounded outline-none bg-transparent border-[1px] border-gray-400 mb-4" type="text" name="" id="" placeholder='dev,design etc..' />
                    </div>
                </div>

                <div className='w-full md:w-2/5 flex flex-col items-start'>
                    <h3 className='text-sm mb-0.5'>Description</h3>
                    <textarea value={taskDescription} onChange={(e) => {
                        setTaskDescription(e.target.value)
                    }} className="w-full h-20 text-sm py-2 px-4 rounded outline-none bg-transparent border-[1px] border-gray-400" name="" id="" cols="20" rows="10"></textarea>
                    <button className='bg-blue-900 text-white py-3 hover:bg-emerald-600 px-5 rounded-lg text-sm mt-4 w-full'>Assign Task</button>
                </div>
            </form>
        </div>
    )
}

export default CreateTask
