import Client from '../models/Client.js';

// Generate Client Tracking ID (ClientTID) based on current date and client count
const generateClientTID = async () => {
  const today = new Date();
  const year = today.getFullYear().toString().slice(-2);
  const month = (today.getMonth() + 1).toString().padStart(2, '0');
  const day = today.getDate().toString().padStart(2, '0');
  const count = await Client.countDocuments() + 1;
  const clientTID = `ClientTID${year}${month}${day}${count.toString().padStart(3, '0')}`;
  return clientTID;
};

// Generate Registration Identification Number (RIF) based on client count
const generateRIF = async () => {
  const count = await Client.countDocuments() + 1;
  const rif = `RIF240501${count.toString().padStart(3, '0')}`;
  return rif;
};

// Create a new client
export const createClient = async (req, res, next) => {
  try {
    const {
      Name,
      Company,
      language,
      email,
      Country,
      program,
      Phone,
      Age,
      notes,
      participants,
      Price,
      startingDate,
      endDate,
      Payment,
      Status,
    } = req.body;

    const clientTID = await generateClientTID();
    const rif = await generateRIF();

    const newClient = new Client({
      Name,
      Company,
      language,
      email,
      Country,
      program,
      Phone,
      Age,
      notes,
      participants,
      Price,
      startingDate,
      endDate,
      ClientTID: clientTID,
      RIF: rif,
      Payment,
      Status,
      date: new Date(), // Add current timestamp
    });

    const savedClient = await newClient.save();
    res.status(201).json(savedClient);
  } catch (err) {
    next(err);
  }
};

// Get all clients
export const getAllClients = async (req, res) => {
  try {
    const clients = await Client.find();
    res.status(200).json(clients);
  } catch (error) {
    console.error('Error fetching clients:', error);
    res.status(500).json({ error: 'Could not fetch clients' });
  }
};

// Get a client by ID
export const getClient = async (req, res, next) => {
  try {
    const client = await Client.findById(req.params.id);
    if (!client) {
      return res.status(404).json({ error: "Client not found" });
    }
    res.status(200).json(client);
  } catch (err) {
    next(err);
  }
};

// Update a client by ID
export const updateClient = async (req, res, next) => {
  try {
    const updatedClient = await Client.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(updatedClient);
  } catch (err) {
    next(err);
  }
};

// Delete a client by ID
export const deleteClient = async (req, res, next) => {
  try {
    await Client.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Client deleted successfully" }); // Changed status code to 200
  } catch (err) {
    next(err);
  }
};

// Count total number of clients
export const countByClient = async (req, res, next) => {
  try {
    const totalCount = await Client.countDocuments();
    res.status(200).json({ totalCount });
  } catch (err) {
    console.error('Error counting clients:', err);
    res.status(500).json({ error: 'Could not count clients', stack: err.stack });
  }
};



export const countByPendingForClient = async (req, res, next) => {
  try {
    const pendingCount = await Client.countDocuments({ Status: "Pending" });
    res.status(200).json({ pendingCount });
  } catch (err) {
    console.error('Error counting pending clients:', err);
    res.status(500).json({ error: 'Could not count pending clients', stack: err.stack });
  }
};
export const countByReviewForClient = async (req, res, next) => {
  try {
    const reviewCount = await Client.countDocuments({ Status: "Review" });
    res.status(200).json({ reviewCount });
  } catch (err) {
    console.error('Error counting review clients:', err);
    res.status(500).json({ error: 'Could not count review clients', stack: err.stack });
  }
};


export const getClientByTotalPrice = async (req, res, next) => {
  try {
    const totalPriceAmount = await Client.aggregate([
      {
        $group: {
          _id: null,
          totalPriceAmount: { $sum: "$Price" }
        }
      }
    ]);
    res.status(200).json(totalPriceAmount[0]);
  } catch (err) {
    next(err);
  }
};
