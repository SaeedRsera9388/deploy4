// Youtube model
import mongoose from "mongoose";


const youtubeSchema = new mongoose.Schema({
  vid: {
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
  },
  date: {
    type: Date,
    default: Date.now
  }
});

const Youtube = mongoose.model('Youtube', youtubeSchema);

export default Youtube;
