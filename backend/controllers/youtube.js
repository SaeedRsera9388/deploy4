// controllers/youtube.js
import Youtube from '../models/Youtube.js';

// Create a new Youtube
export const createYoutube = async (req, res) => {
  try {
    const { vid, subject, text } = req.body;

    // Check if all required fields are provided
    if (!vid || !subject || !text) {
      return res.status(400).json({ message: "Vid, subject, and text are required fields" });
    }

    // Create a new Youtube instance
    const newYoutube = new Youtube({
      vid,
      subject,
      text,
      date: new Date() // Add current timestamp
    });

    // Save the new Youtube to the database
    await newYoutube.save();

    res.status(201).json(newYoutube);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// Delete a Youtube
export const deleteYoutube = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedYoutube = await Youtube.findByIdAndDelete(id);
    if (!deletedYoutube) {
      return res.status(404).json({ message: 'Youtube video not found' });
    }
    res.status(200).json({ message: 'Youtube video deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update a Youtube
export const updateYoutube = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedYoutube = await Youtube.findByIdAndUpdate(id, req.body, { new: true });
    if (!updatedYoutube) {
      return res.status(404).json({ message: 'Youtube video not found' });
    }
    res.status(200).json(updatedYoutube);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all Youtube videos
export const getAllYoutubes = async (req, res) => {
  try {
    const youtubes = await Youtube.find();
    res.status(200).json(youtubes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get a Youtube video by ID
export const getYoutube = async (req, res) => {
  try {
    const { id } = req.params;
    const youtube = await Youtube.findById(id);
    if (!youtube) {
      return res.status(404).json({ message: 'Youtube video not found' });
    }
    res.status(200).json(youtube);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Count total Youtube videos
export const countByYoutubes = async (req, res) => {
  try {
    const totalCount = await Youtube.countDocuments();
    res.status(200).json({ totalYoutubes: totalCount });
  } catch (err) {
    console.error('Error counting Youtube videos:', err);
    res.status(500).json({ success: false, status: 500, message: 'Error counting Youtube videos', stack: err.stack });
  }
};
