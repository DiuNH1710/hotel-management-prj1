import React, { useState } from "react";
import { addService } from "../utils/ApiFunctions";

const AddService = () => {
  const [serviceName, setServiceName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess(false);

    if (!serviceName || !price) {
      setError("Please fill in all required fields.");
      return;
    }

    const serviceData = {
      name: serviceName.trim(),
      price: parseFloat(price),
      description: description.trim() || null,
    };

    console.log("Sending service data:", serviceData);

    try {
      const result = await addService(serviceData);
      console.log("Server response:", result);

      if (result) {
        setSuccess(true);
        setServiceName("");
        setPrice("");
        setDescription("");
      }
    } catch (error) {
      console.error("Full error object:", error);
      console.error("Error response data:", error.response?.data);
      setError(
        error.response?.data?.message ||
          error.message ||
          "Failed to add service."
      );
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 bg-white p-6 rounded shadow">
      <h2 className="text-2xl font-semibold mb-4 text-center">Add Service</h2>
      {error && <p className="text-red-500 mb-3">{error}</p>}
      {success && (
        <p className="text-green-500 mb-3">Service added successfully!</p>
      )}
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block mb-1 font-medium">Service Name*</label>
          <input
            type="text"
            value={serviceName}
            onChange={(e) => setServiceName(e.target.value)}
            className="w-full border px-3 py-2 rounded"
            placeholder="e.g. Laundry"
          />
        </div>
        <div className="mb-4">
          <label className="block mb-1 font-medium">Price*</label>
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="w-full border px-3 py-2 rounded"
            placeholder="e.g. 100.00"
          />
        </div>
        <div className="mb-4">
          <label className="block mb-1 font-medium">Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full border px-3 py-2 rounded"
            placeholder="Additional details about the service"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-purple-600 text-white py-2 rounded hover:bg-purple-700 transition"
        >
          Add Service
        </button>
      </form>
    </div>
  );
};

export default AddService;
