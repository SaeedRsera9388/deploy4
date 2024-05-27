import mongoose from "mongoose";

const ticketSchema = new mongoose.Schema(
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
    customerID: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
    },
    Program: {
      type: String,
      required: true,
    },
    plan: {
      type: String,
      required: true,
    },
   
    level: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    desc: {
      type: String,
      required: true,
    },
    trackingID: {
      type: String,
      unique: true,
      required: true,
    },
    Status: {
      type: String,
      enum: ["Approved", "Review", "Pending"],
      default: "Pending",
    },
    date: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

const Ticket = mongoose.model("Ticket", ticketSchema);

export default Ticket;
