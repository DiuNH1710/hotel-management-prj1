import Employee from "../models/employeeModel.js";
import WorkSchedule from "../models/workScheduleModel.js";
import { Op } from "sequelize";

// Tạo mới một nhân viên
export const createEmployee = async (req, res) => {
  try {
    const { name, phone, position, salary, email } = req.body;

    // Kiểm tra dữ liệu đầu vào
    if (!name || !phone || !position || !salary) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const newEmployee = await Employee.create({
      name,
      phone,
      position,
      salary,
      email,
    });
    return res.status(201).json(newEmployee);
  } catch (error) {
    console.error("Error creating employee:", error);
    return res.status(500).json({
      message: "Internal server error",
      details:
        process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
};

// Lấy danh sách tất cả nhân viên
export const getAllEmployees = async (req, res) => {
  try {
    const employees = await Employee.findAll();
    return res.status(200).json(employees);
  } catch (error) {
    console.error("Error fetching employees:", error);
    return res.status(500).json({
      message: "Internal server error",
      details:
        process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
};

export const updateEmployee = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, position, email, phone, salary } = req.body;

    const employee = await Employee.findByPk(id);
    if (!employee) {
      return res.status(404).json({ message: "Employee not found" });
    }

    await employee.update({
      name,
      position,
      email,
      phone,
      salary,
    });

    res.json(employee);
  } catch (error) {
    console.error("Error updating employee:", error);
    res.status(400).json({
      message: "Error updating employee",
      details:
        process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
};

export const deleteEmployee = async (req, res) => {
  try {
    const { id } = req.params;
    const employee = await Employee.findByPk(id);

    if (!employee) {
      return res.status(404).json({ message: "Employee not found" });
    }

    // Kiểm tra xem nhân viên có lịch làm việc không
    const workSchedules = await WorkSchedule.findAll({
      where: { employee_id: id },
    });

    if (workSchedules.length > 0) {
      // Xóa tất cả lịch làm việc của nhân viên
      await WorkSchedule.destroy({
        where: { employee_id: id },
      });
    }

    // Xóa nhân viên
    await employee.destroy();

    res.json({
      message: "Employee and associated work schedules deleted successfully",
      deletedWorkSchedules: workSchedules.length,
    });
  } catch (error) {
    console.error("Error deleting employee:", error);
    res.status(500).json({
      message: "Error deleting employee",
      details:
        process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
};

// Work Schedule functions
export const getAllWorkSchedules = async (req, res) => {
  try {
    const workSchedules = await WorkSchedule.findAll({
      include: [
        {
          model: Employee,
          as: "employee",
          attributes: ["id", "name"],
        },
      ],
      order: [["work_date", "DESC"]],
    });
    res.json(workSchedules);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getWorkScheduleById = async (req, res) => {
  try {
    const workSchedule = await WorkSchedule.findByPk(req.params.id, {
      include: [
        {
          model: Employee,
          as: "employee",
          attributes: ["id", "name"],
        },
      ],
    });
    if (!workSchedule) {
      return res.status(404).json({ message: "Work schedule not found" });
    }
    res.json(workSchedule);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createWorkSchedule = async (req, res) => {
  try {
    const { employee_id, work_date, shift } = req.body;

    // Validate if employee exists
    const employee = await Employee.findByPk(employee_id);
    if (!employee) {
      return res.status(404).json({ message: "Employee not found" });
    }

    const workSchedule = await WorkSchedule.create({
      employee_id,
      work_date,
      shift,
    });

    res.status(201).json(workSchedule);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateWorkSchedule = async (req, res) => {
  try {
    const { employee_id, work_date, shift } = req.body;
    const workSchedule = await WorkSchedule.findByPk(req.params.id);

    if (!workSchedule) {
      return res.status(404).json({ message: "Work schedule not found" });
    }

    // Validate if employee exists if employee_id is being updated
    if (employee_id && employee_id !== workSchedule.employee_id) {
      const employee = await Employee.findByPk(employee_id);
      if (!employee) {
        return res.status(404).json({ message: "Employee not found" });
      }
    }

    await workSchedule.update({
      employee_id,
      work_date,
      shift,
    });

    res.json(workSchedule);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteWorkSchedule = async (req, res) => {
  try {
    const workSchedule = await WorkSchedule.findByPk(req.params.id);
    if (!workSchedule) {
      return res.status(404).json({ message: "Work schedule not found" });
    }

    await workSchedule.destroy();
    res.json({ message: "Work schedule deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getWorkSchedulesByEmployee = async (req, res) => {
  try {
    const workSchedules = await WorkSchedule.findAll({
      where: { employee_id: req.params.employeeId },
      include: [
        {
          model: Employee,
          as: "employee",
          attributes: ["id", "name"],
        },
      ],
      order: [["work_date", "DESC"]],
    });
    res.json(workSchedules);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getWorkSchedulesByDateRange = async (req, res) => {
  try {
    const { start_date, end_date } = req.query;
    const workSchedules = await WorkSchedule.findAll({
      where: {
        work_date: {
          [Op.between]: [start_date, end_date],
        },
      },
      include: [
        {
          model: Employee,
          as: "employee",
          attributes: ["id", "name"],
        },
      ],
      order: [["work_date", "ASC"]],
    });
    res.json(workSchedules);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
