import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getInvoiceById, updateInvoiceStatus } from "../../utils/ApiFunctions";

const InvoiceDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [invoice, setInvoice] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchInvoice = async () => {
      try {
        const data = await getInvoiceById(id);
        setInvoice(data);
        setLoading(false);
      } catch (error) {
        setError("Failed to fetch invoice: " + error.message);
        setLoading(false);
      }
    };

    fetchInvoice();
  }, [id]);

  const handleStatusChange = async (newStatus) => {
    try {
      await updateInvoiceStatus(id, newStatus);
      setInvoice((prev) => ({ ...prev, status: newStatus }));
    } catch (error) {
      setError("Failed to update status: " + error.message);
    }
  };

  const getDaysBetweenDates = (startDate, endDate) => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const diffTime = Math.abs(end - start);
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <p className="text-red-500">{error}</p>
        <button
          onClick={() => navigate("/invoices")}
          className="mt-4 bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700"
        >
          Back to Invoices
        </button>
      </div>
    );
  }

  if (!invoice) {
    return (
      <div className="container mx-auto px-4 py-8">
        <p>Invoice not found</p>
        <button
          onClick={() => navigate("/invoices")}
          className="mt-4 bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700"
        >
          Back to Invoices
        </button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="bg-white rounded-lg shadow-lg p-6">
        <div className="flex justify-between items-start mb-6">
          <div>
            <h1 className="text-2xl font-semibold mb-2">
              Invoice #{invoice.invoiceNumber}
            </h1>
            <p className="text-gray-600">
              Status:{" "}
              <span
                className={`px-2 py-1 rounded-full text-sm ${
                  invoice.status === "Paid"
                    ? "bg-green-100 text-green-800"
                    : invoice.status === "Pending"
                    ? "bg-yellow-100 text-yellow-800"
                    : invoice.status === "Overdue"
                    ? "bg-red-100 text-red-800"
                    : "bg-gray-100 text-gray-800"
                }`}
              >
                {invoice.status}
              </span>
            </p>
          </div>
          <button
            onClick={() => navigate("/invoices")}
            className="bg-gray-200 text-gray-700 px-4 py-2 rounded hover:bg-gray-300"
          >
            Back to List
          </button>
        </div>

        <div className="grid grid-cols-2 gap-6 mb-6">
          <div>
            <h2 className="text-lg font-semibold mb-2">Booking Details</h2>
            <p>Room: {invoice.Booking.Room.roomNumber}</p>
            <p>Room Type: {invoice.Booking.Room.type}</p>
            <p>
              Room Price: ${Number(invoice.Booking.Room.price).toFixed(2)}/night
            </p>
            <p>
              Check-in:{" "}
              {new Date(invoice.Booking.checkInDate).toLocaleDateString()}
            </p>
            <p>
              Check-out:{" "}
              {new Date(invoice.Booking.checkOutDate).toLocaleDateString()}
            </p>
            <p>
              Duration:{" "}
              {getDaysBetweenDates(
                invoice.Booking.checkInDate,
                invoice.Booking.checkOutDate
              )}{" "}
              nights
            </p>
            <p>
              Room Total: $
              {(
                Number(invoice.Booking.Room.price) *
                getDaysBetweenDates(
                  invoice.Booking.checkInDate,
                  invoice.Booking.checkOutDate
                )
              ).toFixed(2)}
            </p>
          </div>
          <div>
            <h2 className="text-lg font-semibold mb-2">Invoice Details</h2>
            <p>
              Issue Date: {new Date(invoice.issueDate).toLocaleDateString()}
            </p>
            <p>Due Date: {new Date(invoice.dueDate).toLocaleDateString()}</p>
            <p>Payment Method: {invoice.paymentMethod || "Not specified"}</p>
          </div>
        </div>

        <div className="mb-6">
          <h2 className="text-lg font-semibold mb-2">Services</h2>
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Service
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Price
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Quantity
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Total
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {invoice.Booking.BookingServices.map((bs) => (
                <tr key={bs.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {bs.Service.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    ${Number(bs.Service.price).toFixed(2)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {bs.quantity}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    ${(Number(bs.Service.price) * bs.quantity).toFixed(2)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="border-t pt-4">
          <div className="flex justify-end space-x-4">
            <div className="text-right">
              <p className="text-gray-600">
                Subtotal: ${Number(invoice.subtotal).toFixed(2)}
              </p>
              <p className="text-gray-600">
                Tax (10%): ${Number(invoice.tax).toFixed(2)}
              </p>
              <p className="text-lg font-semibold mt-2">
                Total: ${Number(invoice.total).toFixed(2)}
              </p>
            </div>
          </div>
        </div>

        {invoice.status !== "Paid" && (
          <div className="mt-6 flex justify-end space-x-4">
            <button
              onClick={() => handleStatusChange("Paid")}
              className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
            >
              Mark as Paid
            </button>
            <button
              onClick={() => handleStatusChange("Cancelled")}
              className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
            >
              Cancel Invoice
            </button>
          </div>
        )}

        {invoice.notes && (
          <div className="mt-6 p-4 bg-gray-50 rounded">
            <h3 className="font-semibold mb-2">Notes</h3>
            <p className="text-gray-600">{invoice.notes}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default InvoiceDetail;
