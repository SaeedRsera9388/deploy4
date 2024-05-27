// routes/serastechVideo.js
import express from 'express';
import { countByTotalLanguages, createSerastechVideo, deleteSerastechVideo, getAllLanguages, getAllSerastechVideos, getSerastechVideoById } from '../controllers/serastechvideo.js';

const router = express.Router();

// Route to get the count of all unique languages in Serastech videos
router.get('/languages/count', countByTotalLanguages);

// Route to create a new SerastechVideo
router.post('/', createSerastechVideo);

// Route to get all unique languages in Serastech videos
router.get('/languages', getAllLanguages);


// Route to get all SerastechVideos
router.get('/', getAllSerastechVideos);

// Route to get a single SerastechVideo by ID
router.get('/:id', getSerastechVideoById);

// Route to delete a SerastechVideo by ID
router.delete('/:id', deleteSerastechVideo);

export default router;
