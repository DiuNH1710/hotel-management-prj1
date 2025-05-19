import Room from "../models/roomModel.js";
import upload from "../middlewares/multer.js";
import path from "path";

// Lấy danh sách phòng
export const getAllRooms = async (req, res) => {
  try {
    const rooms = await Room.findAll();
    res.json(rooms);
  } catch (error) {
    console.error("Error fetching rooms:", error);
    res.status(500).json({ message: error.message });
  }
};

// Tạo phòng mới
export const addRoom = async (req, res) => {
  try {
    const { roomNumber, type, price, status, description } = req.body;
    const image = req.file ? path.basename(req.file.path) : null;

    // Validate required fields
    if (!roomNumber || !type || !price) {
      return res.status(400).json({
        message: "Room number, type, and price are required",
      });
    }

    // Validate room type
    const validTypes = ["Single", "Double", "Suite", "Deluxe"];
    if (!validTypes.includes(type)) {
      return res.status(400).json({
        message: `Invalid room type. Must be one of: ${validTypes.join(", ")}`,
      });
    }

    const room = await Room.create({
      roomNumber,
      type,
      price,
      status: status || "Available",
      description,
      image,
    });

    console.log("Room created successfully:", room);
    res.status(201).json(room);
  } catch (error) {
    console.error("Error creating room:", error);
    res.status(400).json({
      message: error.message,
      details: process.env.NODE_ENV === "development" ? error.stack : undefined,
    });
  }
};

// Cập nhật phòng theo ID
export const updateRoom = async (req, res) => {
  try {
    const { id } = req.params;
    const { roomNumber, type, price, status, description } = req.body;
    const image = req.file ? path.basename(req.file.path) : undefined;

    const room = await Room.findByPk(id);
    if (!room) {
      return res.status(404).json({ message: "Room not found" });
    }

    // Validate room type if provided
    if (type) {
      const validTypes = ["Single", "Double", "Suite", "Deluxe"];
      if (!validTypes.includes(type)) {
        return res.status(400).json({
          message: `Invalid room type. Must be one of: ${validTypes.join(
            ", "
          )}`,
        });
      }
    }

    const updateData = {
      roomNumber,
      type,
      price,
      status,
      description,
    };

    if (image) {
      updateData.image = image;
    }

    await room.update(updateData);
    res.json(room);
  } catch (error) {
    console.error("Error updating room:", error);
    res.status(400).json({
      message: error.message,
      details: process.env.NODE_ENV === "development" ? error.stack : undefined,
    });
  }
};

// Xóa phòng theo ID
export const deleteRoom = async (req, res) => {
  try {
    const { id } = req.params;
    const room = await Room.findByPk(id);
    if (!room) {
      return res.status(404).json({ message: "Room not found" });
    }
    await room.destroy();
    res.json({ message: "Room deleted successfully" });
  } catch (error) {
    console.error("Error deleting room:", error);
    res.status(500).json({ message: error.message });
  }
};
