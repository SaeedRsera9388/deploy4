import mongoose from "mongoose";
import Inquiry from "../models/Inquiry.js";

// Create a new inquiry
export const createInquiry = async (req, res, next) => {
  try {
    const { name, email, program, subject, text } = req.body;

    const newInquiry = new Inquiry({
      name,
      email,
      program,
      subject,
      text,
      Status: "Pending", // Set status to "Pending" by default
      date: new Date(), // Add current timestamp
    });

    const savedInquiry = await newInquiry.save();
    res.status(201).json(savedInquiry);
  } catch (err) {
    next(err);
  }
};

// Get all inquiries 
export const getAllInquiries = async (req, res) => {
  try {
    const inquiries = await Inquiry.find();
    res.status(200).json(inquiries);
  } catch (error) {
    console.error('Error fetching inquiries:', error);
    res.status(500).json({ error: 'Could not fetch inquiries' });
  }
};

// Get an inquiry by ID
export const getInquiry = async (req, res, next) => {
  try {
    const inquiry = await Inquiry.findById(req.params.id);
    if (!inquiry) {
      return res.status(404).json({ message: "Inquiry not found" });
    }
    res.status(200).json(inquiry);
  } catch (error) {
    console.error('Error fetching inquiry by ID:', error);
    res.status(500).json({ error: 'Could not fetch inquiry' });
  }
};

// Update an inquiry by ID
export const updateInquiry = async (req, res, next) => {
  try {
    // Include the current timestamp in the request body
    req.body.date = new Date();
    
    const updatedInquiry = await Inquiry.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(updatedInquiry);
  } catch (err) {
    next(err);
  }
};

// Delete an inquiry by ID
export const deleteInquiry = async (req, res, next) => {
  try {
    await Inquiry.findByIdAndDelete(req.params.id);
    res.status(204).json({ message: "Inquiry deleted successfully" });
  } catch (err) {
    next(err);
  }
};

// Count total inquiries
export const countByInquiry = async (req, res, next) => {
  try {
    const totalCount = await Inquiry.countDocuments();
    res.status(200).json({ totalInquiries: totalCount });
  } catch (err) {
    console.error('Error counting inquiries:', err);
    res.status(500).json({ success: false, status: 500, message: 'Error counting inquiries', stack: err.stack });
  }
};

export const countByInquiriesPending = async (req, res, next) => {
  try {
    const pendingCount = await Inquiry.countDocuments({ Status: "Pending" });
    res.status(200).json({ pendingCount });
  } catch (err) {
    console.error('Error counting pending inquiries:', err);
    res.status(500).json({ error: 'Could not count pending inquiries', stack: err.stack });
  }
};

export const countByInquiriesReview = async (req, res, next) => {
  try {
    const reviewCount = await Inquiry.countDocuments({ Status: "Review" });
    res.status(200).json({ reviewCount });
  } catch (err) {
    console.error('Error counting review inquiries:', err);
    res.status(500).json({ error: 'Could not count review inquiries', stack: err.stack });
  }
};
