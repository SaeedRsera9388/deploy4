import express from 'express';
import { countSubscribes, createSubscribe, deleteSubscribe, getSubscribe, getSubscribes, updateSubscribe } from '../controllers/subscribe.js';

const router = express.Router();

router.get('/count', countSubscribes);
// Subscribe routes
router.post('/', createSubscribe);
router.delete('/:id', deleteSubscribe); // Changed parameter name to id
router.put('/:id', updateSubscribe);    // Changed parameter name to id
router.get('/:id', getSubscribe);       // Changed parameter name to id
router.get('/', getSubscribes);

export default router;
