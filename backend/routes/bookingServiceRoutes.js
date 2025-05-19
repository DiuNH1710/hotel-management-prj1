import express from "express";
import {
  getBookingServices,
  addBookingService,
  updateBookingService,
  removeBookingService,
} from "../controllers/bookingServiceController.js";

const router = express.Router();

router.get("/booking/:bookingId", getBookingServices);
router.post("/", addBookingService);
router.put("/:id", updateBookingService);
router.delete("/:id", removeBookingService);

export default router;
