const Admin = require('../models/admin.model');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

// Register admin
exports.registerAdmin = async (req, res) => {
  const { username, email, password, confirm_password } = req.body;

  if (password !== confirm_password) {
    return res.status(400).json({ message: "Passwords don't match" });
  }

  const existingAdmin = await Admin.findOne({ email });
  if (existingAdmin) {
    return res.status(400).json({ message: 'Admin with this email already exists' });
  }

  const newAdmin = new Admin({
    username,
    email,
    password,
    confirm_password,
  });

  await newAdmin.save();
  res.status(201).json({ message: 'Admin registered successfully' });
};

// Login admin
exports.loginAdmin = async (req, res) => {
  const { email, password } = req.body;

  const admin = await Admin.findOne({ email });
  if (!admin) {
    return res.status(400).json({ message: 'Admin not found' });
  }

  const isMatch = await bcrypt.compare(password, admin.password);
  if (!isMatch) {
    return res.status(400).json({ message: 'Invalid password' });
  }

  const token = jwt.sign({ id: admin._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
  res.json({ token });
};
