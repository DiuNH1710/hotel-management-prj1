import express from "express";
import {
  getAllRooms,
  getRoomById,
  addRoom,
  updateRoom,
  deleteRoom,
} from "../controllers/roomController.js";
import upload from "../middlewares/multer.js";

const router = express.Router();

router.get("/", getAllRooms);
router.get("/:id", getRoomById);
router.post("/", upload.single("image"), addRoom);
router.put("/:id", upload.single("image"), updateRoom);
router.delete("/:id", deleteRoom);

export default router;
