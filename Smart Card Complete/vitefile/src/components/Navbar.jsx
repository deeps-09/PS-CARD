import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import axios from '../api/axiosInstance';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Navbar = () => {
  const navigate = useNavigate();
  const { token, setToken, setUser } = useContext(AppContext);
  const [logoutLoading, setLogoutLoading] = useState(false);

  const handleLogout = async () => {
    try {
      setLogoutLoading(true);
      await axios.post('/api/user/logout', {}, { withCredentials: true });
      setToken(false);
      setUser(null);
      toast.success('Logged out successfully!');
      navigate('/');
    } catch (error) {
      console.error(error);
      toast.error('Logout failed.');
    } finally {
      setLogoutLoading(false);
    }
  };

  const handleMedicationsClick = () => {
    if (!token) {
      toast.warning('Please login to access Medications.');
      navigate('/login');
    } else {
      navigate('/history');
    }
  };

  return (
    <div className='flex items-center justify-between text-sm py-2 mb-5 border-b border-b-grey-400'>
        {/* <img className='w-44 cursor-pointer' src={assets.logo} alt='logo'/> */}
        <img onClick={()=>navigate('/')} className='w-35 h-16 rounded cursor-pointer' src='/images/logo.png' alt='logo'/>


      <div className='hidden md:flex items-centre gap-5 font-medium text-xl'>
        <p className='hero m-auto' style={{cursor: 'pointer'}}onClick={() => navigate('/')}>Home</p>
        <p className='hero m-auto' style={{cursor: 'pointer'}}onClick={() => navigate('/doctors')}>Doctors</p>
        <p className='hero m-auto' style={{cursor: 'pointer'}}onClick={handleMedicationsClick}>Medications</p>
        <p className='hero m-auto' style={{cursor: 'pointer'}}onClick={() => navigate('/about')}>About</p>
        <p className='hero m-auto' style={{cursor: 'pointer'}}onClick={() => navigate('/contact')}>Contact</p>

        {!token ?  (
          <div className="flex gap-4">
            <button
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded cursor-pointer"
              onClick={() => navigate('/login')}
            >
              Login
            </button>
            <button
              className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded cursor-pointer"
              onClick={() => navigate('/register')}
            >
              Create Account
            </button>
          </div>
        ) : (
          <div className="flex items-center gap-2 cursor-pointer group relative">
          
            <button className="hero m-auto cursor-pointer bg-white px-4 py-2">
              My Profile
            </button>
            <span className="text-xs">▼</span>
            <div className="absolute top-9 hidden group-hover:block bg-white shadow-md left-5 right-5 mt-2 rounded text-gray-700 min-w-[150px]">
              <p
                className="cursor-pointer p-3 hover:bg-gray-100 rounded"
                onClick={() => navigate('/myprofile')}
              >
                My Profile
              </p>
              <p
                className="cursor-pointer p-3 hover:bg-gray-100 rounded"
                onClick={() => navigate('/myappointment')}
              >
                My Appointments
              </p>
              <p
                className="cursor-pointer p-3 hover:bg-gray-100 rounded text-red-500"
                onClick={handleLogout}
              >
                {logoutLoading ? 'Logging out...' : 'Logout'}
              </p>
            </div>
          </div>
        ) }
      </div>
    </div>
  );
};

export default Navbar;