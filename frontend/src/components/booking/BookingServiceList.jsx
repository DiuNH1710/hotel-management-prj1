import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  getBookingServices,
  addBookingService,
  updateBookingService,
  removeBookingService,
  getAllServices,
  createInvoice,
  getBookingById,
  getInvoiceByBookingId,
  updateInvoice,
} from "../../utils/ApiFunctions";

const BookingServiceList = () => {
  const { bookingId } = useParams();
  const [bookingServices, setBookingServices] = useState([]);
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedService, setSelectedService] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [booking, setBooking] = useState(null);

  useEffect(() => {
    fetchBookingServices();
    fetchServices();
    fetchBooking();
  }, [bookingId]);

  const fetchBooking = async () => {
    try {
      const data = await getBookingById(bookingId);
      setBooking(data);
    } catch (error) {
      setError("Failed to fetch booking: " + error.message);
    }
  };

  const calculateInvoice = async () => {
    try {
      if (!booking || !booking.Room) {
        throw new Error("Booking information is not available");
      }

      // Calculate room cost
      const roomCost =
        booking.Room.price *
        getDaysBetweenDates(booking.checkInDate, booking.checkOutDate);

      // Calculate services cost
      const servicesCost = bookingServices.reduce((total, bs) => {
        return total + bs.Service.price * bs.quantity;
      }, 0);

      const subtotal = roomCost + servicesCost;
      const tax = subtotal * 0.1; // 10% tax
      const total = subtotal + tax;

      // Prepare invoice data
      const invoiceData = {
        bookingId: parseInt(bookingId),
        issueDate: new Date(),
        dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days from now
        subtotal,
        tax,
        total,
        status: "Pending",
      };

      try {
        // Try to get existing invoice
        const existingInvoice = await getInvoiceByBookingId(bookingId);
        if (existingInvoice) {
          // Update existing invoice
          await updateInvoice(existingInvoice.id, invoiceData);
        } else {
          // Create new invoice
          await createInvoice(invoiceData);
        }
      } catch (error) {
        const errorMessage = error.message || error.toString();
        if (errorMessage.includes("not found")) {
          // If no invoice found, create new one
          await createInvoice(invoiceData);
        } else {
          throw error;
        }
      }
    } catch (error) {
      setError("Failed to update invoice: " + error.message);
    }
  };

  const getDaysBetweenDates = (startDate, endDate) => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const diffTime = Math.abs(end - start);
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  };

  const fetchServices = async () => {
    try {
      const data = await getAllServices();
      setServices(data);
    } catch (error) {
      setError("Failed to fetch services: " + error.message);
    }
  };

  const fetchBookingServices = async () => {
    try {
      const data = await getBookingServices(bookingId);
      setBookingServices(data);
      setLoading(false);
    } catch (error) {
      setError("Failed to fetch booking services: " + error.message);
      setLoading(false);
    }
  };

  const handleAddService = async (e) => {
    e.preventDefault();
    try {
      await addBookingService({
        bookingId: parseInt(bookingId),
        serviceId: parseInt(selectedService),
        quantity: parseInt(quantity),
      });
      await fetchBookingServices();
      await calculateInvoice();
      setSelectedService("");
      setQuantity(1);
    } catch (error) {
      setError("Failed to add service: " + error.message);
    }
  };

  const handleUpdateQuantity = async (id, newQuantity) => {
    try {
      await updateBookingService(id, { quantity: newQuantity });
      await fetchBookingServices();
      await calculateInvoice();
    } catch (error) {
      setError("Failed to update quantity: " + error.message);
    }
  };

  const handleRemoveService = async (id) => {
    if (window.confirm("Are you sure you want to remove this service?")) {
      try {
        await removeBookingService(id);
        await fetchBookingServices();
        await calculateInvoice();
      } catch (error) {
        setError("Failed to remove service: " + error.message);
      }
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-600"></div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h3 className="text-lg font-semibold mb-4">Additional Services</h3>
      {error && <p className="text-red-500 mb-4">{error}</p>}

      <form onSubmit={handleAddService} className="mb-6">
        <div className="flex gap-4">
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Service
            </label>
            <select
              value={selectedService}
              onChange={(e) => setSelectedService(e.target.value)}
              className="w-full border rounded px-3 py-2"
              required
            >
              <option value="">Select a service</option>
              {services.map((service) => (
                <option key={service.id} value={service.id}>
                  {service.name} - ${service.price}
                </option>
              ))}
            </select>
          </div>
          <div className="w-32">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Quantity
            </label>
            <input
              type="number"
              min="1"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              className="w-full border rounded px-3 py-2"
              required
            />
          </div>
          <div className="flex items-end">
            <button
              type="submit"
              className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700 transition"
            >
              Add Service
            </button>
          </div>
        </div>
      </form>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Service
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Price
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Quantity
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Total
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {bookingServices.map((bs) => (
              <tr key={bs.id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">
                    {bs.Service.name}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">
                    ${bs.Service.price}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <input
                    type="number"
                    min="1"
                    value={bs.quantity}
                    onChange={(e) =>
                      handleUpdateQuantity(bs.id, parseInt(e.target.value))
                    }
                    className="w-20 border rounded px-2 py-1"
                  />
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">
                    ${(bs.Service.price * bs.quantity).toFixed(2)}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <button
                    onClick={() => handleRemoveService(bs.id)}
                    className="text-red-600 hover:text-red-900"
                  >
                    Remove
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default BookingServiceList;
