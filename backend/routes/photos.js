// Express route
import express from "express";

import {
  countByPhoto,
  createPhoto,
  deletePhoto,
  getAllPhotos,
  getPhoto,
  updatePhoto,
} from "../controllers/photo.js";

const router = express.Router();

router.get("/count", countByPhoto);

router.post("/", createPhoto);
router.delete("/:id", deletePhoto);
router.put("/:id", updatePhoto);
router.get("/:id", getPhoto);
router.get("/", getAllPhotos);

export default router;
