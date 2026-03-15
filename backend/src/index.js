require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const helmet = require('helmet');
const connectDB = require('./config/db');
const authRoutes = require('./routes/auth');
const lessonRoutes = require('./routes/lessons');
const quizRoutes = require('./routes/quizzes');
const resultRoutes = require('./routes/results');
const rewardRoutes = require('./routes/rewards');
const leaderboardRoutes = require('./routes/leaderboard');
const adminRoutes = require('./routes/admin');

const app = express();
const PORT = process.env.PORT || 5000;

connectDB();

app.use(helmet());
app.use(cors());
app.use(express.json({ limit: '10mb' }));
app.use(morgan('tiny'));

app.get('/', (req, res) => {
  res.json({ message: 'Eco Education API is running' });
});

app.use('/api/auth', authRoutes);
app.use('/api/lessons', lessonRoutes);
app.use('/api/quizzes', quizRoutes);
app.use('/api/results', resultRoutes);
app.use('/api/rewards', rewardRoutes);
app.use('/api/leaderboard', leaderboardRoutes);
app.use('/api/admin', adminRoutes);

app.use((err, req, res, next) => {
  console.error(err);
  res.status(err.status || 500).json({ message: err.message || 'Internal Server Error' });
});

app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
