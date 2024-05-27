import mongoose from "mongoose";

const inquirySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    program: {
      type: String,
      required: true,
    },
    subject: {
      type: String,
      required: true,
    },
    Status: {
      type: String,
      enum: ["Approved", "Review", "Pending"],
      default: "Pending",
    },
    text: {
      type: String,
      required: true,
    },
    date: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

const Inquiry = mongoose.model("Inquiry", inquirySchema);

export default Inquiry;