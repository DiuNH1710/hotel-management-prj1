import express from "express";
import {
  getBookings,
  getBookingById,
  createBooking,
  updateBookingStatus,
  deleteBooking,
} from "../controllers/bookingController.js";

const router = express.Router();

// Get all bookings
router.get("/", getBookings);

// Get booking by ID
router.get("/:id", getBookingById);

// Create new booking
router.post("/", createBooking);

// Update booking status
router.put("/:id/status", updateBookingStatus);

// Delete booking
router.delete("/:id", deleteBooking);

export default router;
