// routes/seraslingoVideo.js
import express from 'express';
import { 
  createSeraslingoVideo, 
  deleteSeraslingoVideo, 
  getAllSeraslingoVideos, 
  getSeraslingoVideoById, 
  getAllLanguages, 
  countByTotalLanguages
} from '../controllers/seraslingovideo.js';

const router = express.Router();

// Route to get the count of all unique languages in Seraslingo videos
router.get('/languages/count', countByTotalLanguages);

// Route to create a new SeraslingoVideo
router.post('/', createSeraslingoVideo);

// Route to get all unique languages in Seraslingo videos
router.get('/languages', getAllLanguages);

// Route to get all SeraslingoVideos
router.get('/', getAllSeraslingoVideos);

// Route to get a single SeraslingoVideo by ID
router.get('/:id', getSeraslingoVideoById);

// Route to delete a SeraslingoVideo by ID
router.delete('/:id', deleteSeraslingoVideo);

export default router;
