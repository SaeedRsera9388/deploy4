import User from "../models/User.js";
import { verifyToken } from "../utils/verifyToken.js";


export const updateUser = async (req, res, next) => {
  try {
    // Use verifyAdmin middleware to authenticate and authorize user
    verifyAdmin(req, res, async () => {
      // Extract isAdmin field from req.body
      const { isAdmin } = req.body;
      
      // Check if isAdmin field is present and if user is trying to modify it
      if (isAdmin !== undefined) {
        // Only admins can modify isAdmin field
        if (!req.user.isAdmin) {
          return res.status(403).json({ message: "You are not authorized to modify isAdmin" });
        }
      }

      // Update user
      const updatedUser = await User.findByIdAndUpdate(
        req.params.id,
        { $set: req.body },
        { new: true }
      );
      res.status(200).json(updatedUser);
    });
  } catch (err) {
    next(err);
  }
};

export const deleteUser = async (req, res, next) => {
  try {
    // Use verifyToken middleware to authenticate use
    verifyToken(req, res, async () => {
      await User.findByIdAndDelete(req.params.id);
      res.status(200).json("User has been deleted!");
    });
  } catch (err) {
    next(err);
  }
};
export const getUser = async (req, res, next) => {
  try {
    // Use verifyToken middleware to authenticate use
    verifyToken(req, res, async () => {
      console.log("Received params:", req.params);
      const user = await User.findById(req.params.id);
      res.status(200).json(user);
    });
  } catch (err) {
    next(err);
  }
};

export const getUsers = async (req, res, next) => {
  try {
    // Use verifyToken middleware to authenticate user
    verifyToken(req, res, async () => {
      const users = await User.find();
      res.status(200).json(users);
    });
  } catch (err) {
    next(err);
  }
};


// export const fetchComments = async (req, res, next) => {
//   try {
//     const user = await User.findById(req.params.id);
//     if (!user) {
//       return res.status(404).json({ error: "User not found" });
//     }

//     const comments = user.comments || [];
//     res.status(200).json(comments);
//   } catch (err) {
//     next(err);
//   }
// };

// export const addComment = async (req, res, next) => {
//   try {
//     const { userId, comment } = req.body;
//     const user = await User.findById(userId);

//     if (!user) {
//       return res.status(404).json({ error: "User not found" });
//     }

//     user.comments.push(comment);
//     await user.save();

//     res.status(201).json({ message: "Comment added successfully" });
//   } catch (err) {
//     next(err);
//   }
// };