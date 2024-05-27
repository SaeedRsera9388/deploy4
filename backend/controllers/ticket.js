import Ticket from '../models/Ticket.js';

// Generate Tracking ID (TID) based on current date and ticket count
const generateTrackingID = async () => {
  const today = new Date();
  const year = today.getFullYear().toString().slice(-2);
  const month = (today.getMonth() + 1).toString().padStart(2, '0');
  const day = today.getDate().toString().padStart(2, '0');
  const count = await Ticket.countDocuments() + 1;
  const trackingID = `TID${year}${month}${day}${count.toString().padStart(3, '0')}`;
  return trackingID;
};

// Generate Customer ID (CID) based on customer count
const generateCustomerID = async () => {
  const count = await Ticket.countDocuments() + 1;
  const customerID = `CID240000${count.toString().padStart(2, '0')}`;
  return customerID;
};

// Create a new ticket
export const createTicket = async (req, res, next) => {
  try {
    const {
      Name,
      Company,
      email,
      Program,
      plan,
      level,
      phone,
      desc,
    } = req.body;

    const trackingID = await generateTrackingID();
    const customerID = await generateCustomerID();

    const newTicket = new Ticket({
      Name,
      Company,
      customerID,
      email,
      Program,
      plan,
      level,
      phone,
      desc,
      trackingID,
      Status: "Pending", // Default status set to "Pending"
      date: new Date(), // Add current timestamp
    });

    const savedTicket = await newTicket.save();
    res.status(201).json(savedTicket);
  } catch (err) {
    next(err);
  }
};

// Get all tickets
export const getAllTickets = async (req, res) => {
  try {
    const tickets = await Ticket.find();
    res.status(200).json(tickets);
  } catch (error) {
    console.error('Error fetching tickets:', error);
    res.status(500).json({ error: 'Could not fetch tickets' });
  }
};

// Get a ticket by ID
export const getTicket = async (req, res, next) => {
  try {
    const ticket = await Ticket.findById(req.params.id);
    if (!ticket) {
      return res.status(404).json({ error: "Ticket not found" });
    }
    res.status(200).json(ticket);
  } catch (err) {
    next(err);
  }
};

// Update a ticket by ID
export const updateTicket = async (req, res, next) => {
  try {
    const updatedTicket = await Ticket.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(updatedTicket);
  } catch (err) {
    next(err);
  }
};

// Delete a ticket by ID
export const deleteTicket = async (req, res, next) => {
  try {
    await Ticket.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Ticket deleted successfully" }); // Changed status code to 200
  } catch (err) {
    next(err);
  }
};

// Count total tickets
export const countByTickets = async (req, res, next) => {
  try {
    const totalCount = await Ticket.aggregate([{ $group: { _id: null, totalCount: { $sum: 1 } } }]);
    const totalTickets = totalCount.length > 0 ? totalCount[0].totalCount : 0;
    res.status(200).json({ totalTickets });
  } catch (err) {
    console.error('Error counting tickets:', err);
    res.status(500).json({ success: false, status: 500, message: 'Error counting tickets', stack: err.stack });
  }
};


export const countByTicketsPending = async (req, res, next) => {
  try {
    const pendingCount = await Ticket.countDocuments({ Status: "Pending" });
    res.status(200).json({ pendingCount });
  } catch (err) {
    console.error('Error counting pending tickets:', err);
    res.status(500).json({ error: 'Could not count pending tickets', stack: err.stack });
  }
};
export const countByTicketsReview = async (req, res, next) => {
  try {
    const reviewCount = await Ticket.countDocuments({ Status: "Review" });
    res.status(200).json({ reviewCount });
  } catch (err) {
    console.error('Error counting review tickets:', err);
    res.status(500).json({ error: 'Could not count review tickets', stack: err.stack });
  }
};
