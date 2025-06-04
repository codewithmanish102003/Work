import React, { useContext } from 'react';
import { Navigate, Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import AddUser from './Components/Auth/AddUser';
import ForgotPasswordForm from './Components/Auth/ForgotPasswordForm';
import LoginForm from './Components/Auth/LoginForm';
import ResetPasswordForm from './Components/Auth/ResetPassword';
import AdminDashboard from './Components/Dashboard/AdminDashboard';
import EmployeeDashboard from './Components/Dashboard/EmployeeDashboard';
import { AuthContext } from './Context/AuthProvider';

function App() {
  const { user, role } = useContext(AuthContext);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginForm />} />
        <Route path="/forgot-password" element={<ForgotPasswordForm />} />
        <Route path="/reset-password/:token" element={<ResetPasswordForm />} />
        <Route 
          path="/admin" 
          element={user && role === 'admin' ? <AdminDashboard /> : <Navigate to="/" />} 
        />
        <Route 
          path="/employee" 
          element={user && role === 'employee' ? <EmployeeDashboard /> : <Navigate to="/" />} 
        />
        <Route 
          path="/add-user" 
          element={user && role === 'admin' ? <AddUser /> : <Navigate to="/" />} 
        />
      </Routes>
    </Router>
  );
}

export default App;