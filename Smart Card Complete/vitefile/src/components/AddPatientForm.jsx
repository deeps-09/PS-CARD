import React, { useState } from 'react';
import { addPatient } from '../api/patientApi';
import { toast } from 'react-toastify';

const AddPatientForm = () => {
  const [form, setForm] = useState({ name: '', age: '', gender: '', diagnosis: '' });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addPatient(form);
      toast.success('Patient added successfully!');
      setForm({ name: '', age: '', gender: '', diagnosis: '' });
    } catch (err) {
      toast.error('Failed to add patient.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-4">
      <input className="w-full p-2 border" name="name" value={form.name} onChange={handleChange} placeholder="Name" required />
      <input className="w-full p-2 border" name="age" value={form.age} onChange={handleChange} placeholder="Age" required type="number" />
      <input className="w-full p-2 border" name="gender" value={form.gender} onChange={handleChange} placeholder="Gender" required />
      <input className="w-full p-2 border" name="diagnosis" value={form.diagnosis} onChange={handleChange} placeholder="Diagnosis" required />
      <button className="bg-blue-600 text-white px-4 py-2 rounded" type="submit">Add Patient</button>
    </form>
  );
};

export default AddPatientForm;