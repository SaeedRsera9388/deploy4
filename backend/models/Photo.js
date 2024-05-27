// Photo model
import mongoose from "mongoose";

const photoSchema = new mongoose.Schema({
  photo: {
    type: String,
    required: true
  },
  subject: {
    type: String,
    required: true
  },
  text: {
    type: String,
    required: true
  }
}, {
  timestamps: true
});

const Photo = mongoose.model('Photo', photoSchema);

export default Photo;