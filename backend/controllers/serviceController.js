// controllers/serviceController.js
import Service from "../models/serviceModel.js";

// CREATE NEW SERVICE
export const createService = async (req, res) => {
  try {
    const { name, price, description } = req.body;

    // Validate required fields
    if (!name || !price) {
      return res
        .status(400)
        .json({ message: "Service name and price are required." });
    }

    const newService = await Service.create({
      name,
      price,
      description,
    });

    return res.status(201).json(newService);
  } catch (error) {
    console.error("Error creating service:", error);
    return res.status(500).json({ message: "Failed to create service." });
  }
};

// GET ALL SERVICES
export const getAllServices = async (req, res) => {
  try {
    const services = await Service.findAll();
    res.json(services);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET SERVICE BY ID
export const getServiceById = async (req, res) => {
  try {
    const { id } = req.params;
    const service = await Service.findByPk(id);
    if (!service) {
      return res.status(404).json({ message: "Service not found" });
    }
    res.json(service);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// DELETE SERVICE BY ID
export const deleteService = async (req, res) => {
  try {
    const { id } = req.params;
    const service = await Service.findByPk(id);
    if (!service) {
      return res.status(404).json({ message: "Service not found" });
    }
    await service.destroy();
    res.json({ message: "Service deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateService = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, price, description } = req.body;

    const service = await Service.findByPk(id);
    if (!service) {
      return res.status(404).json({ message: "Service not found" });
    }

    await service.update({
      name,
      price,
      description,
    });

    res.json(service);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const addService = async (req, res) => {
  try {
    const { name, price, description } = req.body;
    const service = await Service.create({
      name,
      price,
      description,
    });
    res.status(201).json(service);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
