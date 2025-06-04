import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { forgotPassword, verifyOtp } from '../../services/api';

const ForgotPasswordForm = () => {
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [step, setStep] = useState(1);
  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();
    if (step === 1) {
      try {
        const response = await forgotPassword({ email });
        toast.success('OTP sent successfully!');
        setMessage(response.message);
        setStep(2);
      } catch (err) {
        setError('Failed to send OTP. Please try again.');
        toast.error('Failed to send OTP. Please try again.');
      }
    } else if (step === 2) {
      try {
        const response = await verifyOtp({ email, otp });
        toast.success('OTP verified successfully!');
        setMessage(response.message);
        navigate(`/reset-password/${email}`);
      } catch (err) {
        setError('Invalid OTP. Please try again.');
        toast.error('Invalid OTP. Please try again.');
      }
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
          
          {step === 1 && (
            <>
              <label>Email</label>
              <div className="flex items-center justify-center gap-2 border-2 p-[0.6em] text-white">
                <svg viewBox="0 0 16 16" fill="currentColor" className="h-[1.3em] w-[1.3em] fill-black" xmlns="http://www.w3.org/2000/svg">
                  <path d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V4Zm2-1a1 1 0 0 0-1 1v.217l7 4.2 7-4.2V4a1 1 0 0 0-1-1H2Zm13 2.383-4.708 2.825L15 11.105V5.383Zm-.034 6.876-5.64-3.471L8 9.583l-1.326-.795-5.64 3.47A1 1 0 0 0 2 13h12a1 1 0 0 0 .966-.741ZM1 11.105l4.708-2.897L1 5.383v5.722Z" />
                </svg>
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="border-none outline-none w-full text-black" placeholder="Enter your email" autoComplete="off" required />
              </div>
            </>
          )}
          
          {step === 2 && (
            <>
              <label>OTP</label>
              <div className="flex items-center justify-center gap-2 border-2 p-[0.6em] text-white">
                <svg viewBox="0 0 16 16" fill="currentColor" className="h-[1.3em] w-[1.3em] fill-black" xmlns="http://www.w3.org/2000/svg">
                  <path d="M8 1a2 2 0 0 1 2 2v4H6V3a2 2 0 0 1 2-2zm3 6V3a3 3 0 0 0-6 0v4a2 2 0 0 0-2 2v5a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2z" />
                </svg>
                <input type="text" value={otp} onChange={(e) => setOtp(e.target.value)} className="border-none outline-none w-full text-black" placeholder="Enter OTP" autoComplete="off" required />
              </div>
            </>
          )}

          <div className="flex justify-center flex-row mt-10">
            <button type="submit" className="px-[1.1em] py-2 w-full rounded-[5px] mr-2 border-none outline-none bg-blue-900 text-white">
              {step === 1 ? 'Send OTP' : 'Verify OTP'}
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

export default ForgotPasswordForm;