import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { createBooking } from "../utils/ApiFunctions";
import { getAllCustomers } from "../utils/ApiFunctions";
import { getAllRooms } from "../utils/ApiFunctions";
import { getAllServices } from "../utils/ApiFunctions";

const AddBooking = () => {
  const navigate = useNavigate();
  const [customers, setCustomers] = useState([]);
  const [rooms, setRooms] = useState([]);
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showCustomerModal, setShowCustomerModal] = useState(false);
  const [showRoomModal, setShowRoomModal] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [selectedRoom, setSelectedRoom] = useState(null);

  const [formData, setFormData] = useState({
    customerId: "",
    roomId: "",
    checkInDate: "",
    checkOutDate: "",
    services: [],
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [customersData, roomsData, servicesData] = await Promise.all([
          getAllCustomers(),
          getAllRooms(),
          getAllServices(),
        ]);

        setCustomers(customersData);
        setRooms(roomsData.filter((room) => room.status === "Available"));
        setServices(servicesData);
        setLoading(false);
      } catch (error) {
        setError("Failed to fetch data: " + error.message);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleServiceChange = (serviceId) => {
    setFormData((prev) => {
      const currentServices = [...prev.services];
      const serviceIndex = currentServices.indexOf(serviceId);

      if (serviceIndex === -1) {
        currentServices.push(serviceId);
      } else {
        currentServices.splice(serviceIndex, 1);
      }

      return {
        ...prev,
        services: currentServices,
      };
    });
  };

  const handleCustomerSelect = (customer) => {
    setSelectedCustomer(customer);
    setFormData((prev) => ({
      ...prev,
      customerId: customer.id,
    }));
    setShowCustomerModal(false);
  };

  const handleRoomSelect = (room) => {
    setSelectedRoom(room);
    setFormData((prev) => ({
      ...prev,
      roomId: room.id,
    }));
    setShowRoomModal(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      await createBooking(formData);
      navigate("/bookings");
    } catch (error) {
      setError("Failed to create booking: " + error.message);
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
    <div className="max-w-2xl mx-auto mt-10 bg-white p-6 rounded shadow">
      <h2 className="text-2xl font-semibold mb-4 text-center">
        Add New Booking
      </h2>
      {error && <p className="text-red-500 mb-3">{error}</p>}
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block mb-1 font-medium">Customer*</label>
          <div className="flex gap-2">
            <input
              type="text"
              value={
                selectedCustomer
                  ? `${selectedCustomer.name} - ${selectedCustomer.email}`
                  : ""
              }
              readOnly
              className="flex-1 border px-3 py-2 rounded bg-gray-50"
              placeholder="Select a customer"
            />
            <button
              type="button"
              onClick={() => setShowCustomerModal(true)}
              className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700"
            >
              Select Customer
            </button>
          </div>
        </div>

        <div className="mb-4">
          <label className="block mb-1 font-medium">Room*</label>
          <div className="flex gap-2">
            <input
              type="text"
              value={
                selectedRoom
                  ? `Room ${selectedRoom.roomNumber} - ${selectedRoom.type} ($${selectedRoom.price}/night)`
                  : ""
              }
              readOnly
              className="flex-1 border px-3 py-2 rounded bg-gray-50"
              placeholder="Select a room"
            />
            <button
              type="button"
              onClick={() => setShowRoomModal(true)}
              className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700"
            >
              Select Room
            </button>
          </div>
        </div>

        <div className="mb-4">
          <label className="block mb-1 font-medium">Check-in Date*</label>
          <input
            type="date"
            name="checkInDate"
            value={formData.checkInDate}
            onChange={handleChange}
            required
            min={new Date().toISOString().split("T")[0]}
            className="w-full border px-3 py-2 rounded"
          />
        </div>

        <div className="mb-4">
          <label className="block mb-1 font-medium">Check-out Date*</label>
          <input
            type="date"
            name="checkOutDate"
            value={formData.checkOutDate}
            onChange={handleChange}
            required
            min={formData.checkInDate || new Date().toISOString().split("T")[0]}
            className="w-full border px-3 py-2 rounded"
          />
        </div>

        <div className="mb-4">
          <label className="block mb-1 font-medium">Additional Services</label>
          <div className="border rounded p-4 max-h-60 overflow-y-auto">
            {services.map((service) => (
              <div key={service.id} className="flex items-center mb-2">
                <input
                  type="checkbox"
                  id={`service-${service.id}`}
                  checked={formData.services.includes(service.id)}
                  onChange={() => handleServiceChange(service.id)}
                  className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded"
                />
                <label
                  htmlFor={`service-${service.id}`}
                  className="ml-2 block text-sm text-gray-900"
                >
                  {service.name} - ${service.price}
                </label>
              </div>
            ))}
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-purple-600 text-white py-2 rounded hover:bg-purple-700 transition"
        >
          Create Booking
        </button>
      </form>

      {/* Customer Selection Modal */}
      {showCustomerModal && (
        <div className="fixed inset-0 bg-white/30 backdrop-blur-[2px] flex items-center justify-center p-4 z-50">
          <div className="bg-white/95 backdrop-blur-sm rounded-lg p-6 w-full max-w-4xl max-h-[80vh] overflow-y-auto shadow-xl">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold">Select Customer</h3>
              <button
                onClick={() => setShowCustomerModal(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                ✕
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200 border border-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b border-gray-200">
                      Select
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b border-gray-200">
                      Name
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b border-gray-200">
                      Email
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b border-gray-200">
                      Phone
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {customers.map((customer) => (
                    <tr key={customer.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap border-b border-gray-200">
                        <button
                          onClick={() => handleCustomerSelect(customer)}
                          className="bg-purple-600 text-white px-3 py-1 rounded hover:bg-purple-700"
                        >
                          Select
                        </button>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap border-b border-gray-200">
                        {customer.name}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap border-b border-gray-200">
                        {customer.email}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap border-b border-gray-200">
                        {customer.phone}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Room Selection Modal */}
      {showRoomModal && (
        <div className="fixed inset-0 bg-white/30 backdrop-blur-[2px] flex items-center justify-center p-4 z-50">
          <div className="bg-white/95 backdrop-blur-sm rounded-lg p-6 w-full max-w-4xl max-h-[80vh] overflow-y-auto shadow-xl">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold">Select Room</h3>
              <button
                onClick={() => setShowRoomModal(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                ✕
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200 border border-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b border-gray-200">
                      Select
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b border-gray-200">
                      Room Number
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b border-gray-200">
                      Type
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b border-gray-200">
                      Price/Night
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b border-gray-200">
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {rooms.map((room) => (
                    <tr key={room.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap border-b border-gray-200">
                        <button
                          onClick={() => handleRoomSelect(room)}
                          className="bg-purple-600 text-white px-3 py-1 rounded hover:bg-purple-700"
                        >
                          Select
                        </button>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap border-b border-gray-200">
                        {room.roomNumber}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap border-b border-gray-200">
                        {room.type}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap border-b border-gray-200">
                        ${room.price}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap border-b border-gray-200">
                        {room.status}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddBooking;
