import express from 'express';
import { getDoctors } from '../controllers/doctorController.js';

const router = express.Router();

// Public Route
router.get('/', getDoctors);

export default router;
