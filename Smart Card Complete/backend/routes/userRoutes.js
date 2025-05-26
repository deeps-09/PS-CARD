import express from 'express';
import {
  registerUser,
  loginUser,
  logoutUser,
  getProfile,
  updateProfile,
} from '../controllers/userController.js';
import {
  saveVitals,
  getVitals,
  addMedication,
  getMedications,
  updateMedication,
  addHistory,
  getHistory,
} from '../controllers/medicalController.js';
import { protect } from '../middleware/authMiddleware.js';


const router = express.Router();

// Auth
router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/logout', logoutUser);

// Profile
router.get('/profile', protect, getProfile);
router.put('/profile', protect, updateProfile);

// Vitals
router.post('/vitals', protect, saveVitals);
router.get('/vitals', protect, getVitals);

// Medications
router.post('/medications', protect, addMedication);
router.get('/medications', protect, getMedications);
router.put('/medications/:id', protect, updateMedication);

// Medical History
router.post('/history', protect, addHistory);
router.get('/history', protect, getHistory);

export default router;
