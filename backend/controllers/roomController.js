import Room from "../models/roomModel.js";
import upload from "../middlewares/multer.js";
import path from "path";
import fs from "fs";

// get all rooms
export const getAllRooms = async (req, res) => {
  try {
    const rooms = await Room.findAll();
    res.json(rooms);
  } catch (error) {
    console.error("Error fetching rooms:", error);
    res.status(500).json({ message: error.message });
  }
};

// get room by ID
export const getRoomById = async (req, res) => {
  try {
    const { id } = req.params;
    const room = await Room.findByPk(id);
    if (!room) {
      return res.status(404).json({ message: "Room not found" });
    }
    res.json(room);
  } catch (error) {
    console.error("Error fetching room:", error);
    res.status(500).json({ message: error.message });
  }
};

// create a new room
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

// update room by ID
export const updateRoom = async (req, res) => {
  try {
    const { id } = req.params;
    const { roomNumber, type, price, status, description } = req.body;
    const image = req.file ? path.basename(req.file.path) : undefined;

    console.log("Received update request:", {
      id,
      body: req.body,
      file: req.file
        ? {
            filename: req.file.filename,
            path: req.file.path,
            mimetype: req.file.mimetype,
          }
        : null,
    });

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

    // update only the fields that are provided
    const updateData = {
      roomNumber: roomNumber || room.roomNumber,
      type: type || room.type,
      price: price || room.price,
      status: status || room.status,
      description: description || room.description,
    };

    // If an image is provided, update the image field
    if (image) {
      updateData.image = image;
    }

    console.log("Updating room with data:", updateData);

    await room.update(updateData);
    console.log("Room updated successfully:", room.toJSON());
    res.json(room);
  } catch (error) {
    console.error("Error updating room:", error);
    res.status(400).json({
      message: error.message,
      details: process.env.NODE_ENV === "development" ? error.stack : undefined,
    });
  }
};

// delete room by ID
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
