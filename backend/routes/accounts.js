import express from 'express';
import {
  createAccount,
  getAllAccounts,
  getAccountByID,
  updateAccount,
  deleteAccount,
  countByAccount,
  getAccountByPriceAmount,
  countByPending,
  countByReview,
} from '../controllers/account.js';

const router = express.Router();



router.get('/pendingCount', countByPending);
router.get('/reviewCount', countByReview);

// Create a new account
router.post('/', createAccount);

// Get all accounts
router.get('/', getAllAccounts);

router.get('/totalPriceAmount', getAccountByPriceAmount);
// Get an account by ID
router.get('/:id', getAccountByID);

// Update an account by ID
router.put('/:id', updateAccount);

// Delete an account by ID
router.delete('/:id', deleteAccount);

// Count total number of accounts
router.get('/count', countByAccount);

export default router;
