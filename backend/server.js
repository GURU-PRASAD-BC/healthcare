// Import required modules
import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import cors from 'cors';

// Create an Express application
const app = express();
app.use(cors());
const PORT = process.env.PORT || 5000;

// Connect to MongoDB using Mongoose
mongoose.connect("mongodb+srv://Jithin_K_007:jithin1204@healthassistant.fzuwvng.mongodb.net/?retryWrites=true&w=majority", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Create a Mongoose model for the appointment data
const Appointment = mongoose.model('Appointment', {
  patientName: String,
  patientNumber: String,
  patientGender: String,
  appointmentTime: Date,
  preferredMode: String,
});

// Middleware to parse JSON data
app.use(bodyParser.json());

// Route to handle form submissions
app.post('/submit-appointment', async (req, res) => {
  try {
    const {
      patientName,
      patientNumber,
      patientGender,
      appointmentTime,
      preferredMode,
    } = req.body;

    // Create a new appointment document
    const newAppointment = new Appointment({
      patientName,
      patientNumber,
      patientGender,
      appointmentTime: new Date(appointmentTime),
      preferredMode,
    });

    await newAppointment.save();

    res.json({ success: true, message: 'Appointment scheduled and saved successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Error occurred while saving the appointment' });
  }
});

// Start the Express server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
