import User from "../models/User.js";
import bcrypt from "bcryptjs";
import { createError } from "../utils/error.js";
import Jwt from "jsonwebtoken";

export const register = async (req, res, next) => {
  try {
    console.log("Request Body:", req.body);  // Log the request body

    const { password, ...otherFields } = req.body;
    if (!password) {
      return res.status(400).send("Password is required");
    }

    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);

    const newUser = new User({
      ...otherFields,
      password: hash,
      isAdmin: true,
    });

    await newUser.save();
    console.log("User created successfully:", newUser);
    res.status(200).send("User has been created!");
  } catch (err) {
    console.error("Error creating user:", err); // Detailed error log
    if (err.code === 11000) {
      res.status(409).send("Duplicate entry. Please try again later.");
    } else if (err.name === 'ValidationError') {
      res.status(400).send(err.message);
    } else {
      next(err);
    }
  }
};

export const login = async (req, res, next) => {
  try {
    const user = await User.findOne({ username: req.body.username });
    if (!user) return next(createError(404, "User not found!"));

    const isPasswordCorrect = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!isPasswordCorrect)
      return next(createError(400, "Wrong password or username!"));

    const token = Jwt.sign(
      { id: user._id, isAdmin: user.isAdmin },
      process.env.JWT_SECRET
    );

    const { password, isAdmin, ...otherDetails } = user._doc;
    res
      .cookie("access_token", token, {
        httpOnly: true,
      })
      .status(200)
      .json({ details: { ...otherDetails }, isAdmin });
  } catch (err) {
    next(err);
  }
};
