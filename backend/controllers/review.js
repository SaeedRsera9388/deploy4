// controllers/review.js
import Review from "../models/Review.js";


// Create a new review
export const createReview = async (req, res, next) => {
  try {
    const { name, subject, rate, text, photo } = req.body;
    
    // Check if all required fields are provided
    if (!name || !subject || !rate || !text) {
      return res.status(400).json({ error: "All fields are required" });
    }

    // Construct the review object with current timestamp
    const newReview = new Review({
      name,
      subject,
      rate,
      text,
      photo,
      date: new Date(), // Add current timestamp
    });

    // Save the new review to the database
    const savedReview = await newReview.save();

    res.status(201).json(savedReview);
  } catch (err) {
    next(err);
  }
};

// Update a review by ID 
export const updateReview = async (req, res, next) => {
  try {
    const { name, subject, photo, rate, text } = req.body;

    const updatedReview = await Review.findByIdAndUpdate(
      req.params.id,
      { name, subject, photo, rate, text },
      { new: true }
    );
    res.status(200).json(updatedReview);
  } catch (err) {
    next(err);
  }
};

// Delete a review by ID
export const deleteReview = async (req, res, next) => {
  try {
    await Review.findByIdAndDelete(req.params.id);
    res.status(204).json({ message: "Review deleted successfully" });
  } catch (err) {
    next(err);
  }
};

// Get a review by ID
export const getReview = async (req, res, next) => {
  try {
    const review = await Review.findById(req.params.id);
    if (!review) {
      return res.status(404).json({ message: "Review not found" });
    }
    res.status(200).json(review);
  } catch (err) {
    next(err);
  }
};

// Get all reviews
export const getReviews = async (req, res, next) => {
  try {
    const reviews = await Review.find();
    res.status(200).json(reviews);
  } catch (err) {
    next(err);
  }
};


// Count total reviews
export const countByReview = async (req, res, next) => {
  try {
    const totalCount = await Review.countDocuments();
    res.status(200).json({ totalReviews: totalCount });
  } catch (err) {
    console.error('Error counting reviews:', err);
    res.status(500).json({ success: false, status: 500, message: 'Error counting reviews', stack: err.stack });
  }
};




// Count reviews with a specific rate
export const countByReviewRate = async (req, res, next) => {
  try {
    const rate = 5; // Change this to the desired rate
    const totalCount = await Review.countDocuments({ rate });
    res.status(200).json({ totalReviews: totalCount });
  } catch (err) {
    console.error('Error counting reviews by rate:', err);
    res.status(500).json({ success: false, status: 500, message: 'Error counting reviews by rate', stack: err.stack });
  }
};


// controllers/review.js

// Count reviews with rate number 4
export const countByReviewTopSecond = async (req, res, next) => {
  try {
    const totalCount = await Review.countDocuments({ rate: 4 });
    res.status(200).json({ totalReviews: totalCount });
  } catch (err) {
    console.error('Error counting reviews by rate:', err);
    res.status(500).json({ success: false, status: 500, message: 'Error counting reviews by rate', stack: err.stack });
  }
};

// Count reviews with rate number 3
export const countByReviewMiddle = async (req, res, next) => {
  try {
    const totalCount = await Review.countDocuments({ rate: 3 });
    res.status(200).json({ totalReviews: totalCount });
  } catch (err) {
    console.error('Error counting reviews by rate:', err);
    res.status(500).json({ success: false, status: 500, message: 'Error counting reviews by rate', stack: err.stack });
  }
};

// Count reviews with rate number 2
export const countByReviewSecondLast = async (req, res, next) => {
  try {
    const totalCount = await Review.countDocuments({ rate: 2 });
    res.status(200).json({ totalReviews: totalCount });
  } catch (err) {
    console.error('Error counting reviews by rate:', err);
    res.status(500).json({ success: false, status: 500, message: 'Error counting reviews by rate', stack: err.stack });
  }
};

// Count reviews with rate number 1
export const countByReviewLast = async (req, res, next) => {
  try {
    const totalCount = await Review.countDocuments({ rate: 1 });
    res.status(200).json({ totalReviews: totalCount });
  } catch (err) {
    console.error('Error counting reviews by rate:', err);
    res.status(500).json({ success: false, status: 500, message: 'Error counting reviews by rate', stack: err.stack });
  }
};


