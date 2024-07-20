import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // New loading state

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const token = localStorage.getItem('token');
        if (token) {
          const response = await axios.get('https://capstone-project-be-f7p8.onrender.com/api/auth/user/details', {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          setUser(response.data);
        }
      } catch (error) {
        console.error('Error fetching user details:', error);
      } finally {
        setLoading(false); // Set loading to false after fetching user details
      }
    };

    fetchUserDetails();
  }, []);

  const login = async (credentials) => {
    try {
      const response = await axios.post('https://capstone-project-be-f7p8.onrender.com/api/auth/login', credentials);
      localStorage.setItem('token', response.data.token);
      const userResponse = await axios.get('https://capstone-project-be-f7p8.onrender.com/api/auth/user/details', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      setUser(userResponse.data);
      setLoading(false); // Set loading to false after login
    } catch (error) {
      console.log('Login Failed', error);
      alert('Invalid Credentials');
    }
  };

  const register = async (userData) => {
    try {
      const response = await axios.post('https://capstone-project-be-f7p8.onrender.com/api/auth/register', userData);
      return response.data.message;
    } catch (error) {
      throw error.response.data.message;
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
  };

  const forgotPassword = async (email) => {
    try {
      const response = await axios.post('https://capstone-project-be-f7p8.onrender.com/api/auth/forgot-password', { email });
      return response.data.message;
    } catch (error) {
      throw error.response.data.message;
    }
  };

  const resetPassword = async (token, password) => {
    try {
      const response = await axios.post(`https://capstone-project-be-f7p8.onrender.com/api/auth/reset-password/${token}`, { password });
      return response.data.message;
    } catch (error) {
      throw error.response.data.message;
    }
  };

  return (
    <>
      <AuthContext.Provider value={{ user, login, register, logout, forgotPassword, resetPassword, loading }}>
      {!loading && children} {/* Render children only after loading is false */}
      </AuthContext.Provider>
    </>

  );
};
