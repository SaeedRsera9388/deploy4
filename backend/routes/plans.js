// routes/plan.js
import express from "express";

import Plan from "../models/Plan.js"; // Import the Plan model
import {
  createPlan,
  deletePlan,
  getPlan,
  getPlans,
  updatePlan,
} from "../controllers/plan.js";

const router = express.Router();

// Count by plan title
router.get("/countByPlanTitle", async (req, res, next) => {
  try {
    const distinctTitles = await Plan.distinct("title");

    const counts = await Promise.all(
      distinctTitles.map(async (title) => {
        const count = await Plan.countDocuments({
          title: { $regex: new RegExp(title, "gi") },
        });
        return { title, count };
      })
    );

    res.status(200).json(counts);
  } catch (err) {
    next(err);
  }
});

// CREATE
router.post("/:programId",  createPlan);

// UPDATE
router.put("/:id",  updatePlan);

// DELETE
router.delete("/:id",  deletePlan);

// GET by ID
router.get("/:id", getPlan);

// GET ALL
router.get("/", getPlans);

export default router;
