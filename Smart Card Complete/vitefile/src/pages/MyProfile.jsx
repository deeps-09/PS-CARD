import React, { useContext, useEffect, useState } from 'react';
import axios from '../api/axiosInstance';
import { assets } from '../assets/assets';
import { toast } from 'react-toastify'; 
import 'react-toastify/dist/ReactToastify.css';
import { AppContext } from '../context/AppContext';

const MyProfile = () => {
  const [userData, setUserData] = useState(null);
  const [isEdit, setIsEdit] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axios.get('/api/user/profile', { withCredentials: true });
        setUserData({
          ...res.data.user,
          image: res.data.user?.image || assets.profile_pic, // fallback image
        });
      } catch (err) {
        console.error(err);
        toast.error('Failed to load profile. Please fill it manually.');
        // Initialize empty form if fetch fails
        setUserData({
          name: '',
          email: '',
          phone: '',
          address: { line1: '', line2: '' },
          gender: '',
          dob: '',
          image: assets.profile_pic,
        });
        setIsEdit(true); // Allow editing immediately
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const handleSave = async () => {
    try {
      await axios.put('/api/user/profile', {
        name: userData.name,
        email: userData.email,
        phone: userData.phone,
        address: userData.address,
        gender: userData.gender,
        dob: userData.dob,
        image: userData.image  
      }, { withCredentials: true });
  
      setIsEdit(false);
    toast.success('Profile updated successfully!');
  } catch (err) {
    console.error(err);
    toast.error('Failed to update profile.');
  }
};

const handleImageChange = (e) => {
  const file = e.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onloadend = () => {
      setUserData(prev => ({ ...prev, image: reader.result }));
      toast.success('Profile photo updated!');
    };
    reader.readAsDataURL(file);
  }
};

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-xl font-medium">Loading Profile...</p>
      </div>
    );
  }

  if (!userData) return null;

  return (
    <div className="max-w-lg flex flex-col gap-2 text-sm mx-auto mt-10">
      <img className="w-36 rounded" src={userData.image} alt="Profile" />

{isEdit && (
  <>
    <button
      className="text-white max-w-30 rounded-full font-medium bg-green-500 hover:scale-105 transition-all cursor-pointer"
      onClick={() => document.getElementById('profilePicInput').click()}
    >
      Change Photo
    </button>
    <input
      type="file"
      id="profilePicInput"
      accept="image/*"
      onChange={handleImageChange}
      className="hidden"
    />
  </>
)}


      {isEdit ? (
        <input
          className="bg-gray-50 text-3xl font-medium max-w-60 mt-4"
          type="text"
          placeholder="Enter your name"
          value={userData.name}
          onChange={(e) => setUserData(prev => ({ ...prev, name: e.target.value }))}
        />
      ) : (
        <p className="font-medium text-3xl text-neutral-800 mt-4">{userData.name}</p>
      )}

      <hr className="bg-zinc-400 h-[1px]" />

      {/* Contact Information */}
      <div>
        <p className="text-neutral-500 underline mt-3">CONTACT INFORMATION</p>
        <div className="grid grid-cols-[1fr_3fr] gap-y-2.5 mt-3 text-neutral-700">
          <p className="font-medium">Email id:</p>
          {isEdit ? (
            <input
              className="bg-gray-50 max-w-60"
              type="email"
              placeholder="Enter your email"
              value={userData.email}
              onChange={(e) => setUserData(prev => ({ ...prev, email: e.target.value }))}
            />
          ) : (
            <p className="text-blue-500">{userData.email}</p>
          )}

          <p className="font-medium">Phone:</p>
          {isEdit ? (
            <input
              className="bg-gray-100 max-w-52"
              type="text"
              placeholder="Enter your phone"
              value={userData.phone}
              onChange={(e) => setUserData(prev => ({ ...prev, phone: e.target.value }))}
            />
          ) : (
            <p className="text-blue-400">{userData.phone}</p>
          )}

          <p className="font-medium">Address:</p>
          {isEdit ? (
            <div className="flex flex-col gap-2">
              <input
                className="bg-gray-50"
                placeholder="Address Line 1"
                type="text"
                value={userData.address?.line1 || ''}
                onChange={(e) => setUserData(prev => ({
                  ...prev,
                  address: { ...prev.address, line1: e.target.value }
                }))}
              />
              <input
                className="bg-gray-50"
                placeholder="Address Line 2"
                type="text"
                value={userData.address?.line2 || ''}
                onChange={(e) => setUserData(prev => ({
                  ...prev,
                  address: { ...prev.address, line2: e.target.value }
                }))}
              />
            </div>
          ) : (
            <p className="text-blue-400">
              {userData.address?.line1}<br />{userData.address?.line2}
            </p>
          )}
        </div>
      </div>

      {/* Basic Information */}
      <div>
        <p className="text-neutral-500 underline mt-3">BASIC INFORMATION</p>
        <div className="grid grid-cols-[1fr_3fr] gap-y-2.5 mt-3 text-neutral-700">
          <p className="font-medium">Gender:</p>
          {isEdit ? (
            <select
              className="max-w-20 bg-gray-100"
              value={userData.gender}
              onChange={(e) => setUserData(prev => ({ ...prev, gender: e.target.value }))}
            >
              <option value="">Select</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          ) : (
            <p className="text-gray-400">{userData.gender}</p>
          )}

          <p className="font-medium">Birthday:</p>
          {isEdit ? (
            <input
              className="max-w-28 bg-gray-100"
              type="date"
              value={userData.dob}
              onChange={(e) => setUserData(prev => ({ ...prev, dob: e.target.value }))}
            />
          ) : (
            <p className="text-gray-400">{userData.dob}</p>
          )}
        </div>
      </div>

      {/* Save/Edit Button */}
      <div>
        {isEdit ? (
          <button
            className="text-white px-12 py-3 mt-10 rounded-full font-medium bg-green-500 hover:scale-105 transition-all cursor-pointer"
            onClick={handleSave}
          >
            Save Information
          </button>
        ) : (
          <button
            className="text-white px-12 py-3 mt-10 rounded-full font-medium bg-blue-500 hover:scale-105 transition-all cursor-pointer"
            onClick={() => setIsEdit(true)}
          >
            Edit
          </button>
        )}
      </div>
    </div>
  );
};

export default MyProfile;