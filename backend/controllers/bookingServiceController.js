import BookingService from "../models/bookingServiceModel.js";
import Service from "../models/serviceModel.js";

// Get all services for a booking
export const getBookingServices = async (req, res) => {
  try {
    const { bookingId } = req.params;
    const bookingServices = await BookingService.findAll({
      where: { bookingId },
      include: [{ model: Service }],
    });
    res.json(bookingServices);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Add a service to a booking
export const addBookingService = async (req, res) => {
  try {
    const { bookingId, serviceId, quantity } = req.body;

    // Get service price
    const service = await Service.findByPk(serviceId);
    if (!service) {
      return res.status(404).json({ message: "Service not found" });
    }

    const bookingService = await BookingService.create({
      bookingId,
      serviceId,
      quantity,
      price: service.price,
    });

    res.status(201).json(bookingService);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update a booking service
export const updateBookingService = async (req, res) => {
  try {
    const { id } = req.params;
    const { quantity } = req.body;

    const bookingService = await BookingService.findByPk(id);
    if (!bookingService) {
      return res.status(404).json({ message: "Booking service not found" });
    }

    await bookingService.update({ quantity });
    res.json(bookingService);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Remove a service from a booking
export const removeBookingService = async (req, res) => {
  try {
    const { id } = req.params;
    const bookingService = await BookingService.findByPk(id);

    if (!bookingService) {
      return res.status(404).json({ message: "Booking service not found" });
    }

    await bookingService.destroy();
    res.json({ message: "Service removed from booking" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
