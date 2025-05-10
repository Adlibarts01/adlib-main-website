import mongoose, { Schema } from "mongoose";

const ContactSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      trim: true,
    },
    subject: {
      type: String,
      required: [true, "Subject is required"],
      trim: true,
    },
    message: {
      type: String,
      required: [true, "Message is required"],
    },
    inquiryType: {
      type: String,
      enum: ["general", "membership", "event", "other"],
      default: "general",
    },
    subscribe: {
      type: Boolean,
      default: false,
    },
    status: {
      type: String,
      enum: ["new", "read", "responded"],
      default: "new",
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.Contact || mongoose.model("Contact", ContactSchema);