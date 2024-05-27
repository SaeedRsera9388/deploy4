// models/SeraslingoVideo.js
import mongoose from "mongoose";

const seraslingoVideoSchema = new mongoose.Schema(
  {
    video: {
      type: String,
      required: true,
    },
    language: {
      type: String,
      required: true,
      unique: true,
    },
    desc: {
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

const SeraslingoVideo = mongoose.model(
  "SeraslingoVideo",
  seraslingoVideoSchema
);

export default SeraslingoVideo;
