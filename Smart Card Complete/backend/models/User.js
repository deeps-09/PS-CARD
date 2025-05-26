import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: { type: String },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  phone: { type: String },
  address: {
    line1: { type: String },
    line2: { type: String }
  },
  gender: { type: String },
  dob: { type: String },
  image: { type: String }, // Base64 profile pic
  vitals: {
    bloodPressure: { type: String },
    bloodSugar: { type: String},
    heartRate: { type: String },
    allergies: { type: String }
  },
  medications: [
    {
      name: { type: String },
      dosage: { type: String },
      frequency: { type: String }
    }
  ],
  history: [
    {
      doctorName: { type: String },
      treatment: { type: String },
      date: { type: String },
      patientName: { type: String },
      doctorsVisited: [{ type: String }]
    }
  ],
  appointments: [
    {
      doctorName: { type: String },
      appointmentDate: { type: String },
      notes: { type: String }
    }
  ]
});

export default mongoose.model('User', userSchema);
