const Manager = require('../models/manager.model');

// Create manager
exports.createManager = async (req, res) => {
  const { name, email, salary, designation } = req.body;

  const newManager = new Manager({ name, email, salary, designation });
  await newManager.save();
  res.status(201).json({ message: 'Manager created successfully' });
};

// Get all managers
exports.getManagers = async (req, res) => {
  const managers = await Manager.find();
  res.json(managers);
};

// Delete manager
exports.deleteManager = async (req, res) => {
  const { id } = req.params;
  await Manager.findByIdAndDelete(id);
  res.json({ message: 'Manager deleted successfully' });
};

// Update manager
exports.updateManager = async (req, res) => {
  const { id } = req.params;
  const { name, email, salary, designation, status } = req.body;

  const updatedManager = await Manager.findByIdAndUpdate(
    id,
    { name, email, salary, designation, status, updated_date: new Date().toISOString() },
    { new: true }
  );
  res.json(updatedManager);
};

// Search manager
exports.searchManager = async (req, res) => {
  const { query } = req.query;
  const managers = await Manager.find({
    $or: [
      { name: { $regex: query, $options: 'i' } },
      { email: { $regex: query, $options: 'i' } },
    ],
  });
  res.json(managers);
};
