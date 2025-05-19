import React, { useState, useEffect } from "react";
import { addRoom } from "../../utils/ApiFunctions";

const AddRoom = () => {
  const [roomNumber, setRoomNumber] = useState("");
  const [type, setType] = useState("");
  const [price, setPrice] = useState("");
  const [status, setStatus] = useState("Available");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => setMessage(""), 3000);
      return () => clearTimeout(timer);
    }
  }, [message]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
    setImagePreview(URL.createObjectURL(file));
  };

  const resetForm = () => {
    setRoomNumber("");
    setType("");
    setPrice("");
    setStatus("Available");
    setDescription("");
    setImage(null);
    setImagePreview(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("roomNumber", roomNumber);
      formData.append("type", type);
      formData.append("price", price);
      formData.append("status", status);
      formData.append("description", description);
      if (image) {
        formData.append("image", image);
      }

      const response = await addRoom(formData);
      setMessage("Room added successfully!");
      resetForm();
    } catch (error) {
      setMessage(error.message || "Failed to add room.");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 bg-white p-6 rounded shadow">
      <h2 className="text-2xl font-semibold mb-4 text-center">Add Room</h2>
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
          <label className="block mb-1 font-medium">Room Number*</label>
          <input
            type="text"
            value={roomNumber}
            onChange={(e) => setRoomNumber(e.target.value)}
            required
            className="w-full border px-3 py-2 rounded"
            placeholder="e.g. 101"
          />
        </div>

        <div className="mb-4">
          <label className="block mb-1 font-medium">Room Type*</label>
          <select
            value={type}
            onChange={(e) => setType(e.target.value)}
            required
            className="w-full border px-3 py-2 rounded"
          >
            <option value="">Select a room type</option>
            <option value="Single">Single</option>
            <option value="Double">Double</option>
            <option value="Suite">Suite</option>
            <option value="Deluxe">Deluxe</option>
          </select>
        </div>

        <div className="mb-4">
          <label className="block mb-1 font-medium">Price ($)*</label>
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
            className="w-full border px-3 py-2 rounded"
            placeholder="e.g. 100.00"
          />
        </div>

        <div className="mb-4">
          <label className="block mb-1 font-medium">Status</label>
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="w-full border px-3 py-2 rounded"
          >
            <option value="Available">Available</option>
            <option value="Occupied">Occupied</option>
            <option value="Maintenance">Maintenance</option>
          </select>
        </div>

        <div className="mb-4">
          <label className="block mb-1 font-medium">Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={3}
            className="w-full border px-3 py-2 rounded"
            placeholder="Additional details about the room"
          />
        </div>

        <div className="mb-4">
          <label className="block mb-1 font-medium">Room Image</label>
          <input
            type="file"
            id="roomImage"
            onChange={handleImageChange}
            className="hidden"
          />
          <label
            htmlFor="roomImage"
            className="inline-block cursor-pointer px-4 py-2 bg-purple-600 text-white text-sm rounded hover:bg-purple-700 transition"
          >
            Choose Image
          </label>
          {image && <p className="mt-2 text-sm text-gray-600">{image.name}</p>}
        </div>

        {imagePreview && (
          <div className="mb-4">
            <img
              src={imagePreview}
              alt="Preview"
              className="w-full h-48 object-cover rounded"
            />
          </div>
        )}

        <button
          type="submit"
          className="w-full bg-purple-600 text-white py-2 rounded hover:bg-purple-700 transition"
        >
          Add Room
        </button>
      </form>
    </div>
  );
};

export default AddRoom;
