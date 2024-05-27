import mongoose from "mongoose";

const clientSchema = new mongoose.Schema(
  {
    Name: {
      type: String,
      required: true,
    },
    Company: {
      type: String,
      enum: ["Company", "Private"], // Only allow "Company" or "Private"
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    Country: {
      type: String,
      required: true,
    },
    program: {
      type: String,
      required: true,
    },
    language: {
      type: String,
      required: true,
    },
    Phone: {
      type: String,
      required: true,
    },
    Age: {
      type: String,
      required: true,
    },
    notes: {
      type: String,
      required: true,
    },
    participants: Number, // No need for 'required', as it's not mandatory
    Price: {
      type: Number,
      required: true,
    },
    startingDate: {
      type: Date,
      required: true,
    },
    endDate: {
      type: Date,
      required: true,
    },
    ClientTID: {
      type: String,
      unique: true,
      required: true,
    },
    RIF: {
      type: String,
      unique: true,
      required: true,
    },
    Payment: {
      type: String,
      enum: ["Paid", "Unpaid"],
      required: true,
      default: "Unpaid",
    },
    Status: {
      type: String,
      enum: ["Pending", "Review", "Approved"],
      default: "Pending",
    },
    date: {
      type: Date,
      default: Date.now,
    },
    // Add any other fields you need
  },
  { timestamps: true }
);

const Client = mongoose.model("Client", clientSchema);

export default Client;
