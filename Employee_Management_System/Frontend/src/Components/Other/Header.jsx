import React, { useContext } from 'react';
import { AuthContext } from '../../Context/AuthProvider';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

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
    <div className='flex items-end justify-between'>
      <h1 className="text-2xl font-medium">Hello <br /><span className='text-3xl font-semibold'>{role === 'admin' ? "Admin" : userData?.firstname
}👋</span></h1>
      <button onClick={handleLogout} className='bg-red-600 text-lg font-medium text-white px-5 py-3 rounded-lg'>Logout</button>
    </div>
  )
}

export default Header
