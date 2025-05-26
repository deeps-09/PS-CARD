import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export const getAllPatients = async () => {
  const res = await axios.get(`${API_BASE_URL}/patients`);
  return res.data;
};

export const addPatient = async (patientData) => {
  const res = await axios.post(`${API_BASE_URL}/patients`, patientData);
  return res.data;
};