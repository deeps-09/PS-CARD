import User from '../models/User.js';

// Save Vitals
export const saveVitals = async (req, res) => {
  try {
    const { bloodPressure,bloodSugar, heartRate, allergies } = req.body;

    const user = await User.findById(req.userId);
    user.vitals = { bloodPressure,bloodSugar, heartRate, allergies };
    await user.save();

    res.status(200).json(user.vitals);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get Vitals
export const getVitals = async (req, res) => {
  try {
    const user = await User.findById(req.userId);
    res.status(200).json(user.vitals);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Add Medication
export const addMedication = async (req, res) => {
  try {
    const { name, dosage, frequency } = req.body;

    const user = await User.findById(req.userId);
    user.medications.push({ name, dosage, frequency });
    await user.save();

    res.status(200).json(user.medications);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get Medications
export const getMedications = async (req, res) => {
  try {
    const user = await User.findById(req.userId);
    res.status(200).json(user.medications);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateMedication = async (req, res) => {
  try {
    const user = await User.findById(req.userId);
    const medId = req.params.id;

    const medication = user.medications.id(medId);
    if (!medication) {
      return res.status(404).json({ message: 'Medication not found' });
    }

    medication.set(req.body);
    await user.save();

    res.status(200).json(medication);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};



// Add Medical History
export const addHistory = async (req, res) => {
  try {
    const { doctorName, treatment, date, patientName, doctorsVisited } = req.body;

    const user = await User.findById(req.userId);
    user.history.push({ doctorName, treatment, date, patientName, doctorsVisited });
    await user.save();

    res.status(200).json(user.history);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get Medical History
export const getHistory = async (req, res) => {
  try {
    const user = await User.findById(req.userId);
    res.status(200).json(user.history);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
