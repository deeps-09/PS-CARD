import React, { useState, useEffect, useContext } from "react";
import axios from "../api/axiosInstance";
import { AppContext } from "../context/AppContext";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const History = () => {
  const { user } = useContext(AppContext);

  const [historyData, setHistoryData] = useState([]);
  const [vitals, setVitals] = useState(null);
  const [editingVitals, setEditingVitals] = useState(false);
  const [medications, setMedications] = useState([]);
  const [newMedication, setNewMedication] = useState({
    name: "",
    dosage: "",
    frequency: "",
  });
  const [editingMedIndex, setEditingMedIndex] = useState(null);
  const [newVitals, setNewVitals] = useState({
    bloodPressure: "",
    bloodSugar: "",
    heartRate: "",
    allergies: "",
  });
  const [newHistoryEntry, setNewHistoryEntry] = useState({
    doctorName: "",
    treatment: "",
    date: "",
    doctorsVisited: "",
  });
  const [editingHistoryIndex, setEditingHistoryIndex] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showAddMedForm, setShowAddMedForm] = useState(false);
  const [showAddHistoryForm, setShowAddHistoryForm] = useState(false);


  useEffect(() => {
    const fetchAllData = async () => {
      try {
        const [historyRes, vitalsRes, medsRes] = await Promise.all([
          axios.get("/api/user/history", { withCredentials: true }),
          axios.get("/api/user/vitals", { withCredentials: true }),
          axios.get("/api/user/medications", { withCredentials: true }),
        ]);

        setHistoryData(historyRes.data || []);
        setVitals(vitalsRes.data || null);
        setNewVitals(
          vitalsRes.data || {
            bloodPressure: "",
            bloodSugar: "",
            heartRate: "",
            allergies: "",
          }
        );

        setMedications(medsRes.data || []);
      } catch (err) {
        console.error(err);
        toast.error("Failed to load health data.");
      } finally {
        setLoading(false);
      }
    };

    fetchAllData();
  }, [user]);

  // ------------------ VITALS ------------------
  const handleNewVitalsChange = (e) => {
    setNewVitals((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const saveVitals = async () => {
    if (
      !newVitals.bloodPressure ||
      !newVitals.bloodSugar ||
      !newVitals.heartRate ||
      !newVitals.allergies
    ) {
      toast.error("Please fill all vitals.");
      return;
    }
    try {
      const res = await axios.post("/api/user/vitals", newVitals, {
        withCredentials: true,
      });
      setVitals(res.data);
      setEditingVitals(false);
      toast.success("Vitals saved!");
    } catch (err) {
      console.error(err);
      toast.error("Failed to save vitals.");
    }
  };

  // ------------------ MEDICATIONS ------------------
  const handleNewMedicationChange = (e) => {
    setNewMedication((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const saveNewMedication = async () => {
    if (
      !newMedication.name ||
      !newMedication.dosage ||
      !newMedication.frequency
    ) {
      toast.error("Please fill all medication fields.");
      return;
    }
    try {
      const res = await axios.post("/api/user/medications", newMedication, {
        withCredentials: true,
      });
      setMedications((prev) => [...prev, res.data]);
      setNewMedication({ name: "", dosage: "", frequency: "" });
      setShowAddMedForm(false); // ✅ hide form after adding
      toast.success("Medication added!");
    } catch (err) {
      console.error(err);
      toast.error("Failed to add medication.");
    }
  };
  const handleEditMedicationChange = (e) => {
    const updated = { ...medications[editingMedIndex], [e.target.name]: e.target.value };
    const updatedMeds = [...medications];
    updatedMeds[editingMedIndex] = updated;
    setMedications(updatedMeds);
  };
  
  const saveEditedMedication = async () => {
    const med = medications[editingMedIndex];
    if (!med.name || !med.dosage || !med.frequency) {
      toast.error("Please fill all fields.");
      return;
    }
  
    try {
      const res = await axios.put(`/api/user/medications/${med._id}`, med, {
        withCredentials: true,
      });
  
      const updatedMeds = [...medications];
      updatedMeds[editingMedIndex] = res.data;
      setMedications(updatedMeds);
      toast.success("Medication updated!");
      setEditingMedIndex(null);
    } catch (err) {
      console.error(err);
      toast.error("Failed to update medication.");
    }
  };
  

  // ------------------ HISTORY ------------------
  const handleNewHistoryChange = (e) => {
    setNewHistoryEntry((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const saveNewHistory = async () => {
    if (
      !newHistoryEntry.doctorName ||
      !newHistoryEntry.treatment ||
      !newHistoryEntry.date
    ) {
      toast.error("Please fill all fields.");
      return;
    }
    try {
      const payload = {
        ...newHistoryEntry,
        patientName: user?.name || "Unknown",
        doctorsVisited: newHistoryEntry.doctorsVisited
          .split(",")
          .map((d) => d.trim()),
      };
      const res = await axios.post("/api/user/history", payload, {
        withCredentials: true,
      });
      setHistoryData((prev) => [...prev, res.data]);
      toast.success("History entry added!");
      setNewHistoryEntry({
        doctorName: "",
        treatment: "",
        date: "",
        doctorsVisited: "",
      });
      setShowAddHistoryForm(false);
    } catch (err) {
      console.error(err);
      toast.error("Failed to add history.");
    }
  };

  const startEditHistory = (index) => {
    const entry = historyData[index];
    setNewHistoryEntry({
      doctorName: entry.doctorName,
      treatment: entry.treatment,
      date: entry.date,
      doctorsVisited: entry.doctorsVisited?.join(", ") || "",
    });
    setEditingHistoryIndex(index);
  };

  const saveEditedHistory = async () => {
    try {
      const updated = {
        ...newHistoryEntry,
        patientName: user?.name || "Unknown",
        doctorsVisited: newHistoryEntry.doctorsVisited
          .split(",")
          .map((d) => d.trim()),
      };
      const updatedHistory = [...historyData];
      updatedHistory[editingHistoryIndex] = updated;
      setHistoryData(updatedHistory);
      toast.success("History updated!");
      setEditingHistoryIndex(null);
      setNewHistoryEntry({
        doctorName: "",
        treatment: "",
        date: "",
        doctorsVisited: "",
      });
    } catch (err) {
      console.error(err);
      toast.error("Failed to update history.");
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p>Loading Health Records...</p>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto p-6 mt-10 space-y-10">
      {/* Vitals */}
      <div className="p-6 bg-white rounded-xl shadow-lg">
        <h2 className="text-2xl font-bold mb-4">Vitals</h2>
        {!editingVitals && vitals ? (
          <>
            <p>
              <strong>Blood Pressure:</strong> {vitals.bloodPressure}
            </p>
            <p>
              <strong>Blood Sugar:</strong> {vitals.bloodSugar}
            </p>
            <p>
              <strong>Heart Rate:</strong> {vitals.heartRate}
            </p>
            <p>
              <strong>Allergies:</strong> {vitals.allergies}
            </p>
            <button
              onClick={() => setEditingVitals(true)}
              className="mt-4 bg-yellow-500 text-white px-4 py-2 rounded cursor-pointer"
            >
              Edit Vitals
            </button>
          </>
        ) : (
          <div className="flex flex-col gap-3">
            <input
              type="text"
              name="bloodPressure"
              placeholder="Blood Pressure"
              className="border p-2 rounded"
              value={newVitals.bloodPressure}
              onChange={handleNewVitalsChange}
            />
            <input
              type="text"
              name="bloodSugar"
              placeholder="Blood Sugar"
              className="border p-2 rounded"
              value={newVitals.bloodSugar}
              onChange={handleNewVitalsChange}
            />

            <input
              type="text"
              name="heartRate"
              placeholder="Heart Rate"
              className="border p-2 rounded"
              value={newVitals.heartRate}
              onChange={handleNewVitalsChange}
            />
            <input
              type="text"
              name="allergies"
              placeholder="Allergies"
              className="border p-2 rounded"
              value={newVitals.allergies}
              onChange={handleNewVitalsChange}
            />
            <button
              onClick={saveVitals}
              className="bg-blue-500 text-white py-2 rounded hover:scale-105 transition cursor-pointer"
            >
              Save Vitals
            </button>
          </div>
        )}
      </div>

      {/* Medications */}
      <div className="p-6 bg-white rounded-xl shadow-lg">
        <h2 className="text-2xl font-bold mb-4">Medications</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {medications.map((med, i) => (
  <div key={i} className="p-4 bg-gray-100 rounded shadow">
    {editingMedIndex === i ? (
      <>
        <input
          type="text"
          name="name"
          value={med.name}
          onChange={handleEditMedicationChange}
          className="border p-2 rounded w-full mb-2"
          placeholder="Name"
        />
        <input
          type="text"
          name="dosage"
          value={med.dosage}
          onChange={handleEditMedicationChange}
          className="border p-2 rounded w-full mb-2"
          placeholder="Dosage"
        />
        <input
          type="text"
          name="frequency"
          value={med.frequency}
          onChange={handleEditMedicationChange}
          className="border p-2 rounded w-full mb-2"
          placeholder="Frequency"
        />
        <div className="flex gap-3">
          <button
            onClick={saveEditedMedication}
            className="bg-blue-500 text-white px-3 py-1 rounded hover:scale-105 transition cursor-pointer"
          >
            Save
          </button>
          <button
            onClick={() => setEditingMedIndex(null)}
            className="bg-red-500 text-white px-3 py-1 rounded hover:scale-105 transition cursor-pointer"
          >
            Cancel
          </button>
        </div>
      </>
    ) : (
      <>
        <p><strong>Name:</strong> {med.name}</p>
        <p><strong>Dosage:</strong> {med.dosage}</p>
        <p><strong>Frequency:</strong> {med.frequency}</p>
        <button
          onClick={() => setEditingMedIndex(i)}
          className="mt-2 text-blue-600 underline cursor-pointer"
        >
          Edit
        </button>
      </>
    )}
  </div>
))}

        </div>

        {/* Toggle Add Medication Form */}
        {!showAddMedForm ? (
          <div className="mt-6">
            <button
              onClick={() => setShowAddMedForm(true)}
              className="bg-green-500 text-white py-2 px-4 rounded hover:scale-105 transition cursor-pointer"
            >
              Add Medication
            </button>
          </div>
        ) : (
          <div className="mt-6 flex flex-col gap-3">
            <input
              type="text"
              name="name"
              placeholder="Medication Name"
              className="border p-2 rounded"
              value={newMedication.name}
              onChange={handleNewMedicationChange}
            />
            <input
              type="text"
              name="dosage"
              placeholder="Dosage"
              className="border p-2 rounded"
              value={newMedication.dosage}
              onChange={handleNewMedicationChange}
            />
            <input
              type="text"
              name="frequency"
              placeholder="Frequency"
              className="border p-2 rounded"
              value={newMedication.frequency}
              onChange={handleNewMedicationChange}
            />
            <div className="flex gap-4">
              <button
                onClick={saveNewMedication}
                className="bg-blue-500 text-white py-2 px-4 rounded hover:scale-105 transition cursor-pointer"
              >
                Save Medication
              </button>
              <button
                onClick={() => setShowAddMedForm(false)}
                className="bg-red-500 text-white py-2 px-4 rounded hover:scale-105 transition cursor-pointer"
              >
                Cancel
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Medical History */}
      <div className="p-6 bg-white rounded-xl shadow-lg">
        <h2 className="text-2xl font-bold mb-4">Medical History</h2>

        {historyData.length === 0 ||
        editingHistoryIndex !== null ||
        showAddHistoryForm ? (
          <div className="flex flex-col gap-4">
            <input
              type="text"
              name="doctorName"
              placeholder="Doctor's Name"
              className="border p-2 rounded"
              value={newHistoryEntry.doctorName}
              onChange={handleNewHistoryChange}
            />
            <input
              type="text"
              name="treatment"
              placeholder="Treatment"
              className="border p-2 rounded"
              value={newHistoryEntry.treatment}
              onChange={handleNewHistoryChange}
            />
            <input
              type="date"
              name="date"
              className="border p-2 rounded"
              value={newHistoryEntry.date}
              onChange={handleNewHistoryChange}
            />
            <input
              type="text"
              name="doctorsVisited"
              placeholder="Doctors Visited (comma separated)"
              className="border p-2 rounded"
              value={newHistoryEntry.doctorsVisited}
              onChange={handleNewHistoryChange}
            />

            <div className="flex gap-4">
              <button
                onClick={
                  editingHistoryIndex !== null
                    ? saveEditedHistory
                    : saveNewHistory
                }
                className="bg-blue-500 text-white py-2 px-4 rounded hover:scale-105 transition cursor-pointer"
              >
                {editingHistoryIndex !== null ? "Save Changes" : "Save History"}
              </button>

              {/* Show cancel only when not editing */}
              {editingHistoryIndex === null && (
                <button
                  onClick={() => setShowAddHistoryForm(false)}
                  className="bg-red-500 text-white py-2 px-4 rounded hover:scale-105 transition cursor-pointer"
                >
                  Cancel
                </button>
              )}
            </div>
          </div>
        ) : (
          <>
            <div className="grid gap-6">
              {historyData.map((entry, idx) => (
                <div key={idx} className="p-4 bg-gray-50 rounded shadow">
                  <p>
                    <strong>Doctor:</strong> {entry.doctorName}
                  </p>
                  <p>
                    <strong>Treatment:</strong> {entry.treatment}
                  </p>
                  <p>
                    <strong>Date:</strong> {entry.date}
                  </p>
                  <p>
                    <strong>Patient:</strong> {entry.patientName}
                  </p>
                  {entry.doctorsVisited && (
                    <p className="text-sm text-gray-600">
                      <strong>Doctors Visited:</strong>{" "}
                      {entry.doctorsVisited.join(", ")}
                    </p>
                  )}
                  <button
                    onClick={() => startEditHistory(idx)}
                    className="mt-2 text-blue-600 underline cursor-pointer"
                  >
                    Edit
                  </button>
                </div>
              ))}
            </div>
            {/* Show Add Button only if not editing */}
            <div className="mt-6">
              <button
                onClick={() => setShowAddHistoryForm(true)}
                className="bg-green-500 text-white py-2 px-4 rounded hover:scale-105 transition cursor-pointer"
              >
                Add History Entry
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default History;
