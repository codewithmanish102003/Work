import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { AuthContext } from '../../Context/AuthProvider';
import { loginUser } from '../../services/api';

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
        <div className="flex items-center justify-center min-h-screen bg-slate-900">
            <div className="border-2 rounded-[10px] p-[5px] bg-white m-5">
                <div className='flex-col justify-center items-center'>
                    <h1 className='mr-5 ml-5 mt-5 font-semibold text-2xl text-center'>Employee Management System</h1>
                    <p className='mt-5 mb-5 text-center'>Sign In to Your Account</p>
                    </div>

                <div>
                    <form onSubmit={submitHandler} className="flex flex-col gap-[10px] px-8 pb-[0.4em]">
                        <label >Email</label>
                        <div className="flex items-center justify-center gap-2 border-2  p-[0.6em] text-white ">
                            <svg viewBox="0 0 16 16" fill="currentColor" className="h-[1.3em] w-[1.3em] fill-black" xmlns="http://www.w3.org/2000/svg">
                                <path d="M13.106 7.222c0-2.967-2.249-5.032-5.482-5.032-3.35 0-5.646 2.318-5.646 5.702 0 3.493 2.235 5.708 5.762 5.708.862 0 1.689-.123 2.304-.335v-.862c-.43.199-1.354.328-2.29.328-2.926 0-4.813-1.88-4.813-4.798 0-2.844 1.921-4.881 4.594-4.881 2.735 0 4.608 1.688 4.608 4.156 0 1.682-.554 2.769-1.416 2.769-.492 0-.772-.28-.772-.76V5.206H8.923v.834h-.11c-.266-.595-.881-.964-1.6-.964-1.4 0-2.378 1.162-2.378 2.823 0 1.737.957 2.906 2.379 2.906.8 0 1.415-.39 1.709-1.087h.11c.081.67.703 1.148 1.503 1.148 1.572 0 2.57-1.415 2.57-3.643zm-7.177.704c0-1.197.54-1.907 1.456-1.907.93 0 1.524.738 1.524 1.907S8.308 9.84 7.371 9.84c-.895 0-1.442-.725-1.442-1.914z" />
                            </svg>
                            <input value={email}
                                onChange={(e) => { setEmail(e.target.value) }}
                                type="email" className=" border-none outline-none w-full text-black" placeholder='Enter Your email'
                                required autoComplete="off" />
                        </div>
                        <label >Password</label>
                        <div className="flex items-center justify-center gap-2 border-2  p-[0.6em] text-white">
                            <svg viewBox="0 0 16 16" fill="currentColor" className="h-[1.3em] w-[1.3em] fill-black" xmlns="http://www.w3.org/2000/svg">
                                <path d="M8 1a2 2 0 0 1 2 2v4H6V3a2 2 0 0 1 2-2zm3 6V3a3 3 0 0 0-6 0v4a2 2 0 0 0-2 2v5a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2z" />
                            </svg>
                            <input value={password}
                                onChange={(e) => { setPassword(e.target.value) }}
                                type="password" className=" border-none outline-none w-full text-black" placeholder='Enter Your password'
                                required />
                        </div>

                     
                        <div className="flex justify-center flex-row mt-10">
                            <button className="px-[1.1em] py-2 w-full rounded-[5px] mr-2 border-none outline-none bg-blue-900 text-white">
                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Login&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                            </button>
                        </div>
                        <div className='flex flex-col gap-2 mt-5 mb-2 text-center text-xs text-gray-500'>
                            <p>Don't have an account?? Please contact your administrator.</p>
                            <button 
                                onClick={() => navigate('/forgot-password')} 
                                className="text-blue-900 hover:underline"
                            >
                                Forgot Password?
                            </button>
                        </div>
                      
                    </form>
                    
                </div>
            </div>
        </div>
    );
}

export default LoginForm;

