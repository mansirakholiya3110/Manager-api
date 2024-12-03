const mongoose = require('mongoose');

const managerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  salary: {
    type: String,
    required: true,
  },
  designation: {
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

const Manager = mongoose.model('Manager', managerSchema);

module.exports = Manager;
