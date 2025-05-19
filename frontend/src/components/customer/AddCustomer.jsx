import React, { useState, useEffect } from "react";
import { addCustomer } from "../utils/ApiFunctions";
import { useNavigate } from "react-router-dom";

const AddCustomer = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [idPassport, setIdPassport] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => setMessage(""), 3000);
      return () => clearTimeout(timer);
    }
  }, [message]);

  const resetForm = () => {
    setName("");
    setEmail("");
    setPhone("");
    setIdPassport("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addCustomer(name, email, phone, idPassport);
      setMessage("Customer added successfully!");
      resetForm();
      // Redirect to customer list after 2 seconds
      setTimeout(() => {
        navigate("/customers");
      }, 2000);
    } catch (error) {
      setMessage("Failed to add customer: " + error.message);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 bg-white p-6 rounded shadow">
      <h2 className="text-2xl font-semibold mb-4 text-center">Add Customer</h2>
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
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="w-full border px-3 py-2 rounded"
            placeholder="e.g. John Doe"
          />
        </div>

        <div className="mb-4">
          <label className="block mb-1 font-medium">Email*</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full border px-3 py-2 rounded"
            placeholder="e.g. john@example.com"
          />
        </div>

        <div className="mb-4">
          <label className="block mb-1 font-medium">Phone Number*</label>
          <input
            type="text"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
            className="w-full border px-3 py-2 rounded"
            placeholder="e.g. +1234567890"
          />
        </div>

        <div className="mb-4">
          <label className="block mb-1 font-medium">ID/Passport*</label>
          <input
            type="text"
            value={idPassport}
            onChange={(e) => setIdPassport(e.target.value)}
            required
            className="w-full border px-3 py-2 rounded"
            placeholder="e.g. A12345678"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-purple-600 text-white py-2 rounded hover:bg-purple-700 transition"
        >
          Add Customer
        </button>
      </form>
    </div>
  );
};

export default AddCustomer;
