import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getAllRooms, deleteRoom } from "../utils/ApiFunctions";

const RoomList = () => {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchRooms();
  }, []);

  const fetchRooms = async () => {
    try {
      const data = await getAllRooms();
      console.log("Rooms data:", data); // Debug log
      setRooms(data);
      setLoading(false);
    } catch (error) {
      setError("Failed to fetch rooms: " + error.message);
      setLoading(false);
    }
  };

  const handleDelete = async (roomId) => {
    if (window.confirm("Are you sure you want to delete this room?")) {
      try {
        await deleteRoom(roomId);
        // Refresh the room list after deletion
        fetchRooms();
      } catch (error) {
        setError("Failed to delete room: " + error.message);
      }
    }
  };

  const getImageUrl = (imageData) => {
    if (!imageData) return null;

    // Log the image data to see its structure
    console.log("Image data structure:", imageData);

    // If imageData is a string (path)
    if (typeof imageData === "string") {
      return `http://localhost:5000/uploads/${imageData}`;
    }

    // If imageData is a Buffer
    if (imageData.type === "Buffer" && Array.isArray(imageData.data)) {
      try {
        const imagePath = String.fromCharCode.apply(null, imageData.data);
        console.log("Decoded image path:", imagePath);
        return `http://localhost:5000/uploads/${imagePath}`;
      } catch (error) {
        console.error("Error decoding image path:", error);
        return null;
      }
    }

    return null;
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-red-500 text-center mt-4">
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold">Room List</h2>
        <Link
          to="/add-room"
          className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700 transition"
        >
          Add New Room
        </Link>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Image
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Room Number
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Type
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Price
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {rooms.map((room) => {
              console.log("Room data:", room); // Debug log for each room
              const imageUrl = getImageUrl(room.image);
              console.log("Processed image URL:", imageUrl); // Debug log for processed image URL

              return (
                <tr key={room.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {room.image ? (
                      <img
                        src={imageUrl}
                        alt={`Room ${room.roomNumber}`}
                        className="h-16 w-16 object-cover rounded"
                        onError={(e) => {
                          console.log("Image error for room:", room.id);
                          console.log("Failed image URL:", imageUrl);
                          e.target.style.display = "none";
                          e.target.parentElement.innerHTML = `
                            <div class="h-16 w-16 bg-gray-200 rounded flex items-center justify-center">
                              <span class="text-gray-400">No image</span>
                            </div>
                          `;
                        }}
                      />
                    ) : (
                      <div className="h-16 w-16 bg-gray-200 rounded flex items-center justify-center">
                        <span className="text-gray-400">No image</span>
                      </div>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {room.roomNumber}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">{room.type}</td>
                  <td className="px-6 py-4 whitespace-nowrap">${room.price}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        room.status === "Available"
                          ? "bg-green-100 text-green-800"
                          : room.status === "Occupied"
                          ? "bg-red-100 text-red-800"
                          : "bg-yellow-100 text-yellow-800"
                      }`}
                    >
                      {room.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex space-x-2">
                      <Link
                        to={`/edit-room/${room.id}`}
                        className="text-indigo-600 hover:text-indigo-900"
                      >
                        Edit
                      </Link>
                      <button
                        onClick={() => handleDelete(room.id)}
                        className="text-red-600 hover:text-red-900"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RoomList;
