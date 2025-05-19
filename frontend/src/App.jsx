import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/home/Home";
import AddRoom from "./components/room/AddRoom";
import "./index.css";
import AddCustomer from "./components/customer/AddCustomer";
import AddEmployee from "./components/employee/AddEmployee";
import AddService from "./components/service/AddService";
import AddBooking from "./components/booking/AddBooking";
import Navbar from "./components/common/Navbar";
import CustomerList from "./components/customer/CustomerList";
import EditCustomer from "./components/customer/EditCustomer";
import EditEmployee from "./components/employee/EditEmployee";
import EditRoom from "./components/room/EditRoom";
import EditService from "./components/service/EditService";
import RoomList from "./components/room/RoomList";
import ServiceList from "./components/service/ServiceList";
import EmployeeList from "./components/employee/EmployeeList";
import BookingList from "./components/booking/BookingList";
import InvoiceList from "./components/invoice/InvoiceList";
import InvoiceDetail from "./components/invoice/InvoiceDetail";
import BookingServiceList from "./components/booking/BookingServiceList";
import WorkSchedule from "./components/employee/WorkSchedule";

function App() {
  const [imagePreview, setImagePreview] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setRoom((prev) => ({
        ...prev,
        image: file,
      }));
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCancel = () => {
    if (
      window.confirm(
        "Are you sure you want to cancel? All changes will be lost."
      )
    ) {
      navigate("/rooms");
    }
  };

  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        <Navbar />
        <main className="container mx-auto px-4 py-8">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/add-room" element={<AddRoom />} />
            <Route path="/add-customer" element={<AddCustomer />} />
            <Route path="/add-employee" element={<AddEmployee />} />
            <Route path="/add-service" element={<AddService />} />
            <Route path="/add-booking" element={<AddBooking />} />
            <Route path="/customers" element={<CustomerList />} />
            <Route path="/employees" element={<EmployeeList />} />
            <Route path="/bookings" element={<BookingList />} />
            <Route path="/edit-customer/:id" element={<EditCustomer />} />
            <Route path="/edit-employee/:id" element={<EditEmployee />} />
            <Route path="/edit-room/:id" element={<EditRoom />} />
            <Route path="/edit-service/:id" element={<EditService />} />
            <Route path="/rooms" element={<RoomList />} />
            <Route path="/services" element={<ServiceList />} />
            <Route path="/invoices" element={<InvoiceList />} />
            <Route path="/invoices/:id" element={<InvoiceDetail />} />
            <Route path="/work-schedules" element={<WorkSchedule />} />
            <Route
              path="/bookings/:bookingId/services"
              element={<BookingServiceList />}
            />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
