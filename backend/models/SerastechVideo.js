// models/SerastechVideo.js
import mongoose from "mongoose";

const serastechVideoSchema = new mongoose.Schema({
  video: {
    type: String,
    required: true
  },
  language: {
    type: String,
    required: true,
    unique: true
  },
  desc: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now,
  },
},
{ timestamps: true }
);

const SerastechVideo = mongoose.model('SerastechVideo', serastechVideoSchema);

export default SerastechVideo;
