import React from 'react';
import {toast} from 'react-toastify';
import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../../services/api';
import { AuthContext } from '../../Context/AuthProvider';

const LoginForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const { login } = useContext(AuthContext);
    const navigate = useNavigate();

    const submitHandler = async (e) => {
        e.preventDefault();
        try {
            const response = await loginUser({ email, password });
            login(response.token, response.role);
            toast.success('Login successful!')
            if (response.role === 'admin') {
                navigate('/admin');
            } else if (response.role === 'employee') {
                navigate('/employee');
            }
        } catch (err) {
            setError('Login failed. Please check your credentials and try again.');
            toast.error('Login failed. Please check your credentials.');
        }

        setEmail('')
        setPassword('')

    };
    return (
        <div className="flex items-center justify-center min-h-screen animate-fade-in">
            <div className="bg-gradient-to-br from-[#00ff75] to-[#3700ff] rounded-[22px] p-[1px] transition-all duration-300 hover:shadow-[0px_0px_30px_1px_rgba(0,255,117,0.3)]">
                <div className="rounded-none hover:rounded-[20px] transition-all duration-200 hover:scale-[0.98]">
                    <form onSubmit={submitHandler} className="flex flex-col gap-[10px] px-8 pb-[0.4em] bg-[#171717] rounded-[25px] transition-all duration-[0.4s]">
                        <p id="heading" className="text-center my-8 text-white text-[1.2em]">Login</p>
                        <div className="flex items-center justify-center gap-2 rounded-[25px] p-[0.6em] text-white bg-[#171717] shadow-[inset_2px_5px_10px_rgb(5,5,5)]">
                            <svg viewBox="0 0 16 16" fill="currentColor" className="h-[1.3em] w-[1.3em] fill-white" xmlns="http://www.w3.org/2000/svg">
                                <path d="M13.106 7.222c0-2.967-2.249-5.032-5.482-5.032-3.35 0-5.646 2.318-5.646 5.702 0 3.493 2.235 5.708 5.762 5.708.862 0 1.689-.123 2.304-.335v-.862c-.43.199-1.354.328-2.29.328-2.926 0-4.813-1.88-4.813-4.798 0-2.844 1.921-4.881 4.594-4.881 2.735 0 4.608 1.688 4.608 4.156 0 1.682-.554 2.769-1.416 2.769-.492 0-.772-.28-.772-.76V5.206H8.923v.834h-.11c-.266-.595-.881-.964-1.6-.964-1.4 0-2.378 1.162-2.378 2.823 0 1.737.957 2.906 2.379 2.906.8 0 1.415-.39 1.709-1.087h.11c.081.67.703 1.148 1.503 1.148 1.572 0 2.57-1.415 2.57-3.643zm-7.177.704c0-1.197.54-1.907 1.456-1.907.93 0 1.524.738 1.524 1.907S8.308 9.84 7.371 9.84c-.895 0-1.442-.725-1.442-1.914z" />
                            </svg>
                            <input value={email}
                                onChange={(e) => { setEmail(e.target.value) }}
                                type="email" className="bg-transparent border-none outline-none w-full text-[#d3d3d3]" placeholder='Enter Your email'
                                required autoComplete="off" />
                        </div>
                        <div className="flex items-center justify-center gap-2 rounded-[25px] p-[0.6em] text-white bg-[#171717] shadow-[inset_2px_5px_10px_rgb(5,5,5)]">
                            <svg viewBox="0 0 16 16" fill="currentColor" className="h-[1.3em] w-[1.3em] fill-white" xmlns="http://www.w3.org/2000/svg">
                                <path d="M8 1a2 2 0 0 1 2 2v4H6V3a2 2 0 0 1 2-2zm3 6V3a3 3 0 0 0-6 0v4a2 2 0 0 0-2 2v5a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2z" />
                            </svg>
                            <input value={password}
                                onChange={(e) => { setPassword(e.target.value) }}
                                type="password" className="bg-transparent border-none outline-none w-full text-[#d3d3d3]" placeholder='Enter Your password'
                                required />
                        </div>
                        <div className="flex justify-center flex-row mt-10">
                            <button className="px-[1.1em] py-2 rounded-[5px] mr-2 border-none outline-none transition-all duration-[0.4s] bg-[#252525] text-white hover:bg-black">
                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Login&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                            </button>
                            <button type="button" onClick={() => navigate('/signup')} className="px-[2.3em] py-2 rounded-[5px] border-none outline-none transition-all duration-[0.4s] bg-[#252525] text-white hover:bg-black">
                                Sign Up
                            </button>
                        </div>
                        <button onClick={() => navigate('/forgot-password')} className="mb-12 py-2 rounded-[5px] border-none outline-none transition-all duration-[0.4s] bg-[#252525] text-white hover:bg-red-500">
                            Forgot Password
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default LoginForm;

