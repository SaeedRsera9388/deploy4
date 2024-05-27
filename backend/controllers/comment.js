// controllers/comment.js
import Comment from "../models/Comment.js";

// Create a new comment

export const createComment = async (req, res, next) => {
  try {
    const { name, subject, text } = req.body;

    // Check if all required fields are provided
    if (!name || !subject || !text) {
      return res.status(400).json({ error: "All fields are required" });
    }

    // Construct the comment object with current timestamp
    const newComment = new Comment({
      name,
      subject,
      text,
      date: new Date(), // Add current timestam
    });

    // Save the new comment to the database
    const savedComment = await newComment.save();

    res.status(201).json(savedComment);
  } catch (err) {
    next(err);
  }
};

// Get a comment by ID
export const getComment = async (req, res, next) => {
  try {
    const comment = await Comment.findById(req.params.id);
    if (!comment) {
      return res.status(404).json({ message: "Comment not found" });
    }
    res.status(200).json(comment);
  } catch (error) {
    console.error('Error fetching comment by ID:', error);
    res.status(500).json({ error: 'Could not fetch comment' });
  }
};

// Get all comments
export const getComments = async (req, res, next) => {
  try {
    const comments = await Comment.find();
    res.status(200).json(comments);
  } catch (error) {
    console.error('Error fetching comments:', error);
    res.status(500).json({ error: 'Could not fetch comments' });
  }
};


// Update a comment by ID
export const updateComment = async (req, res, next) => {
  try {
    const updatedComment = await Comment.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(updatedComment);
  } catch (err) {
    next(err);
  }
};


// Delete a comment by ID
export const deleteComment = async (req, res, next) => {
  try {
    await Comment.findByIdAndDelete(req.params.id);
    res.status(204).json({ message: "Comment deleted successfully" });
  } catch (err) {
    next(err);
  }
};


// Count total comments
export const countByComment = async (req, res, next) => {
  try {
    const totalCount = await Comment.countDocuments();
    res.status(200).json({ totalComments: totalCount });
  } catch (err) {
    console.error('Error counting comments:', err);
    res.status(500).json({ success: false, status: 500, message: 'Error counting comments', stack: err.stack });
  }
};