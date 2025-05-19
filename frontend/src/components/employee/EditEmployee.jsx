import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { updateEmployee, getAllEmployees } from "../utils/ApiFunctions";

const EditEmployee = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    position: "",
    email: "",
    phone: "",
    salary: "",
  });
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEmployeeData = async () => {
      try {
        const employees = await getAllEmployees();
        const employee = employees.find((e) => e.id === parseInt(id));
        if (employee) {
          setFormData({
            name: employee.name,
            position: employee.position,
            email: employee.email,
            phone: employee.phone,
            salary: employee.salary,
          });
        }
        setLoading(false);
      } catch (error) {
        setMessage("Error fetching employee data: " + error.message);
        setLoading(false);
      }
    };

    fetchEmployeeData();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateEmployee(id, formData);
      setMessage("Employee updated successfully!");
      setTimeout(() => {
        navigate("/employees");
      }, 2000);
    } catch (error) {
      setMessage("Failed to update employee: " + error.message);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-600"></div>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto mt-10 bg-white p-6 rounded shadow">
      <h2 className="text-2xl font-semibold mb-4 text-center">Edit Employee</h2>
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
          <label className="block mb-1 font-medium">Name*</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full border px-3 py-2 rounded"
            placeholder="e.g. John Doe"
          />
        </div>

        <div className="mb-4">
          <label className="block mb-1 font-medium">Position*</label>
          <input
            type="text"
            name="position"
            value={formData.position}
            onChange={handleChange}
            required
            className="w-full border px-3 py-2 rounded"
            placeholder="e.g. Front Desk Staff"
          />
        </div>

        <div className="mb-4">
          <label className="block mb-1 font-medium">Email*</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full border px-3 py-2 rounded"
            placeholder="e.g. john@example.com"
          />
        </div>

        <div className="mb-4">
          <label className="block mb-1 font-medium">Phone Number*</label>
          <input
            type="text"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            required
            className="w-full border px-3 py-2 rounded"
            placeholder="e.g. +1234567890"
          />
        </div>

        <div className="mb-4">
          <label className="block mb-1 font-medium">Salary*</label>
          <input
            type="number"
            name="salary"
            value={formData.salary}
            onChange={handleChange}
            required
            className="w-full border px-3 py-2 rounded"
            placeholder="e.g. 50000"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-purple-600 text-white py-2 rounded hover:bg-purple-700 transition"
        >
          Update Employee
        </button>
      </form>
    </div>
  );
};

export default EditEmployee;
