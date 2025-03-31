import React, { useEffect, useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { Card, Button, Form, Spinner, Alert } from "react-bootstrap";
import { api } from "../navbar";
import { useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate, useNavigation } from "react-router-dom";
const BookingsPage = () => {
  const user = useSelector((state) => state.user);
  const [bookings, setBookings] = useState([]);
  const [equipments, setEquipments] = useState({});
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const Navigate=useNavigate()
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem("access_token");

        const [bookingsResponse, equipmentsResponse] = await Promise.all([
          axios.get(`${api}/all-booking`),
          axios.get(`${api}/all-equipments`),
        ]);

        setBookings(bookingsResponse.data);

        const equipmentData = equipmentsResponse.data.reduce(
          (acc, equipment) => {
            acc[equipment.id] = equipment;
            return acc;
          },
          {}
        );
        setEquipments(equipmentData);
      } catch (err) {
        setError("Failed to fetch data");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const filteredBookings = bookings.filter(
    (booking) =>
      (statusFilter === "all" || booking.status === statusFilter) &&
      (equipments[booking.equipment_id]?.name || "")
        .toLowerCase()
        .includes(searchTerm.toLowerCase())
  );

  const calculateTotalPrice = (startDate, endDate, amountPerDay) => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const diffTime = Math.abs(end - start);
    const numberOfDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return numberOfDays * amountPerDay;
  };

  const cancelBooking = async (bookingId) => {
    try {
      await axios.delete(`${api}/all-booking/${bookingId}`);
      setBookings(bookings.filter((booking) => booking.id !== bookingId));
      alert("Booking cancelled successfully!");
    } catch {
      setError("Error cancelling booking");
    }
  };

  const proceedToPayment = (totalPrice) => {

    toast.success(`Proceeding to payment of Ksh ${totalPrice}`, {
      style: {
        position: "fixed",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        zIndex: 9999,
        textAlign: "center",
      },
      autoClose: 3000, 
    });
    
    

    setTimeout(() => {
     Navigate('/en-us/safaricom/makepayment', { state: { amount: totalPrice } });
    }, 3000);
  };

  if (loading) {
    return (
      <div className="text-center mt-5">
        <Spinner animation="border" variant="primary" />
        <p>Loading bookings...</p>
      </div>
    );
  }

  return (
    <div
      className="container mt-4"
      style={{
        overflowY: "auto",
        flex: 1,
        maxHeight: "100vh",
        paddingBottom: "50px",
      }}
    >
      <h2>Bookings</h2>

      {error && <Alert variant="danger">{error}</Alert>}

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

      <div className="row">
        {filteredBookings.length === 0 ? (
          <p className="text-center">No bookings found.</p>
        ) : (
          filteredBookings.map((booking) => {
            const equipment = equipments[booking.equipment_id];
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
          })
        )}
      </div>
      <ToastContainer/>
    </div>
  );
};

export default BookingsPage;
