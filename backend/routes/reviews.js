// routes/reviewRoute.js
import express from "express";
import { createReview, deleteReview, getReview, getReviews, updateReview, countByReview, countByReviewRate, countByReviewTopSecond, countByReviewMiddle, countByReviewSecondLast, countByReviewLast } from "../controllers/review.js";

const router = express.Router();

// Count total reviews
router.get("/count", countByReview);

// Count reviews with rate 5
router.get("/countByReviewRate", countByReviewRate);


// Count reviews with rate number 4 (top second)
router.get("/countByReviewTopSecond", countByReviewTopSecond);

// Count reviews with rate number 3 (middle)
router.get("/countByReviewMiddle", countByReviewMiddle);

// Count reviews with rate number 2 (second last)
router.get("/countByReviewSecondLast", countByReviewSecondLast);

// Count reviews with rate number 1 (last)
router.get("/countByReviewLast", countByReviewLast);


// Create a new review
router.post("/", createReview);

// Update a review by ID
router.put("/:id", updateReview);

// Delete a review by ID
router.delete("/:id", deleteReview);

// Get a review by ID
router.get("/:id", getReview);


// Get all reviews
router.get("/", getReviews);

export default router;
