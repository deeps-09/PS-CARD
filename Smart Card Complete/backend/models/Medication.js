import mongoose from 'mongoose';

const medicationSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  name: { type: String, required: true },
  dosage: { type: String, required: true },
  frequency: { type: String, required: true }
});

export default mongoose.model('Medication', medicationSchema);
