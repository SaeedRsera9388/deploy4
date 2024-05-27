import express from "express";
import {
  countByInquiriesPending,
  countByInquiriesReview,
  countByInquiry,
  createInquiry,
  deleteInquiry,
  getAllInquiries,
  getInquiry,
  updateInquiry,
} from "../controllers/inquiry.js";

const router = express.Router();

// Count total inquiries
router.get("/count", countByInquiry);


router.get('/pendingCount', countByInquiriesPending);

router.get('/reviewCount', countByInquiriesReview);

// Create a new inquiry
router.post("/", createInquiry);

// Get all inquiries
router.get("/", getAllInquiries);

// Get an inquiry by ID
router.get("/:id", getInquiry);

// Update an inquiry by ID
router.put("/:id", updateInquiry);

// Delete an inquiry by ID
router.delete("/:id", deleteInquiry);


export default router;
