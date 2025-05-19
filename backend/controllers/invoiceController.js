import Invoice from "../models/invoiceModel.js";
import Booking from "../models/bookingModel.js";
import BookingService from "../models/bookingServiceModel.js";
import Room from "../models/roomModel.js";
import Service from "../models/serviceModel.js";
import Customer from "../models/customerModel.js";

// Generate invoice number
const generateInvoiceNumber = () => {
  const date = new Date();
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const random = Math.floor(Math.random() * 10000)
    .toString()
    .padStart(4, "0");
  return `INV-${year}${month}-${random}`;
};

// Calculate total amount for a booking
const calculateBookingTotal = async (bookingId) => {
  const booking = await Booking.findByPk(bookingId, {
    include: [
      { model: Room },
      { model: BookingService, include: [{ model: Service }] },
    ],
  });

  if (!booking) return null;

  // Calculate room cost
  const checkIn = new Date(booking.checkInDate);
  const checkOut = new Date(booking.checkOutDate);
  const nights = Math.ceil((checkOut - checkIn) / (1000 * 60 * 60 * 24));
  const roomCost = booking.Room.price * nights;

  // Calculate services cost
  const servicesCost = booking.BookingServices.reduce(
    (total, bs) => total + bs.price * bs.quantity,
    0
  );

  const subtotal = roomCost + servicesCost;
  const tax = subtotal * 0.1; // 10% tax
  const total = subtotal + tax;

  return { subtotal, tax, total };
};

// Create a new invoice
export const createInvoice = async (req, res) => {
  try {
    const { bookingId, dueDate, paymentMethod, notes } = req.body;

    // Check if invoice already exists for this booking
    const existingInvoice = await Invoice.findOne({ where: { bookingId } });
    if (existingInvoice) {
      return res
        .status(400)
        .json({ message: "Invoice already exists for this booking" });
    }

    // Calculate totals
    const totals = await calculateBookingTotal(bookingId);
    if (!totals) {
      return res.status(404).json({ message: "Booking not found" });
    }

    const invoice = await Invoice.create({
      bookingId,
      invoiceNumber: generateInvoiceNumber(),
      issueDate: new Date(),
      dueDate,
      subtotal: totals.subtotal,
      tax: totals.tax,
      total: totals.total,
      paymentMethod,
      notes,
    });

    res.status(201).json(invoice);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all invoices
export const getInvoices = async (req, res) => {
  try {
    const invoices = await Invoice.findAll({
      include: [
        {
          model: Booking,
          include: [
            { model: Room },
            { model: BookingService, include: [{ model: Service }] },
            { model: Customer },
          ],
        },
      ],
      order: [["createdAt", "DESC"]],
    });
    res.json(invoices);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get invoice by ID
export const getInvoiceById = async (req, res) => {
  try {
    const { id } = req.params;
    const invoice = await Invoice.findByPk(id, {
      include: [
        {
          model: Booking,
          include: [
            { model: Room },
            { model: BookingService, include: [{ model: Service }] },
          ],
        },
      ],
    });

    if (!invoice) {
      return res.status(404).json({ message: "Invoice not found" });
    }

    res.json(invoice);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update invoice status
export const updateInvoiceStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const invoice = await Invoice.findByPk(id);
    if (!invoice) {
      return res.status(404).json({ message: "Invoice not found" });
    }

    await invoice.update({ status });
    res.json(invoice);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get invoice by booking ID
export const getInvoiceByBookingId = async (req, res) => {
  try {
    const { bookingId } = req.params;
    const invoice = await Invoice.findOne({
      where: { bookingId },
      include: [
        {
          model: Booking,
          include: [
            { model: Room },
            { model: BookingService, include: [{ model: Service }] },
          ],
        },
      ],
    });

    if (!invoice) {
      return res
        .status(404)
        .json({ message: "Invoice not found for this booking" });
    }

    res.json(invoice);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update invoice
export const updateInvoice = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    const invoice = await Invoice.findByPk(id);
    if (!invoice) {
      return res.status(404).json({ message: "Invoice not found" });
    }

    await invoice.update(updateData);
    res.json(invoice);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
