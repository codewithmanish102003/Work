import React, { useContext } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import AdminDashboard from './Components/Dashboard/AdminDashboard';
import EmployeeDashboard from './Components/Dashboard/EmployeeDashboard';
import { AuthContext } from './Context/AuthProvider';
import LoginForm from './Components/Auth/LoginForm';
import SignupForm from './Components/Auth/SignUp';
import ForgotPasswordForm from './Components/Auth/ForgotPasswordForm';
import ResetPasswordForm from './Components/Auth/ResetPassword';

function App() {
  const { user, role } = useContext(AuthContext);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginForm />} />
        <Route path="/signup" element={<SignupForm />} />
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
      </Routes>
    </Router>
  );
}

export default App;