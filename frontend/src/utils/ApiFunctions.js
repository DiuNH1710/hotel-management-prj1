import axios from "axios";

const API_BASE_URL = "http://localhost:5000/api";

// Booking Service API functions
export const getBookingServices = async (bookingId) => {
  try {
    const response = await axios.get(
      `${API_BASE_URL}/booking-services/booking/${bookingId}`
    );
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

export const addBookingService = async (bookingServiceData) => {
  try {
    const response = await axios.post(
      `${API_BASE_URL}/booking-services`,
      bookingServiceData
    );
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

export const updateBookingService = async (id, bookingServiceData) => {
  try {
    const response = await axios.put(
      `${API_BASE_URL}/booking-services/${id}`,
      bookingServiceData
    );
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

export const removeBookingService = async (id) => {
  try {
    const response = await axios.delete(
      `${API_BASE_URL}/booking-services/${id}`
    );
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

// Invoice API functions
export const createInvoice = async (invoiceData) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/invoices`, invoiceData);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

export const getInvoices = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/invoices`);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

export const getInvoiceById = async (id) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/invoices/${id}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

export const getInvoiceByBookingId = async (bookingId) => {
  try {
    const response = await axios.get(
      `${API_BASE_URL}/invoices/booking/${bookingId}`
    );
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

export const updateInvoice = async (id, invoiceData) => {
  try {
    const response = await axios.put(
      `${API_BASE_URL}/invoices/${id}`,
      invoiceData
    );
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

export const updateInvoiceStatus = async (id, status) => {
  try {
    const response = await axios.put(`${API_BASE_URL}/invoices/${id}/status`, {
      status,
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

// Room API functions
export const getRooms = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/rooms`);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

export const getRoomById = async (id) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/rooms/${id}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

export const addRoom = async (formData) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/rooms`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

export const updateRoom = async (id, formData) => {
  try {
    const response = await axios.put(`${API_BASE_URL}/rooms/${id}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

export const deleteRoom = async (id) => {
  try {
    const response = await axios.delete(`${API_BASE_URL}/rooms/${id}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

// Service API functions
export const getAllServices = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/services`);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

export const getServiceById = async (id) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/services/${id}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

export const addService = async (serviceData) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/services`, serviceData);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

export const updateService = async (id, serviceData) => {
  try {
    const response = await axios.put(
      `${API_BASE_URL}/services/${id}`,
      serviceData
    );
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

export const deleteService = async (id) => {
  try {
    const response = await axios.delete(`${API_BASE_URL}/services/${id}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

// Booking API functions
export const getAllBookings = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/bookings`);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

export const getBookingById = async (id) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/bookings/${id}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

export const addBooking = async (bookingData) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/bookings`, bookingData);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};
