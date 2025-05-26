import Customer from "../models/customerModel.js";

export const createCustomer = async (req, res) => {
  try {
    const { name, email, phone, idPassport } = req.body;

    const newCustomer = await Customer.create({
      name,
      email,
      phone,
      idPassport,
    });

    res
      .status(201)
      .json({ message: "Customer created", customer: newCustomer });
  } catch (error) {
    console.error("Error creating customer:", error);
    res.status(500).json({ message: "Failed to create customer", error });
  }
};

export const getAllCustomers = async (req, res) => {
  try {
    const customers = await Customer.findAll();
    res.status(200).json(customers);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteCustomer = async (req, res) => {
  try {
    const customerId = req.params.id;

    const customer = await Customer.findByPk(customerId);
    if (!customer) {
      return res.status(404).json({ message: "Customer not found" });
    }

    await customer.destroy();
    res.status(200).json({ message: "Customer deleted successfully" });
  } catch (error) {
    console.error("Error deleting customer:", error);
    res.status(500).json({ message: "Failed to delete customer", error });
  }
};

export const addCustomer = async (req, res) => {
  try {
    const { name, email, phone, idPassport } = req.body;
    const customer = await Customer.create({
      name,
      email,
      phone,
      idPassport,
    });
    res.status(201).json(customer);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update a customer
export const updateCustomer = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, phone, idPassport } = req.body;

    const customer = await Customer.findByPk(id);
    if (!customer) {
      return res.status(404).json({ message: "Customer not found" });
    }

    await customer.update({
      name,
      email,
      phone,
      idPassport,
    });

    res.json(customer);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
