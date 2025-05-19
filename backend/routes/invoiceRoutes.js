import express from "express";
import {
  createInvoice,
  getInvoices,
  getInvoiceById,
  updateInvoiceStatus,
  getInvoiceByBookingId,
  updateInvoice,
} from "../controllers/invoiceController.js";

const router = express.Router();

router.post("/", createInvoice);
router.get("/", getInvoices);
router.get("/booking/:bookingId", getInvoiceByBookingId);
router.get("/:id", getInvoiceById);
router.put("/:id", updateInvoice);
router.put("/:id/status", updateInvoiceStatus);

export default router;
