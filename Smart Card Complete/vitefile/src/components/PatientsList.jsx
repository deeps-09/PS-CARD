import React, { useEffect, useState } from 'react';
import { getAllPatients } from '../api/patientApi';
import { toast } from 'react-toastify';

const PatientsList = () => {
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getAllPatients()
      .then(data => {
        setPatients(data);
        setLoading(false);
      })
      .catch(err => {
        toast.error('Failed to fetch patients');
        setLoading(false);
      });
  }, []);

  if (loading) return <p className="text-center">Loading patients...</p>;

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Patient Records</h2>
      <ul className="space-y-2">
        {patients.map((p) => (
          <li key={p._id} className="p-2 border rounded shadow-sm">
            <strong>{p.name}</strong> - {p.age} years - {p.gender} - {p.diagnosis}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PatientsList;