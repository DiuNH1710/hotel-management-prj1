import express from "express";
import * as employeeController from "../controllers/employeeController.js";

const router = express.Router();

// Employee routes
router.post("/", employeeController.createEmployee);
router.get("/", employeeController.getAllEmployees);
router.put("/:id", employeeController.updateEmployee);
router.delete("/:id", employeeController.deleteEmployee);

// Work Schedule routes
router.get("/schedules", employeeController.getAllWorkSchedules);
router.get("/schedules/:id", employeeController.getWorkScheduleById);
router.post("/schedules", employeeController.createWorkSchedule);
router.put("/schedules/:id", employeeController.updateWorkSchedule);
router.delete("/schedules/:id", employeeController.deleteWorkSchedule);
router.get(
  "/:employeeId/schedules",
  employeeController.getWorkSchedulesByEmployee
);
router.get(
  "/schedules/date-range",
  employeeController.getWorkSchedulesByDateRange
);

export default router;
