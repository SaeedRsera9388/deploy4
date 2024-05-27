import express from "express";
import Program from "../models/Program.js";
import { createError } from "../utils/error.js";
import {
  countByLevel,
  countByType,
  createProgram,
  deleteProgram,
  getProgram,
  getProgramDetailsByType,
  getProgramPlans,
  getPrograms,
  updateProgram,
} from "../controllers/program.js";

const router = express.Router();

// CREATE
router.post("/",  createProgram);
// UPDATE
router.put("/:id",  updateProgram);
// DELETE
router.delete("/:id",  deleteProgram);

// GET countByLevel
router.get("/countByLevel", countByLevel);
router.get("/countByType", countByType);
router.get("/plans/:id", getProgramPlans);

// GET by ID and countByLevel route handler
router.get("/:id", async (req, res, next) => {
  const id = req.params.id;
  if (!id.match(/^[0-9a-fA-F]{24}$/)) {
    // If it's not a valid ObjectId format, it's countByLevel
    return countByLevel(req, res, next);
  }

  try {
    const program = await Program.findById(id);
    if (!program) {
      return res.status(404).json({ message: "Program not found" });
    }
    res.status(200).json(program);
  } catch (err) {
    next(err);
  }
});

// Add a new route for program details based on type
router.get("/details", getProgramDetailsByType);

// GET by ID
router.get("/find/:id", getProgram);

// GET ALL
router.get("/", getPrograms);

export default router;
