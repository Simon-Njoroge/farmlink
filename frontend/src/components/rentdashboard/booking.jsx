import React, { useState, useEffect } from "react";
import { Card, Form, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import { api } from "../navbar";
import "./booking.css";
const BookingsPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [bookings, setBookings] = useState([]);
  const [equipments, setEquipments] = useState({});

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await axios.get(`${api}/all-booking`);
        setBookings(response.data);
      } catch (error) {
        console.error("Error fetching bookings:", error);
      }
    };

    const fetchEquipments = async () => {
      try {
        const response = await axios.get(`${api}/all-equipments`);
        const equipmentData = response.data.reduce((acc, equipment) => {
          acc[equipment.id] = equipment;
          return acc;
        }, {});
        setEquipments(equipmentData);
      } catch (error) {
        console.error("Error fetching equipment:", error);
      }
    };

    fetchBookings();
    fetchEquipments();
  }, []);

  const filteredBookings = bookings.filter(
    (booking) =>
      (statusFilter === "all" || booking.status === statusFilter) &&
      booking.equipment?.name?.toLowerCase().includes(searchTerm.toLowerCase()) // Ensure equipment is present
  );

  // Calculate total price based on the number of days and amount per day
  const calculateTotalPrice = (startDate, endDate, amountPerDay) => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const diffTime = Math.abs(end - start);
    const numberOfDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); // Convert to days
    return numberOfDays * amountPerDay;
  };

  // Handle booking cancellation
  const cancelBooking = async (bookingId) => {
    try {
      await axios.delete(`${api}/all-booking`);
      setBookings(bookings.filter((booking) => booking.id !== bookingId));
      alert("Booking cancelled successfully!");
    } catch (error) {
      console.error("Error cancelling booking:", error);
    }
  };

  // Handle payment
  const proceedToPayment = (totalPrice) => {
    alert(`Proceeding to payment of Ksh ${totalPrice}`);
    window.location.href =
      "http://127.0.0.1:8000/pay/daraja/makepayment/stk_push/";
  };

  return (
    <div className="container mt-4" style={{ overflowY: "auto", flex: 1, maxHeight: "100vh" , overflowY: "auto",maxHeight: "100vh",paddingBottom: "50px", marginBottom: "auto" }}>
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
        <Form.Select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <option value="all">All Statuses</option>
          <option value="pending">Pending</option>
          <option value="confirmed">Confirmed</option>
          <option value="completed">Completed</option>
          <option value="cancelled">Cancelled</option>
        </Form.Select>
      </div>

      {/* Bookings List */}
      <div className="row">
        {filteredBookings.map((booking) => {
          const equipment = equipments[booking.equipment_id]; // Find the equipment by ID
          const totalPrice = booking.equipment?.price_per_day
            ? calculateTotalPrice(
                booking.start_date,
                booking.end_date,
                booking.equipment.price_per_day
              )
            : 0;

          return (
            <div key={booking.id} className="col-md-4 mb-3">
              <Card className="p-3 shadow">
                <h5>{booking.equipment?.name || "Unknown Equipment"}</h5>
                <p>Start Date: {booking.start_date}</p>
                <p>End Date: {booking.end_date}</p>
                <p>
                  Status: <strong>{booking.status}</strong>
                </p>
                <p>
                  Total Price: <strong>Ksh {totalPrice}</strong>
                </p>

                {/* Buttons for actions */}
                <div className="d-flex gap-2">
                  {booking.status === "pending" && (
                    <Button
                      variant="success"
                      className="small-button"
                      onClick={() => proceedToPayment(totalPrice)}
                    >
                      Pay
                    </Button>
                  )}
                  {booking.status !== "cancelled" && (
                    <Button
                      variant="danger"
                      className="small-button cancel-button"
                      onClick={() => cancelBooking(booking.id)}
                    >
                      Cancel
                    </Button>
                  )}
                </div>
              </Card>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default BookingsPage;
