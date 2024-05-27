import mongoose from "mongoose";

const accountSchema = new mongoose.Schema(
  {
    Title: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    recipient: {
      type: String,
      enum: ["Company", "Private"], 
      required: true,
    },
    paymentType: {
      type: String,
      enum: ["Receive", "Send"], 
      required: true,
    },
    invoiceID: {
      type: String,
      required: true,
      unique: true,
    },
    Payment: {
      type: String,
      enum: ["Paid", "Unpaid"],
      required: true,
      default: "Unpaid",
    },
    remainingCost: {
      type: String,
      enum: ["Paid", "Unpaid", "None"],
      required: true,
      default: "None",
    },
    expiryDate: {
      type: Date,
      required: true,
    },
    actionText: {
      type: String,
      required: true,
    },
    paymentAmount: {
      type: String,
      required: true,
    },
    notes: {
      type: String,
      required: true,
    },
    referenceID: {
      type: String,
      unique: true,
      required: true,
    },
    Status: {
      type: String,
      enum: ["Approved", "Review", "Pending"],
      default: "Pending",
    },
    renew: {
      type: String,
      enum: ["Yes", "No"],
      default: "No",
    },
    date: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

const Account = mongoose.model("Account", accountSchema);

export default Account;
