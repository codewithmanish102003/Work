import React, { createContext, useState, useEffect } from 'react';
import { fetchLogUserData } from '../services/api';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(localStorage.getItem('user') || null);
  const [role, setRole] = useState(localStorage.getItem('role') || null);
  const [userData, setUserData] = useState(null);

  const login =async (token, userRole) => {
    setUser(token);
    setRole(userRole);
    localStorage.setItem('user', token);
    localStorage.setItem('role', userRole);
    await fetchUserData(token);
  };

  const logout = () => {
    setUser(null);
    setRole(null);
    setUserData(null);
    localStorage.removeItem('user');
    localStorage.removeItem('role');
  };

  useEffect(() => {
    const fetchData = async () => {
      if (user) {
        try {
          const userData = await fetchLogUserData(user);
          setUserData(userData);
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      }
    };

    fetchData();
  }, [user]);

  return (
    <AuthContext.Provider value={{ user, role, login, logout, userData ,setUserData}}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;