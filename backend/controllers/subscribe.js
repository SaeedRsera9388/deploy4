import Subscribe from '../models/Subscribe.js';

// Create a new subscription
export const createSubscribe = async (req, res, next) => {
  try {
    // Extract email from the request body
    const { email } = req.body;

    // Check if email is provided
    if (!email) {
      return res.status(400).json({ error: "Email is required" });
    }

    // Create new subscription with current timestamp
    const newSubscription = new Subscribe({ email });

    // Save the new subscription to the database
    const savedSubscription = await newSubscription.save();

    res.status(201).json({ 
      subscription: savedSubscription,
      createdAt: savedSubscription.createdAt // Include creation date
    });
  } catch (err) {
    next(err);
  }
};

// Delete a subscription by ID
export const deleteSubscribe = async (req, res, next) => {
  try {
    const { id } = req.params; // Extract ID from the request parameters

    // Find and delete the subscription by ID
    const deletedSubscription = await Subscribe.findByIdAndDelete(id);

    if (!deletedSubscription) {
      return res.status(404).json({ error: "Subscription not found" });
    }

    res.status(200).json({ message: "Subscription deleted successfully" });
  } catch (err) {
    next(err);
  }
};


// Update a subscription by ID
export const updateSubscribe = async (req, res, next) => {
  try {
    const { id } = req.params; // Extract ID from the request parameters
    const { newEmail } = req.body;

    // Check if new email is provided
    if (!newEmail) {
      return res.status(400).json({ error: "New email is required" });
    }

    // Find the subscription by ID and update the email
    const updatedSubscription = await Subscribe.findByIdAndUpdate(id, { email: newEmail }, { new: true });

    if (!updatedSubscription) {
      return res.status(404).json({ error: "Subscription not found" });
    }

    res.status(200).json({ updatedSubscription });
  } catch (err) {
    next(err);
  }
};

// Get a single subscription by ID
export const getSubscribe = async (req, res, next) => {
  try {
    const { id } = req.params; // Extract ID from the request parameters

    // Find the subscription by ID
    const subscription = await Subscribe.findById(id);

    if (!subscription) {
      return res.status(404).json({ error: "Subscription not found" });
    }

    res.status(200).json({ subscription });
  } catch (err) {
    next(err);
  }
};

// Get all subscriptions
export const getSubscribes = async (req, res, next) => {
  try {
    // Find all subscriptions
    const subscriptions = await Subscribe.find();

    res.status(200).json({ subscriptions });
  } catch (err) {
    next(err);
  }
};

// Get the count of all subscriptions
export const countSubscribes = async (req, res, next) => {
  try {
    // Count all subscriptions
    const count = await Subscribe.countDocuments();

    res.status(200).json({ count });
  } catch (err) {
    next(err);
  }
};
