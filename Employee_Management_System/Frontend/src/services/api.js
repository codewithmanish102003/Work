import axios from 'axios';
import { toast } from 'react-toastify';

const API_URL = 'http://localhost:3000/api'; // Adjust the URL as needed

// Register user
export const registerUser = async (userData) => {
  try {
    const response = await axios.post(`${API_URL}/auth/register`, userData);
    toast.success('User registered successfully!');
    return response.data;
  } catch (error) {
    console.error('Error registering user:', error);
    toast.error(error.response?.data?.error || 'Error registering user');
    throw error;
  }
};

// Login user
export const loginUser = async (userData) => {
  try {
    const response = await axios.post(`${API_URL}/auth/login`, userData);
    toast.success('Login successful!');
    return response.data;
  } catch (error) {
    console.error('Error logging in user:', error);
    toast.error(error.response?.data?.error || 'Error logging in user');
    throw error;
  }
};

// Logout user
export const logoutUser = async () => {
  try {
    const response = await axios.post(`${API_URL}/auth/logout`);
    toast.success('Logout successful!');
    return response.data;
  } catch (error) {
    console.error('Error logging out user:', error);
    toast.error(error.response?.data?.error || 'Error logging out user');
    throw error;
  }
};

// Handle login
export const handleLogin = async (email, password) => {
  try {
    const response = await loginUser({ email, password });
    const { token, role } = response;
    localStorage.setItem('token', token);
    localStorage.setItem('role', role);
    return { token, role };
  } catch (error) {
    console.error('Error handling login:', error);
    toast.error(error.response?.data?.error || 'Error handling login');
    throw error;
  }
};

// Fetch users data
export const fetchUserData = async () => {
  try {
    const response = await axios.get(`${API_URL}/users`);
    return response.data;
  } catch (error) {
    console.error('Error fetching user data:', error);
    toast.error(error.response?.data?.error || 'Error fetching user data');
    throw error;
  }
};

// Fetch logged-in user data
export const fetchLogUserData = async (token) => {
  try {
    const response = await axios.get(`${API_URL}/userdata`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching logged-in user data:', error);
    toast.error(error.response?.data?.error || 'Error fetching user data');
    throw error;
  }
};

// Forgot password
export const forgotPassword = async (userData) => {
  try {
    const response = await axios.post(`${API_URL}/auth/forgot-password`, userData);
    toast.success('OTP sent successfully!');
    return response.data;
  } catch (error) {
    console.error('Error sending reset email:', error);
    toast.error(error.response?.data?.error || 'Error sending reset email');
    throw error;
  }
};

// Reset password
export const resetPassword = async (token, userData) => {
  try {
    const response = await axios.post(`${API_URL}/auth/reset-password/${token}`, userData);
    toast.success('Password reset successfully!');
    return response.data;
  } catch (error) {
    console.error('Error resetting password:', error);
    toast.error(error.response?.data?.error || 'Error resetting password');
    throw error;
  }
};

// Verify OTP
export const verifyOtp = async (userData) => {
  try {
    const response = await axios.post(`${API_URL}/auth/verify-otp`, userData);
    toast.success('OTP verified successfully!');
    return response.data;
  } catch (error) {
    console.error('Error verifying OTP:', error);
    toast.error(error.response?.data?.error || 'Error verifying OTP');
    throw error;
  }
};