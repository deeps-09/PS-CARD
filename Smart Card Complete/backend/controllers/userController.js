import User from '../models/User.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

// Register new user
export const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const userExists = await User.findOne({ email });
    if (userExists) return res.status(400).json({ message: 'User already exists' });

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, { expiresIn: '30d' });

    res.cookie('token', token, { httpOnly: true, secure: false, sameSite: 'lax' }).status(201).json({ message: 'User Registered', user: newUser });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Login user
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: 'Invalid credentials' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '30d' });

    res.cookie('token', token, { httpOnly: true, secure: false }).status(200).json({ message: 'Login successful',token, user });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Logout user
export const logoutUser = (req, res) => {
  res.clearCookie('token').status(200).json({ message: 'Logged out successfully' });
};

// Get user profile
// controllers/userController.js

export const getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.userId).select('-password');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json({ user }); // ✅ important: wrap in { user }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};




// Update user profile
export const updateProfile = async (req, res) => {
  try {
    const { name, email, phone, address, gender, dob, image } = req.body;
    const updatedUser = await User.findByIdAndUpdate(req.userId, {
      name,
      email,
      phone,
      address,
      gender,
      dob,
      image,
    }, { new: true });

    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
