import mongoose from 'mongoose';

const registrationSchema = new mongoose.Schema({
  eventId: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  usn: {
    type: String,
    required: true,
    uppercase: true
  },
  branch: {
    type: String,
    required: true
  },
  year: {
    type: String,
    required: true
  },
  phone: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  registrationDate: {
    type: Date,
    default: Date.now
  }
});

const Registration = mongoose.models.Registration || mongoose.model('Registration', registrationSchema);

export default Registration;