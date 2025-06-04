import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { AuthContext } from '../../Context/AuthProvider';

const Header = () => {

  const { logout, role } = useContext(AuthContext);
  const navigate = useNavigate();
  const { userData, tasks } = useContext(AuthContext);
  console.log(userData);
  console.log(tasks);


  const handleLogout = () => {
    logout();
    toast.success('Logout successful!');
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    localStorage.removeItem('userData');
    localStorage.removeItem('tasks');
    localStorage.removeItem('userId');
    localStorage.removeItem('userRole');
    localStorage.removeItem('userName');
    localStorage.removeItem('userEmail'); 
    navigate('/');
  };



  return (
    <div className='flex items-center justify-between border-b-2 pb-3 md:pb-5 px-3 md:px-5'>
      <div>
        <h1 className="text-xl md:text-2xl font-medium">Hello <br /><span className='text-2xl md:text-3xl font-semibold'>{role === 'admin' ? "Admin" : userData?.firstname}👋</span></h1>
      </div>
      <div className="flex gap-2 md:gap-4">
        {role === 'admin' && (
          <button 
            onClick={() => navigate('/add-user')} 
            className='bg-blue-900 text-sm md:text-lg font-medium text-white px-2 md:px-4 py-1.5 md:py-2 rounded-lg'
          >
            Add Employee
          </button>
        )}
        <button 
          onClick={handleLogout} 
          className='bg-blue-900 text-sm md:text-lg font-medium text-white px-2 md:px-4 py-1.5 md:py-2 rounded-lg'
        >
          Logout
        </button>
      </div>  
    </div>
  )
}

export default Header
