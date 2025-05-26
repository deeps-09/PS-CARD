import mongoose from 'mongoose';

const historySchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  doctorName: { type: String },
  treatment: { type: String },
  date: { type: String },
  patientName: { type: String },
  doctorsVisited: [{ type: String }]
});

export default mongoose.model('History', historySchema);
