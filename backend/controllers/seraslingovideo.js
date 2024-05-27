// controllers/seraslingoVideo.js
import SeraslingoVideo from '../models/SeraslingoVideo.js';

// Create a new SeraslingoVideo
export const createSeraslingoVideo = async (req, res) => {
  try {
    const { video, language, desc } = req.body;

    // Check if all required fields are provided
    if (!video || !language || !desc) {
      return res.status(400).json({ message: "All fields (video, language, desc) are required" });
    }

    // Create a new SeraslingoVideo instance
    const newSeraslingoVideo = new SeraslingoVideo({
      video,
      language,
      desc,
      date: new Date(), // Add current timestamp
    });

    // Save the new SeraslingoVideo to the database
    await newSeraslingoVideo.save();

    res.status(201).json(newSeraslingoVideo);
  } catch (error) {
    if (error.code === 11000 && error.keyPattern && error.keyPattern.language) {
      // Handle duplicate key error (language already exists)
      return res.status(400).json({ message: "Language already exists" });
    }
    res.status(500).json({ message: error.message });
  }
};

// Delete a SeraslingoVideo
export const deleteSeraslingoVideo = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedSeraslingoVideo = await SeraslingoVideo.findByIdAndDelete(id);
    if (!deletedSeraslingoVideo) {
      return res.status(404).json({ message: 'Seraslingo video not found' });
    }
    res.status(200).json({ message: 'Seraslingo video deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// Get all Seraslingo videos or filter by language
export const getAllSeraslingoVideos = async (req, res) => {
  try {
    const { language } = req.query;
    const filter = language ? { language } : {};
    const seraslingoVideos = await SeraslingoVideo.find(filter);
    res.status(200).json(seraslingoVideos);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// Get a single SeraslingoVideo by ID
export const getSeraslingoVideoById = async (req, res) => {
  try {
    const { id } = req.params;
    const seraslingoVideo = await SeraslingoVideo.findById(id);
    if (!seraslingoVideo) {
      return res.status(404).json({ message: 'Seraslingo video not found' });
    }
    res.status(200).json(seraslingoVideo);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all unique languages in Seraslingo videos
export const getAllLanguages = async (req, res) => {
  try {
    const languages = await SeraslingoVideo.distinct('language');
    res.status(200).json(languages);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// Get the count of all unique languages in Seraslingo videos
export const countByTotalLanguages = async (req, res) => {
  try {
    const languages = await SeraslingoVideo.distinct('language');
    const totalLanguages = languages.length;
    res.status(200).json({ totalLanguages });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};