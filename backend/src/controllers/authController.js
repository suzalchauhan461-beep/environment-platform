const bcrypt = require('bcryptjs');
const User = require('../models/User');
const generateToken = require('../utils/token');

const register = async (req, res) => {
  const { name, email, password } = req.body;
  const existing = await User.findOne({ email });
  if (existing) {
    return res.status(400).json({ message: 'Email already registered' });
  }
  const hashed = await bcrypt.hash(password, 10);
  const user = await User.create({ name, email, password: hashed });
  return res.status(201).json({
    token: generateToken(user),
    user: { id: user._id, name: user.name, email: user.email, level: user.level },
  });
};

const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    return res.status(400).json({ message: 'Invalid credentials' });
  }
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res.status(400).json({ message: 'Invalid credentials' });
  }
  res.json({
    token: generateToken(user),
    user: { id: user._id, name: user.name, email: user.email, level: user.level },
  });
};

module.exports = { register, login };
