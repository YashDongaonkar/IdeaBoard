import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-hot-toast';

const LoginRegisterPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await axios.post('/auth/login', null, {
        auth: {
          username,
          password,
        },
      });

      const { token } = res.data;
      if (token) {
        localStorage.setItem('authToken', token);
        toast.success('Login successful!');
        navigate('/home');
      } else {
        toast.error('Login failed: No token received');
      }
    } catch (err) {
      console.error('Login error:', err);
      toast.error(err.response?.data?.message || 'Login failed');
    }
  };

  const handleRegister = async () => {
    try {
      const res = await axios.post('/auth/register', null, {
        auth: {
          username,
          password,
        },
      });

      const { token } = res.data;
      if (token) {
        localStorage.setItem('authToken', token);
        toast.success('Registration successful!');
        navigate('/home');
      } else {
        toast.error('Registration failed: No token received');
      }
    } catch (err) {
      console.error('Register error:', err);
      toast.error(err.response?.data?.message || 'Registration failed');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-100 to-purple-200 px-4">
      <div className="bg-white p-8 rounded-2xl shadow-lg max-w-md w-full space-y-6">
        <h2 className="text-2xl font-bold text-center text-gray-800">Welcome Back</h2>

        <div className="space-y-4">
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-400"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-400"
          />
        </div>

        <div className="flex justify-between space-x-4">
          <button
            onClick={handleLogin}
            className="w-full bg-indigo-500 hover:bg-indigo-600 text-white font-semibold py-2 rounded-xl transition-all duration-200"
          >
            Login
          </button>
          <button
            onClick={handleRegister}
            className="w-full bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-2 rounded-xl transition-all duration-200"
          >
            Register
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginRegisterPage;