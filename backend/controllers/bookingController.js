import Booking from "../models/bookingModel.js";
import Customer from "../models/customerModel.js";
import Room from "../models/roomModel.js";
import BookingService from "../models/bookingServiceModel.js";
import Service from "../models/serviceModel.js";

// Get all bookings with related data
export const getBookings = async (req, res) => {
  try {
    console.log("Fetching bookings...");
    const bookings = await Booking.findAll({
      include: [
        {
          model: Customer,
          attributes: ["id", "name", "email", "phone"],
        },
        {
          model: Room,
          attributes: ["id", "roomNumber", "type", "price", "status"],
        },
        {
          model: BookingService,
          include: [
            {
              model: Service,
              attributes: ["id", "name", "price", "status"],
            },
          ],
        },
      ],
    });
    console.log("Bookings fetched successfully:", bookings.length);
    res.json(bookings);
  } catch (error) {
    console.error("Error details:", {
      message: error.message,
      stack: error.stack,
      name: error.name,
    });
    res.status(500).json({
      message: "Error fetching bookings",
      error: error.message,
      details: process.env.NODE_ENV === "development" ? error.stack : undefined,
    });
  }
};

// Get booking by ID
export const getBookingById = async (req, res) => {
  try {
    const { id } = req.params;
    const booking = await Booking.findByPk(id, {
      include: [
        { model: Customer },
        { model: Room },
        {
          model: BookingService,
          include: [{ model: Service }],
        },
      ],
    });

    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    res.json(booking);
  } catch (error) {
    console.error("Error fetching booking:", error);
    res.status(500).json({ message: error.message });
  }
};

// Create new booking
export const createBooking = async (req, res) => {
  try {
    const { customerId, roomId, checkInDate, checkOutDate, services } =
      req.body;

    // Validate required fields
    if (!customerId || !roomId || !checkInDate || !checkOutDate) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Check if room is available
    const room = await Room.findByPk(roomId);
    if (!room) {
      return res.status(404).json({ message: "Room not found" });
    }
    if (room.status !== "Available") {
      return res.status(400).json({ message: "Room is not available" });
    }

    // Create booking
    const booking = await Booking.create({
      customerId,
      roomId,
      checkInDate,
      checkOutDate,
    });

    // Add services if provided
    if (services && services.length > 0) {
      for (const service of services) {
        const serviceRecord = await Service.findByPk(service.id);
        if (serviceRecord) {
          await BookingService.create({
            bookingId: booking.id,
            serviceId: service.id,
            quantity: service.quantity || 1,
            price: serviceRecord.price,
          });
        }
      }
    }

    // Update room status
    await room.update({ status: "Occupied" });

    // Fetch the complete booking with all relations
    const completeBooking = await Booking.findByPk(booking.id, {
      include: [
        { model: Customer },
        { model: Room },
        {
          model: BookingService,
          include: [{ model: Service }],
        },
      ],
    });

    res.status(201).json(completeBooking);
  } catch (error) {
    console.error("Error creating booking:", error);
    res.status(500).json({ message: error.message });
  }
};

// Update booking status
export const updateBookingStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const booking = await Booking.findByPk(id, {
      include: [{ model: Room }],
    });

    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    await booking.update({ status });

    // Update room status based on booking status
    if (status === "Completed" || status === "Cancelled") {
      await booking.Room.update({ status: "Available" });
    }

    res.json(booking);
  } catch (error) {
    console.error("Error updating booking:", error);
    res.status(500).json({ message: error.message });
  }
};

// Delete booking
export const deleteBooking = async (req, res) => {
  try {
    const { id } = req.params;
    const booking = await Booking.findByPk(id, {
      include: [{ model: Room }],
    });

    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    // Update room status to Available
    await booking.Room.update({ status: "Available" });

    // Delete associated booking services
    await BookingService.destroy({ where: { bookingId: id } });

    // Delete the booking
    await booking.destroy();

    res.json({ message: "Booking deleted successfully" });
  } catch (error) {
    console.error("Error deleting booking:", error);
    res.status(500).json({ message: error.message });
  }
};
