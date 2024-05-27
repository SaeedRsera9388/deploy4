import Plan from "../models/Plan.js";
import Program from "../models/Program.js";
import validator from 'validator';

export const createProgram = async (req, res, next) => {
  const newProgram = new Program(req.body);

  try {
    const savedProgram = await newProgram.save();

    // Fetching plans from request body, assuming an array of plan IDs is provided
    const { plans } = req.body;
    if (plans && plans.length > 0) {
      await Plan.updateMany({ _id: { $in: plans } }, { $set: { program: savedProgram._id } });
    }

    res.status(200).json(savedProgram);
  } catch (err) {
    next(err);
  }
};

export const updateProgram = async (req, res, next) => {
  try {
    const updatedProgram = await Program.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(updatedProgram);
  } catch (err) {
    next(err);
  }
};

export const deleteProgram = async (req, res, next) => {
  try {
    await Program.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Program has been deleted!" });
  } catch (err) {
    next(err);
  }
};

export const getProgram = async (req, res, next) => {
  try {
    const program = await Program.findById(req.params.id);
    res.status(200).json(program);
  } catch (err) {
    next(err);
  }
};

export const getPrograms = async (req, res, next) => {
  try {
    const minPrice = parseInt(req.query.min) || 1;
    const maxPrice = parseInt(req.query.max) || 999999;

    const programs = await Program.find({
      cheapestPrice: { $gte: minPrice, $lte: maxPrice },
    }).limit(parseInt(req.query.limit) || 0);

    res.status(200).json(programs);
  } catch (err) {
    next(err);
  }
};


export const countByLevel = async (req, res, next) => {
  try {
    const distinctLevels = await Program.distinct("level");
    
    const counts = await Promise.all(
      distinctLevels.map(async (level) => {
        const count = await Program.countDocuments({
          level: { $regex: new RegExp(level, "i") },
        });
        return { level, count };
      })
    );

    res.status(200).json(counts);
  } catch (err) {
    next(err);
  }
};



export const countByType = async (req, res, next) => {
  try {
    const types = await Program.distinct("type");
    const counts = await Promise.all(
      types.map(async (type) => {
        const count = await Program.countDocuments({ type });
        return { type, count };
      })
    );

    res.status(200).json(counts);
  } catch (err) {
    next(err);
  }
};

// Get plans associated with a program
export const getProgramPlans = async (req, res, next) => {
  try {
    const { id } = req.params;

    // Find the program by its ID
    const program = await Program.findById(id);
    if (!program) {
      return res.status(404).json({ error: "Program not found" });
    }

    // Retrieve plans associated with the program ID
    const plans = await Plan.find({ program: id });

    res.status(200).json(plans);
  } catch (err) {
    next(err);
  }
};



export const getProgramDetailsByType = async (req, res, next) => {
  try {
    const { type } = req.query;

    if (!type || typeof type !== 'string' || !validator.isAlphanumeric(type)) {
      throw new Error(`Invalid or missing 'type' parameter.`);
    }

    const programDetails = await Program.findOne({ type }).populate('plans');
    console.log("Program Details:", programDetails);

    if (!programDetails) {
      return res.status(404).json({ error: 'Program not found' });
    }

    return res.status(200).json(programDetails);
  } catch (err) {
    next(err);
  }
};