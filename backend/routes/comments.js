// routes/commentRoute.js
import express from "express";
import {  countByComment, createComment, deleteComment, getComment, getComments, updateComment } from "../controllers/comment.js";
import { verifyAdmin } from "../utils/verifyToken.js";

const router = express.Router();


// Count total comments
router.get("/count", countByComment);

// Create a new comment
router.post("/",  createComment);

// Update a comment by ID
router.put("/:id", updateComment);

// Get a comment by ID
router.get("/:id", getComment);

// Get all comments
router.get("/", getComments);

// Delete a comment by ID
router.delete("/:id",  deleteComment);



export default router;
