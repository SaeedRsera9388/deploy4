import express from "express";
import { countByTickets, countByTicketsPending, countByTicketsReview, createTicket, deleteTicket, getAllTickets, getTicket, updateTicket } from "../controllers/ticket.js";

const router = express.Router();


// Count total tickets
router.get("/count", countByTickets);

router.get('/pendingCount', countByTicketsPending);
router.get('/reviewCount', countByTicketsReview);

// Create a new ticket
router.post("/", createTicket);

// Get all tickets
router.get("/", getAllTickets);

// Get a ticket by ID
router.get("/:id", getTicket);

// Update a ticket by ID
router.put("/:id", updateTicket);

// Delete a ticket by ID
router.delete("/:id", deleteTicket);

export default router;
