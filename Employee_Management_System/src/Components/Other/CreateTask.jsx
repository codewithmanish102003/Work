import axios from 'axios'
import { useState, useEffect } from "react"
import { useContext } from "react";
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

                setEmployees(updatedEmployees);


            } catch (error) {
                console.error('Error creating task:', error);
            }
        } else {
            alert('Employee not found');
        }
        // Reset form fields
        setTaskTitle('');
        setTaskDate('');
        setAssignTo('');
        setCategory('');
        setTaskDescription('');

    };
    return (
        <div className='p-5 bg-[#1c1c1c] mt-7 rounded'>
            <form action="" onSubmit={(e) => { submitHandler(e) }} className='flex-wrap flex items-start justify-between '>
                <div className='w-1/2'>
                    <div>
                        <h3 className='text-sm text-gray-300 mb-0.5'>Task Title</h3>
                        <input value={taskTitle} onChange={(e) => {
                            setTaskTitle(e.target.value)
                        }} className="text-sm py-1 px-2 w-4/5 rounded outline-none bg-transparent border-[1px] border-gray-400 mb-4" type="text" name="" id="" placeholder='Make A Ui Design' />
                    </div>
                    <div>
                        <h3 className='text-sm text-gray-300 mb-0.5'>Date</h3>
                        <input value={taskDate} onChange={(e) => {
                            setTaskDate(e.target.value)
                        }} className="text-sm py-1 px-2 w-4/5 rounded outline-none bg-transparent border-[1px] border-gray-400 mb-4" type="date" />
                    </div>
                    <div>
                        <h3 className='text-sm text-gray-300 mb-0.5'>Assign To</h3>
                        <input value={assignTo} onChange={(e) => {
                            setAssignTo(e.target.value)
                        }} className="text-sm py-1 px-2 w-4/5 rounded outline-none bg-transparent border-[1px] border-gray-400 mb-4" type="text" placeholder='Employee Name' />
                    </div>
                    <div>
                        <h3 className='text-sm text-gray-300 mb-0.5'>Category</h3>
                        <input value={category} onChange={(e) => {
                            setCategory(e.target.value)
                        }} className="text-sm py-1 px-2 w-4/5 rounded outline-none bg-transparent border-[1px] border-gray-400 mb-4" type="text" name="" id="" placeholder='dev,design etc..' />
                    </div>
                </div>

                <div className='w-2/5 flex flex-col items-start'>
                    <h3 className='text-sm text-gray-300 mb-0.5'>Description</h3>
                    <textarea value={taskDescription} onChange={(e) => {
                        setTaskDescription(e.target.value)
                    }} className="w-full h-44 text-sm py-2 px-4 rounded outline-none bg-transparent border-[1px] border-gray-400" name="" id="" cols="30" rows="10"></textarea>
                    <button className='bg-emerald-500 py-3 hover:bg-emerald-600 px-5 rounded text-sm mt-4 w-full'>Create Task</button>
                </div>

            </form>
        </div>
    )
}

export default CreateTask
