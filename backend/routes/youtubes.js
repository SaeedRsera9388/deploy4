// Express route
import express from "express";

import { countByYoutubes, createYoutube, deleteYoutube, getAllYoutubes, getYoutube, updateYoutube } from "../controllers/youtube.js";

const router = express.Router();

// Count total Youtube videos
router.get('/count', countByYoutubes);

// Create a new Youtube video
router.post('/', createYoutube);

// Delete a Youtube video by ID
router.delete('/:id', deleteYoutube);

// Update a Youtube video by ID
router.put('/:id', updateYoutube);

// Get all Youtube videos
router.get('/', getAllYoutubes);

// Get a Youtube video by ID
router.get('/:id', getYoutube);


export default router;


