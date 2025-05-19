import React, { useState, useEffect } from "react";
import { addEmployee } from "../utils/ApiFunctions";

const AddEmployee = () => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [position, setPosition] = useState("");
  const [salary, setSalary] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => setMessage(""), 3000);
      return () => clearTimeout(timer);
    }
  }, [message]);

  const resetForm = () => {
    setName("");
    setPhone("");
    setPosition("");
    setSalary("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const success = await addEmployee({ name, phone, position, salary });

    if (success) {
      setMessage("Employee added successfully!");
      resetForm();
    } else {
      setMessage("Failed to add employee.");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 bg-white p-6 rounded shadow">
      <h2 className="text-2xl font-semibold mb-4 text-center">Add Employee</h2>
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
          <label className="block mb-1 font-medium">Full Name*</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="w-full border px-3 py-2 rounded"
            placeholder="e.g. John Doe"
          />
        </div>

        <div className="mb-4">
          <label className="block mb-1 font-medium">Phone*</label>
          <input
            type="text"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
            className="w-full border px-3 py-2 rounded"
            placeholder="e.g. +1234567890"
          />
        </div>

        <div className="mb-4">
          <label className="block mb-1 font-medium">Position*</label>
          <select
            value={position}
            onChange={(e) => setPosition(e.target.value)}
            required
            className="w-full border px-3 py-2 rounded"
          >
            <option value="">Select a position</option>
            <option value="Manager">Manager</option>
            <option value="Receptionist">Receptionist</option>
            <option value="Housekeeping">Housekeeping</option>
            <option value="Security">Security</option>
            <option value="Other">Other</option>
          </select>
        </div>

        <div className="mb-4">
          <label className="block mb-1 font-medium">Salary ($)*</label>
          <input
            type="number"
            value={salary}
            onChange={(e) => setSalary(e.target.value)}
            required
            className="w-full border px-3 py-2 rounded"
            placeholder="e.g. 3000"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-purple-600 text-white py-2 rounded hover:bg-purple-700 transition"
        >
          Add Employee
        </button>
      </form>
    </div>
  );
};

export default AddEmployee;
