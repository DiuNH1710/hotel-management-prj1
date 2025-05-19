import axios from "axios";

const API_BASE_URL = "http://localhost:5000/api";

// Customer API functions
export const addCustomer = async (name, email, phone, idPassport) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/customers`, {
      name,
      email,
      phone,
      idPassport,
    });
    return response.data;
  } catch (error) {
    console.error("Error adding customer:", error);
    throw error;
  }
};

export const getAllCustomers = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/customers`);
    return response.data;
  } catch (error) {
    console.error("Error fetching customers:", error);
    throw error;
  }
};

export const deleteCustomer = async (id) => {
  try {
    const response = await axios.delete(`${API_BASE_URL}/customers/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting customer:", error);
    throw error;
  }
};

export const updateCustomer = async (id, customerData) => {
  try {
    const response = await axios.put(
      `${API_BASE_URL}/customers/${id}`,
      customerData
    );
    return response.data;
  } catch (error) {
    console.error("Error updating customer:", error);
    throw error;
  }
};

// Room API functions
export const addRoom = async (
  roomNumber,
  roomType,
  price,
  status,
  description,
  image
) => {
  try {
    const formData = new FormData();
    formData.append("roomNumber", roomNumber);
    formData.append("roomType", roomType);
    formData.append("price", price);
    formData.append("status", status);
    formData.append("description", description);
    if (image) {
      formData.append("image", image);
    }

    const response = await axios.post(`${API_BASE_URL}/rooms`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error adding room:", error);
    throw error;
  }
};

export const getAllRooms = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/rooms`);
    return response.data;
  } catch (error) {
    console.error("Error fetching rooms:", error);
    throw error;
  }
};

export const deleteRoom = async (id) => {
  try {
    const response = await axios.delete(`${API_BASE_URL}/rooms/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting room:", error);
    throw error;
  }
};

export const getRoomById = async (id) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/rooms/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching room:", error);
    throw error;
  }
};

export const updateRoom = async (id, roomData) => {
  try {
    const formData = new FormData();
    Object.keys(roomData).forEach((key) => {
      if (key === "image" && roomData[key] instanceof File) {
        formData.append(key, roomData[key]);
      } else {
        formData.append(key, roomData[key]);
      }
    });

    const response = await axios.put(`${API_BASE_URL}/rooms/${id}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error updating room:", error);
    throw error;
  }
};

// Employee API functions
export const addEmployee = async (employeeData) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/employees`, {
      name: employeeData.name,
      position: employeeData.position,
      email: employeeData.email,
      phone: employeeData.phone,
      salary: employeeData.salary,
    });
    return response.data;
  } catch (error) {
    console.error("Error adding employee:", error);
    throw error;
  }
};

export const getAllEmployees = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/employees`);
    return response.data;
  } catch (error) {
    console.error("Error fetching employees:", error);
    throw error;
  }
};

export const deleteEmployee = async (id) => {
  try {
    const response = await axios.delete(`${API_BASE_URL}/employees/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting employee:", error);
    throw error;
  }
};

export const updateEmployee = async (id, employeeData) => {
  try {
    const response = await axios.put(
      `${API_BASE_URL}/employees/${id}`,
      employeeData
    );
    return response.data;
  } catch (error) {
    console.error("Error updating employee:", error);
    throw error;
  }
};

// Service API functions
export const addService = async (serviceData) => {
  try {
    console.log("API function received data:", serviceData); // Debug log
    const response = await axios.post(`${API_BASE_URL}/services`, {
      name: serviceData.name,
      price: serviceData.price,
      description: serviceData.description || "",
    });
    return response.data;
  } catch (error) {
    console.error("Error adding service:", error);
    throw error;
  }
};

export const getAllServices = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/services`);
    return response.data;
  } catch (error) {
    console.error("Error fetching services:", error);
    throw error;
  }
};

export const deleteService = async (id) => {
  try {
    const response = await axios.delete(`${API_BASE_URL}/services/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting service:", error);
    throw error;
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
    console.error("Error updating service:", error);
    throw error;
  }
};

// Booking API functions
export const getAllBookings = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/bookings`);
    return response.data;
  } catch (error) {
    console.error("Error fetching bookings:", error);
    throw error;
  }
};

export const getBookingById = async (id) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/bookings/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching booking:", error);
    throw error;
  }
};

export const createBooking = async (bookingData) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/bookings`, bookingData);
    return response.data;
  } catch (error) {
    console.error("Error creating booking:", error);
    throw error;
  }
};

export const updateBookingStatus = async (id, status) => {
  try {
    const response = await axios.put(`${API_BASE_URL}/bookings/${id}/status`, {
      status,
    });
    return response.data;
  } catch (error) {
    console.error("Error updating booking status:", error);
    throw error;
  }
};

export const deleteBooking = async (id) => {
  try {
    const response = await axios.delete(`${API_BASE_URL}/bookings/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting booking:", error);
    throw error;
  }
};
