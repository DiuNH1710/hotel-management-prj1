import express from "express";
import {
  getAllRooms,
  addRoom,
  updateRoom,
  deleteRoom,
} from "../controllers/roomController.js";
import multer from "multer";

const router = express.Router();

// Configure multer for file upload
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage: storage });

router.get("/", getAllRooms);
router.post("/", upload.single("image"), addRoom);
router.put("/:id", upload.single("image"), updateRoom);
router.delete("/:id", deleteRoom);

export default router;
