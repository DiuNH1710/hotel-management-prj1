import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { updateCustomer, getAllCustomers } from "../utils/ApiFunctions";

const EditCustomer = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    idPassport: "",
  });
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCustomerData = async () => {
      try {
        const customers = await getAllCustomers();
        const customer = customers.find((c) => c.id === parseInt(id));
        if (customer) {
          setFormData({
            name: customer.name,
            email: customer.email,
            phone: customer.phone,
            idPassport: customer.idPassport,
          });
        }
        setLoading(false);
      } catch (error) {
        setMessage("Error fetching customer data: " + error.message);
        setLoading(false);
      }
    };

    fetchCustomerData();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateCustomer(id, formData);
      setMessage("Customer updated successfully!");
      setTimeout(() => {
        navigate("/customers");
      }, 2000);
    } catch (error) {
      setMessage("Failed to update customer: " + error.message);
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
    <div className="max-w-md mx-auto mt-10 bg-white p-6 rounded shadow">
      <h2 className="text-2xl font-semibold mb-4 text-center">Edit Customer</h2>
      {message && (
        <p
          className={`mb-3 ${
            message.includes("success") ? "text-green-500" : "text-red-500"
          }`}
        >
          {message}
        </p>
      )}
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block mb-1 font-medium">Name*</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full border px-3 py-2 rounded"
            placeholder="e.g. John Doe"
          />
        </div>

        <div className="mb-4">
          <label className="block mb-1 font-medium">Email*</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full border px-3 py-2 rounded"
            placeholder="e.g. john@example.com"
          />
        </div>

        <div className="mb-4">
          <label className="block mb-1 font-medium">Phone Number*</label>
          <input
            type="text"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            required
            className="w-full border px-3 py-2 rounded"
            placeholder="e.g. +1234567890"
          />
        </div>

        <div className="mb-4">
          <label className="block mb-1 font-medium">ID/Passport*</label>
          <input
            type="text"
            name="idPassport"
            value={formData.idPassport}
            onChange={handleChange}
            required
            className="w-full border px-3 py-2 rounded"
            placeholder="e.g. A12345678"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-purple-600 text-white py-2 rounded hover:bg-purple-700 transition"
        >
          Update Customer
        </button>
      </form>
    </div>
  );
};

export default EditCustomer;
