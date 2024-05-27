import SerastechVideo from '../models/SerastechVideo.js';

// Create a new SerastechVideo
export const createSerastechVideo = async (req, res) => {
  try {
    const { video, language, desc } = req.body;

    // Check if all required fields are provided
    if (!video || !language || !desc) {
      return res.status(400).json({ message: "All fields (video, language, desc) are required" });
    }

    // Create a new SerastechVideo instance
    const newSerastechVideo = new SerastechVideo({
      video,
      language,
      desc,
      date: new Date(), // Add current timestamp
    });

    // Save the new SerastechVideo to the database
    await newSerastechVideo.save();

    res.status(201).json(newSerastechVideo);
  } catch (error) {
    if (error.code === 11000 && error.keyPattern && error.keyPattern.language) {
      // Handle duplicate key error (language already exists)
      return res.status(400).json({ message: "Language already exists" });
    }
    res.status(500).json({ message: error.message });
  }
};

// Delete a SerastechVideo
export const deleteSerastechVideo = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedSerastechVideo = await SerastechVideo.findByIdAndDelete(id);
    if (!deletedSerastechVideo) {
      return res.status(404).json({ message: 'Serastech video not found' });
    }
    res.status(200).json({ message: 'Serastech video deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all Serastech videos
export const getAllSerastechVideos = async (req, res) => {
  try {
    const serastechVideos = await SerastechVideo.find();
    res.status(200).json(serastechVideos);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get a single SerastechVideo by ID
export const getSerastechVideoById = async (req, res) => {
  try {
    const { id } = req.params;
    const serastechVideo = await SerastechVideo.findById(id);
    if (!serastechVideo) {
      return res.status(404).json({ message: 'Serastech video not found' });
    }
    res.status(200).json(serastechVideo);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all unique languages in Serastech videos
export const getAllLanguages = async (req, res) => {
  try {
    const languages = await SerastechVideo.distinct('language');
    res.status(200).json(languages);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get the count of all unique languages in Serastech videos
export const countByTotalLanguages = async (req, res) => {
  try {
    const languages = await SerastechVideo.distinct('language');
    const totalLanguages = languages.length;
    res.status(200).json({ totalLanguages });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
