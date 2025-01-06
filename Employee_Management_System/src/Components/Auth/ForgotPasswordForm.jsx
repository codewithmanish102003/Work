import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { forgotPassword } from '../../services/api';

const ForgotPasswordForm = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const response = await forgotPassword({ email });
      setMessage(response.message);
      setEmail('');
    } catch (err) {
      setError('Failed to send reset email. Please try again.');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen animate-fade-in">
      <div className="bg-gradient-to-br from-[#00ff75] to-[#3700ff] rounded-[22px] p-[1px] transition-all duration-300 hover:shadow-[0px_0px_30px_1px_rgba(0,255,117,0.3)]">
        <div className="rounded-none hover:rounded-[20px] transition-all duration-200 hover:scale-[0.98]">
          <form onSubmit={submitHandler} className="flex flex-col gap-[10px] px-8 pb-[0.4em] bg-[#171717] rounded-[25px] transition-all duration-[0.4s]">
            <p id="heading" className="text-center my-8 text-white text-[1.2em]">Forgot Password</p>
            {message && <p className="text-green-500 text-center">{message}</p>}
            {error && <p className="text-red-500 text-center">{error}</p>}
            <div className="flex items-center justify-center gap-2 rounded-[25px] p-[0.6em] text-white bg-[#171717] shadow-[inset_2px_5px_10px_rgb(5,5,5)]">
              <svg viewBox="0 0 16 16" fill="currentColor" className="h-[1.3em] w-[1.3em] fill-white" xmlns="http://www.w3.org/2000/svg">
                <path d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V4Zm2-1a1 1 0 0 0-1 1v.217l7 4.2 7-4.2V4a1 1 0 0 0-1-1H2Zm13 2.383-4.708 2.825L15 11.105V5.383Zm-.034 6.876-5.64-3.471L8 9.583l-1.326-.795-5.64 3.47A1 1 0 0 0 2 13h12a1 1 0 0 0 .966-.741ZM1 11.105l4.708-2.897L1 5.383v5.722Z" />
              </svg>
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="bg-transparent border-none outline-none w-full text-[#d3d3d3]" placeholder="Enter your email" autoComplete="off" required />
            </div>
            <div className="flex justify-center flex-row mt-10">
              <button type="submit" className="px-[2.3em] py-2 rounded-[5px] border-none outline-none transition-all duration-[0.4s] bg-[#252525] text-white hover:bg-black">
                Send Reset Email
              </button>
            </div>
            <button type="button" onClick={() => navigate('/')} className="mb-12 py-2 rounded-[5px] border-none outline-none transition-all duration-[0.4s] bg-[#252525] text-white hover:bg-blue-500">
              Back to Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ForgotPasswordForm;