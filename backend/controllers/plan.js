// controllers/plan.js
import Plan from "../models/Plan.js";
import Program from "../models/Program.js";

// Create a new plan
export const createPlan = async (req, res, next) => {
  const programId = req.params.programid;
  const newPlan = new Plan(req.body);

  try {
    const savedPlan = await newPlan.save();
    await Program.findByIdAndUpdate(programId, {
      $push: { plans: savedPlan._id },
    });
    res.status(200).json(savedPlan);
  } catch (err) {
    next(err);
  }
};

// Update a plan by Id
export const updatePlan = async (req, res, next) => {
  try {
    const updatedPlan = await Plan.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(updatedPlan);
  } catch (err) {
    next(err);
  }
};

// Delete a plan by ID
export const deletePlan = async (req, res, next) => {
  const programId = req.params.programid;
  try {
    await Plan.findByIdAndDelete(req.params.id);
    await Program.findByIdAndUpdate(programId, {
      $pull: { plans: req.params.id },
    });
    res.status(200).json({ message: "Plan has been deleted!" });
  } catch (err) {
    next(err);
  }
};

// Get a plan by ID
export const getPlan = async (req, res, next) => {
  try {
    const plan = await Plan.findById(req.params.id);
    if (!plan) {
      return res.status(404).json({ message: "Plan not found" });
    }
    res.status(200).json(plan);
  } catch (err) {
    next(err);
  }
};

// Get all plans
export const getPlans = async (req, res, next) => {
  try {
    const plans = await Plan.find();
    res.status(200).json(plans);
  } catch (err) {
    next(err);
  }
};

// Count plans by title
export const countByPlanTitle = async (req, res, next) => {
  try {
    const distinctTitles = await Plan.distinct("title");

    const counts = await Promise.all(
      distinctTitles.map(async (title) => {
        const count = await Plan.countDocuments({
          title: { $regex: new RegExp(title, "i") },
        });
        return { title, count };
      })
    );

    res.status(200).json(counts);
  } catch (err) {
    next(err);
  }
};
