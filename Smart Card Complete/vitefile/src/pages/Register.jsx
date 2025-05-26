import React, { useState, useContext } from 'react';
import axios from '../api/axiosInstance';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { AppContext } from '../context/AppContext';

const Register = ({ switchToLogin }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  // ✅ Use AppContext
  const { setToken, setUser } = useContext(AppContext);

  const onRegister = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('/api/user/register', { name, email, password }, { withCredentials: true });

      setToken(true);
      setUser(res.data.user); 

      toast.success('Registration Successful');
      navigate('/myprofile');
    } catch (err) {
      toast.error('Registration failed!');
    }
  };

  return (
    <form onSubmit={onRegister} className='min-h-[80vh] flex items-center'>
      <div className='flex flex-col gap-3 m-auto items-start p-8 min-w-[340px] sm:min-w-96 border-1px rounded-xl text-zinc-600 text-sm shadow'>
        <p className='text-2xl font-semibold'>Create Account</p>
        <p>Please sign up to book appointment</p>

        <div className='w-full'>
          <p>Full Name</p>
          <input type="text" className='border border-zinc-300 rounded w-full p-2 m-1' required
            value={name} onChange={(e) => setName(e.target.value)} />
        </div>

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
          Create Account
        </button>
        <p>Already have an account? <span onClick={switchToLogin} className='text-blue-500 underline cursor-pointer'>Login here</span></p>
      </div>
    </form>
  );
};

export default Register;
