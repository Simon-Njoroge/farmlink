import React, { useState } from "react";
import { Card, Form } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

const bookingsData = [
  { id: 1, equipment: "Tractor", start_date: "2024-02-20", end_date: "2024-02-25", status: "pending" },
  { id: 2, equipment: "Plow", start_date: "2024-03-01", end_date: "2024-03-05", status: "confirmed" },
  { id: 3, equipment: "Harvester", start_date: "2024-04-10", end_date: "2024-04-15", status: "completed" },
  { id: 4, equipment: "Seeder", start_date: "2024-05-01", end_date: "2024-05-07", status: "cancelled" },
];

const BookingsPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const filteredBookings = bookingsData.filter((booking) =>
    (statusFilter === "all" || booking.status === statusFilter) &&
    booking.equipment.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container mt-4">
      <h2>Bookings</h2>
      
      {/* Search and Filter Section */}
      <div className="d-flex mb-3">
        <Form.Control
          type="text"
          placeholder="Search by Equipment Name"
          className="me-2"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <Form.Select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
          <option value="all">All Statuses</option>
          <option value="pending">Pending</option>
          <option value="confirmed">Confirmed</option>
          <option value="completed">Completed</option>
          <option value="cancelled">Cancelled</option>
        </Form.Select>
      </div>

      {/* Bookings List */}
      <div className="row">
        {filteredBookings.map((booking) => (
          <div key={booking.id} className="col-md-4 mb-3">
            <Card className="p-3 shadow">
              <h5>{booking.equipment}</h5>
              <p>Start Date: {booking.start_date}</p>
              <p>End Date: {booking.end_date}</p>
              <p>Status: <strong>{booking.status}</strong></p>
            </Card>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BookingsPage;