import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { updateService, getServiceById } from "../../utils/ApiFunctions";

const EditService = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    description: "",
  });
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchServiceData = async () => {
      try {
        const service = await getServiceById(id);
        if (service) {
          setFormData({
            name: service.name,
            price: service.price,
            description: service.description,
          });
        }
        setLoading(false);
      } catch (error) {
        setMessage("Error fetching service data: " + error.message);
        setLoading(false);
      }
    };

    fetchServiceData();
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
      await updateService(id, formData);
      setMessage("Service updated successfully!");
      setTimeout(() => {
        navigate("/services");
      }, 2000);
    } catch (error) {
      setMessage("Failed to update service: " + error.message);
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
      <h2 className="text-2xl font-semibold mb-4 text-center">Edit Service</h2>
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
          <label className="block mb-1 font-medium">Service Name*</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full border px-3 py-2 rounded"
            placeholder="e.g. Room Cleaning"
          />
        </div>

        <div className="mb-4">
          <label className="block mb-1 font-medium">Price*</label>
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            required
            className="w-full border px-3 py-2 rounded"
            placeholder="e.g. 50"
          />
        </div>

        <div className="mb-4">
          <label className="block mb-1 font-medium">Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
            rows="3"
            placeholder="Enter service description"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-purple-600 text-white py-2 rounded hover:bg-purple-700 transition"
        >
          Update Service
        </button>
      </form>
    </div>
  );
};

export default EditService;
