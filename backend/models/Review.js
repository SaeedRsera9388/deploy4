// models/Review.js
import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    subject: {
      type: String,
      required: true,
    },
    rate: {
      type: Number,
      required: true,
    },
    text: {
      type: String,
      required: true,
    },
    photo: String, // Add photo field
    date: {
      type: Date,
      default: Date.now, // Set default value to current timestamp
    },
  },
  { timestamps: true }
);

const Review = mongoose.model("Review", reviewSchema);

export default Review;
