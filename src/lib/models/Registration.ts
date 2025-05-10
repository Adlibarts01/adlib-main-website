import mongoose, { Schema, Document } from 'mongoose';

// Define the interface for our Registration document
export interface IRegistration extends Document {
  eventId: number;
  eventTitle: string;
  name: string;
  email: string;
  phone?: string;
  experience: string;
  equipment?: string;
  comments?: string;
  registrationDate: Date;
}

// Define the schema
const RegistrationSchema: Schema = new Schema({
  eventId: { type: Number, required: true },
  eventTitle: { type: String, required: true },
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String },
  experience: { 
    type: String, 
    required: true,
    enum: ['Beginner', 'Intermediate', 'Advanced', 'Professional']
  },
  equipment: { type: String },
  comments: { type: String },
  registrationDate: { type: Date, default: Date.now }
});

// Create and export the model
// We need to check if the model exists first to prevent duplicate model errors in development
export default mongoose.models.Registration || mongoose.model<IRegistration>('Registration', RegistrationSchema);