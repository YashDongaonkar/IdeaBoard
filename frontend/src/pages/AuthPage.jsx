import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';

import api from '../lib/axios.js';
import { getAuthHeader } from "../lib/utils.js"

const AuthPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {

      localStorage.setItem('authUser', JSON.stringify({ username, password }));

      const res = await api.post('/auth/login', null, {
        headers: { Authorization: getAuthHeader() }
      });

      toast.success('Login successful!');
      navigate('/home');
    } catch (err) {
      console.error('Login error:', err);
      toast.error(err.response?.data?.message || 'Login failed');
    }
  };


  const handleRegister = async () => {
    try {
      await api.post('/auth/register', {
        username,
        password
      });

      toast.success('Registration successful!');
      handleLogin();
    } catch (err) {
      console.error('Register error:', err);
      toast.error(err.response?.data?.message || 'Registration failed');
    }
  };


  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-100 to-purple-200 px-4">
      <div className="bg-white p-8 rounded-2xl shadow-lg max-w-md w-full space-y-6">
        <h2 className="text-2xl font-bold text-center text-gray-800">Welcome</h2>

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

export default AuthPage;