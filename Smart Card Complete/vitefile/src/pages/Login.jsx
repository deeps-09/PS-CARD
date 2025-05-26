import React, { useState, useContext } from 'react';
import axios from 'axios';
import api from "../api/axiosInstance";
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext';

const Login = ({ switchToRegister }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigate=useNavigate();
  const { setToken, setUser } = useContext(AppContext);

  const onLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post('/api/user/login', { email, password });
      setUser(res.data.user);     
      setToken(true);
      toast.success('Logged in successfully!');
      navigate('/myprofile');
    } catch (err) {
      toast.error('Login failed!');
    }
  };

  return (
    <form onSubmit={onLogin} className='min-h-[80vh] flex items-center'>
      <div className='flex flex-col gap-3 m-auto items-start p-8 min-w-[340px] sm:min-w-96 border-1px rounded-xl text-zinc-600 text-sm shadow'>
        <p className='text-2xl font-semibold'>Login</p>
        <p>Please login to book appointment</p>

        <div className='w-full'>
          <p>Email</p>
          <input type="email" className='border border-zinc-300 rounded w-full p-2 m-1' required
            value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>

        <div className='w-full'>
          <p>Password</p>
          <input type="password" className='border border-zinc-300 rounded w-full p-2 m-1' required
            value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>

        <button type="submit" className='text-white w-full py-3 mx-1 text-base rounded font-light bg-blue-500 hover:scale-105 transition-all cursor-pointer'>
          Login
        </button>
        <p>Don't have an account? <span onClick={switchToRegister} className='text-blue-500 underline cursor-pointer'>Sign up here</span></p>
      </div>
    </form>
  );
};

export default Login;
