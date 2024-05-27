import Photo from '../models/Photo.js';

export const createPhoto = async (req, res) => {
  try {
    const { photo, subject, text } = req.body;

    // Check if all required fields are provided
    if (!photo || !subject || !text) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Create a new photo instance
    const newPhoto = new Photo({
      photo,
      subject,
      text
    });

    // Save the new photo to the database
    await newPhoto.save();

    res.status(201).json(newPhoto);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deletePhoto = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedPhoto = await Photo.findByIdAndDelete(id);
    if (!deletedPhoto) {
      return res.status(404).json({ message: 'Photo not found' });
    }
    res.status(200).json({ message: 'Photo deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updatePhoto = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedPhoto = await Photo.findByIdAndUpdate(id, req.body, { new: true });
    if (!updatedPhoto) {
      return res.status(404).json({ message: 'Photo not found' });
    }
    res.status(200).json(updatedPhoto);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getAllPhotos = async (req, res) => {
  try {
    const photos = await Photo.find();
    const photosWithId = photos.map((photo, index) => ({
      ...photo.toObject(),
      id: photo._id
    }));
    res.status(200).json(photosWithId);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getPhoto = async (req, res) => {
  try {
    const { id } = req.params;
    const photo = await Photo.findById(id);
    if (!photo) {
      return res.status(404).json({ message: 'Photo not found' });
    }
    res.status(200).json(photo);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// Count total photos
export const countByPhoto = async (req, res) => {
  try {
    const totalCount = await Photo.countDocuments();
    res.status(200).json({ totalPhotos: totalCount });
  } catch (err) {
    console.error('Error counting photos:', err);
    res.status(500).json({ success: false, status: 500, message: 'Error counting photos', stack: err.stack });
  }
};
