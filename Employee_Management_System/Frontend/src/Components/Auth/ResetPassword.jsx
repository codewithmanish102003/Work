import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { resetPassword } from '../../services/api';
import { toast } from 'react-toastify';

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
    <div className="flex items-center justify-center min-h-screen animate-fade-in">
      <div className="bg-gradient-to-br from-[#00ff75] to-[#3700ff] rounded-[22px] p-[1px] transition-all duration-300 hover:shadow-[0px_0px_30px_1px_rgba(0,255,117,0.3)]">
        <div className="rounded-none hover:rounded-[20px] transition-all duration-200 hover:scale-[0.98]">
          <form onSubmit={submitHandler} className="flex flex-col gap-[10px] px-8 pb-[0.4em] bg-[#171717] rounded-[25px] transition-all duration-[0.4s]">
            <p id="heading" className="text-center my-8 text-white text-[1.2em]">Reset Password</p>
            {message && <p className="text-green-500 text-center">{message}</p>}
            {error && <p className="text-red-500 text-center">{error}</p>}
            <div className="flex items-center justify-center gap-2 rounded-[25px] p-[0.6em] text-white bg-[#171717] shadow-[inset_2px_5px_10px_rgb(5,5,5)]">
              <svg viewBox="0 0 16 16" fill="currentColor" className="h-[1.3em] w-[1.3em] fill-white" xmlns="http://www.w3.org/2000/svg">
                <path d="M8 1a2 2 0 0 1 2 2v4H6V3a2 2 0 0 1 2-2zm3 6V3a3 3 0 0 0-6 0v4a2 2 0 0 0-2 2v5a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2z" />
              </svg>
              <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="bg-transparent border-none outline-none w-full text-[#d3d3d3]" placeholder="New Password" required />
            </div>
            <div className="flex items-center justify-center gap-2 rounded-[25px] p-[0.6em] text-white bg-[#171717] shadow-[inset_2px_5px_10px_rgb(5,5,5)]">
              <svg viewBox="0 0 16 16" fill="currentColor" className="h-[1.3em] w-[1.3em] fill-white" xmlns="http://www.w3.org/2000/svg">
                <path d="M8 1a2 2 0 0 1 2 2v4H6V3a2 2 0 0 1 2-2zm3 6V3a3 3 0 0 0-6 0v4a2 2 0 0 0-2 2v5a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2z" />
              </svg>
              <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} className="bg-transparent border-none outline-none w-full text-[#d3d3d3]" placeholder="Confirm New Password" required />
            </div>
            <div className="flex justify-center flex-row mt-10">
              <button type="submit" className="px-[2.3em] py-2 rounded-[5px] border-none outline-none transition-all duration-[0.4s] bg-[#252525] text-white hover:bg-black">
                Reset Password
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ResetPasswordForm;