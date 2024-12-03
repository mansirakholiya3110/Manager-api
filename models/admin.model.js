const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const adminSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: function (v) {
        return /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/.test(v); // Email validation regex
      },
      message: 'Invalid email format',
    },
  },
  password: {
    type: String,
    required: true,
  },
  confirm_password: {
    type: String,
    required: true,
  },
  status: {
    type: Boolean,
    default: true,
  },
  created_date: {
    type: String,
    default: new Date().toISOString(),
  },
  updated_date: {
    type: String,
    default: new Date().toISOString(),
  },
});

adminSchema.pre('save', async function (next) {
  if (this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, 10);
  }
  next();
});

const Admin = mongoose.model('Admin', adminSchema);

module.exports = Admin;
