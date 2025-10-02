// app.js

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Schema
const attendanceSchema = new mongoose.Schema({
  studentId: { type: String, required: true },
  studentName: { type: String, required: true },
  attendanceStatus: { type: String, required: true },
  date: { type: Date, default: Date.now },
});

// Model
const Attendance = mongoose.model('Attendance', attendanceSchema);

// Routes
app.post('/api/attendance/submit', async (req, res) => {
  try {
    const { studentId, studentName, attendanceStatus } = req.body;

    if (!studentId || !studentName || !attendanceStatus) {
      return res.status(400).json({ error: 'All fields are required.' });
    }

    const newAttendance = new Attendance({
      studentId,
      studentName,
      attendanceStatus,
    });

    await newAttendance.save();
    res.status(201).json({ message: 'Attendance submitted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error submitting attendance' });
  }
});

app.get('/api/attendance/records', async (req, res) => {
  try {
    const records = await Attendance.find().sort({ date: -1 });
    res.status(200).json(records);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error fetching records' });
  }
});

// MongoDB connection & start server
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('✅ Connected to MongoDB');
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
  })
  .catch((err) => {
    console.error('❌ MongoDB connection error:', err);
  });
