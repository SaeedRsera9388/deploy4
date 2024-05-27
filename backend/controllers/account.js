import Account from '../models/Account.js';

// Generate Reference ID based on current date and account count
const generateReferenceID = async () => {
  const today = new Date();
  const year = today.getFullYear().toString().slice(-2);
  const month = (today.getMonth() + 1).toString().padStart(2, '0');
  const day = today.getDate().toString().padStart(2, '0');
  const count = await Account.countDocuments() + 1;
  const referenceID = `RefID${year}${month}${day}${count.toString().padStart(3, '0')}`;
  return referenceID;
};

// Generate Invoice ID based on current date and account count
const generateInvoiceID = async () => {
  const today = new Date();
  const year = today.getFullYear().toString().slice(-2);
  const month = (today.getMonth() + 1).toString().padStart(2, '0');
  const day = today.getDate().toString().padStart(2, '0');
  const count = await Account.countDocuments() + 1;
  const invoiceID = `InvID${year}${month}${day}${count.toString().padStart(3, '0')}`;
  return invoiceID;
};

// Create a new account
export const createAccount = async (req, res, next) => {
  try {
    const {
      Title,
      name,
      recipient,
      paymentType,
      Payment,
      remainingCost,
      expiryDate,
      actionText,
      notes,
      paymentAmount,
      Status,
      renew,
    } = req.body;

    const referenceID = await generateReferenceID();
    const invoiceID = await generateInvoiceID();

    const newAccount = new Account({
      Title,
      name,
      recipient,
      paymentType,
      invoiceID,
      Payment,
      remainingCost,
      expiryDate,
      actionText,
      notes,
      paymentAmount,
      referenceID,
      Status,
      renew,
      date: new Date(), // Add current timestamp
    });

    const savedAccount = await newAccount.save();
    res.status(201).json(savedAccount);
  } catch (err) {
    next(err);
  }
};

// Get all accounts
export const getAllAccounts = async (req, res) => {
  try {
    const accounts = await Account.find();
    res.status(200).json(accounts);
  } catch (error) {
    console.error('Error fetching accounts:', error);
    res.status(500).json({ error: 'Could not fetch accounts' });
  }
};

// Get an account by ID
export const getAccountByID = async (req, res, next) => {
  try {
    const account = await Account.findById(req.params.id);
    if (!account) {
      return res.status(404).json({ error: "Account not found" });
    }
    res.status(200).json(account);
  } catch (err) {
    next(err);
  }
};

// Update an account by ID
export const updateAccount = async (req, res, next) => {
  try {
    const updatedAccount = await Account.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(updatedAccount);
  } catch (err) {
    next(err);
  }
};

// Delete an account by ID
export const deleteAccount = async (req, res, next) => {
  try {
    await Account.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Account deleted successfully" });
  } catch (err) {
    next(err);
  }
};

// Count total number of accounts
export const countByAccount = async (req, res, next) => {
  try {
    const totalCount = await Account.countDocuments();
    res.status(200).json({ totalCount });
  } catch (err) {
    console.error('Error counting accounts:', err);
    res.status(500).json({ error: 'Could not count accounts', stack: err.stack });
  }
};


export const countByPending = async (req, res, next) => {
  try {
    const pendingCount = await Account.countDocuments({ Status: "Pending" });
    res.status(200).json({ pendingCount });
  } catch (err) {
    console.error('Error counting pending accounts:', err);
    res.status(500).json({ error: 'Could not count pending accounts', stack: err.stack });
  }
};

export const countByReview = async (req, res, next) => {
  try {
    const reviewCount = await Account.countDocuments({ Status: "Review" });
    res.status(200).json({ reviewCount });
  } catch (err) {
    console.error('Error counting review accounts:', err);
    res.status(500).json({ error: 'Could not count review accounts', stack: err.stack });
  }
};

export const getAccountByPriceAmount = async (req, res, next) => {
  try {
    const totalPriceAmount = await Account.aggregate([
      {
        $group: {
          _id: null,
          totalPriceAmount: { $sum: { $toDouble: "$paymentAmount" } }
        }
      }
    ]);
    res.status(200).json(totalPriceAmount[0]);
  } catch (err) {
    next(err);
  }
};

