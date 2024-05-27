import express from 'express';
import {
  createClient,
  getAllClients,
  getClient,
  updateClient,
  deleteClient,
  countByClient, 
  getClientByTotalPrice,
  countByPendingForClient,
  countByReviewForClient
} from '../controllers/client.js';

const router = express.Router();

router.get('/countByClient', countByClient);

router.get('/totalPriceAmount', getClientByTotalPrice);

router.get('/pendingCount', countByPendingForClient);

router.get('/reviewCount', countByReviewForClient);


router.post('/', createClient);
router.get('/', getAllClients);
router.get('/:id', getClient);
router.put('/:id', updateClient);
router.delete('/:id', deleteClient);


export default router;
