import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { resetPassword } from '../../services/api';

const ResetPasswordForm = () => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const { token } = useParams();
  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      toast.error('Passwords do not match');
      return;
    }

    try {
      const response = await resetPassword(token, { password });
      toast.success('Password reset successful!');
      setMessage(response.message);
      setPassword('');
      setConfirmPassword('');
      setTimeout(() => navigate('/'), 3000);
    } catch (err) {
      setError('Failed to reset password. Please try again.');
      toast.error('Failed to reset password. Please try again.');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-slate-900">
      <div className="border-2 rounded-[10px] p-[5px] bg-white m-5">
        <div className='flex-col justify-center items-center'>
          <h1 className='mr-5 ml-5 mt-5 font-semibold text-2xl text-center'>Employee Management System</h1>
          <p className='mt-5 mb-5 text-center'>Reset Your Password</p>
        </div>

        <form onSubmit={submitHandler} className="flex flex-col gap-[10px] px-8 pb-[0.4em]">
          {message && <p className="text-green-500 text-center">{message}</p>}
          {error && <p className="text-red-500 text-center">{error}</p>}

          <label>New Password</label>
          <div className="flex items-center justify-center gap-2 border-2 p-[0.6em] text-white">
            <svg viewBox="0 0 16 16" fill="currentColor" className="h-[1.3em] w-[1.3em] fill-black" xmlns="http://www.w3.org/2000/svg">
              <path d="M8 1a2 2 0 0 1 2 2v4H6V3a2 2 0 0 1 2-2zm3 6V3a3 3 0 0 0-6 0v4a2 2 0 0 0-2 2v5a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2z" />
            </svg>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="border-none outline-none w-full text-black" placeholder="Enter new password" required />
          </div>

          <label>Confirm Password</label>
          <div className="flex items-center justify-center gap-2 border-2 p-[0.6em] text-white">
            <svg viewBox="0 0 16 16" fill="currentColor" className="h-[1.3em] w-[1.3em] fill-black" xmlns="http://www.w3.org/2000/svg">
              <path d="M8 1a2 2 0 0 1 2 2v4H6V3a2 2 0 0 1 2-2zm3 6V3a3 3 0 0 0-6 0v4a2 2 0 0 0-2 2v5a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2z" />
            </svg>
            <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} className="border-none outline-none w-full text-black" placeholder="Confirm new password" required />
          </div>

          <div className="flex justify-center flex-row mt-10">
            <button type="submit" className="px-[1.1em] py-2 w-full rounded-[5px] mr-2 border-none outline-none bg-blue-900 text-white">
              Reset Password
            </button>
          </div>

          <div className="flex justify-center flex-row mb-10">
            <button type="button" onClick={() => navigate('/')} className="px-[1.1em] py-2 w-full rounded-[5px] mr-2 border-none outline-none bg-blue-900 text-white">
              Back To Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ResetPasswordForm;