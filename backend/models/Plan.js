import mongoose from "mongoose";

const PlanSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  maxParticipant: {
    type: Number,
    required: true
  },
  desc: {
    type: String,
    required: true
  },
  program: [{
    type: String,
    ref: "Program"
  }],
}, { timestamps: true });

export default mongoose.model("Plan", PlanSchema);
