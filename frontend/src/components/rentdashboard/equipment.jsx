import React, { useState, useEffect } from "react";
import {
  Card,
  Form,
  FormControl,
  Button,
  Modal,
  Spinner,
} from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import { useSelector } from "react-redux";
import { api } from "../navbar";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const EquipmentPage = () => {
  const user = useSelector((state) => state.user);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("all");
  const [equipments, setEquipments] = useState([]);
  const [selectedEquipment, setSelectedEquipment] = useState(null);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchEquipments();
  }, []);

  const fetchEquipments = async () => {
    setLoading(true);
    try {
      const [equipmentsRes, bookingsRes] = await Promise.all([
        axios.get(`${api}/all-equipments`),
        axios.get(`${api}/all-booking`),
      ]);

      console.log("Bookings Data:", bookingsRes.data); // Debugging

      const equipmentsData = equipmentsRes.data;
      const bookingsData = bookingsRes.data;

      const updatedEquipments = equipmentsData.map((equipment) => {
        const relevantBookings = bookingsData.filter(
          (booking) => booking.equipment_id === equipment.id
        );
      
        console.log(
          `Equipment ID: ${equipment.id}, Relevant Bookings:`,
          relevantBookings
        );
      
        const latestBooking = relevantBookings.sort(
          (a, b) => new Date(b.end_date) - new Date(a.end_date)
        )[0] || null;
      
        return {
          ...equipment,
          latest_booking: latestBooking
            ? {
                end_date: latestBooking.end_date,
              }
            : null,
        };
      });
      

      setEquipments(updatedEquipments);
    } catch (error) {
      console.error("Error fetching data:", error);
      toast.error("Failed to load equipment data");
    } finally {
      setLoading(false);
    }
  };

  const handleBookClick = (equipment) => {
    setSelectedEquipment(equipment);
    setShowModal(true);
  };

  const handleConfirmBooking = async () => {
    if (
      !startDate ||
      !endDate ||
      !startTime ||
      !endTime ||
      !selectedEquipment
    ) {
      toast.warn("Please select all date and time fields.");
      return;
    }

    if (
      new Date(`${startDate}T${startTime}`) >= new Date(`${endDate}T${endTime}`)
    ) {
      toast.warn("End date and time must be after start date and time.");
      return;
    }

    if (!user?.id) {
      toast.error("User not found. Please log in again.");
      return;
    }

    try {
      await axios.post(
        `${api}/all-booking/`,
        {
          farmer: user.id,
          start_date: startDate,
          end_date: endDate,
          start_time: startTime,
          end_time: endTime,
          equipment_id: selectedEquipment.id,
        },
        { headers: { "Content-Type": "application/json" } }
      );

      toast.success("Booked Successfully");
      setShowModal(false);
      fetchEquipments();
    } catch (error) {
      console.error(
        "Error booking equipment:",
        error.response?.data || error.message
      );
      toast.error("Failed To Book");
    }
  };

  return (
    <div
      className="container mt-4 mb-5 overflow-auto"
      style={{ maxHeight: "100vh", paddingBottom: "50px" }}
    >
      <h2>Available Equipment</h2>
      <div className="d-flex justify-content-between mb-3">
        <FormControl
          type="text"
          placeholder="Search by name"
          className="w-50"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <Form.Select
          className="w-25"
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
        >
          <option value="all">All</option>
          <option value="available">Available</option>
          <option value="booked">Booked</option>
        </Form.Select>
      </div>
      <div className="row">
        {loading ? (
          <Spinner animation="border" className="m-auto" />
        ) : equipments.length > 0 ? (
          equipments.map((item) => (
            <div key={item.id} className="col-md-4 mb-3">
              <Card className="p-3 shadow">
                {item.image && (
                  <Card.Img
                    variant="top"
                    src={
                      item.image.startsWith("http")
                        ? item.image
                        : `${api}${item.image}`
                    }
                    alt={item.name}
                    style={{ height: "200px", objectFit: "cover" }}
                  />
                )}
                <Card.Body>
                  <Card.Title>{item.name}</Card.Title>
                  <Card.Text>{item.description}</Card.Text>
                  <p>
                    <strong>Price per day:</strong> Ksh {item.price_per_day}
                  </p>
                  <p>
                    <strong>Location:</strong> {item.location}
                  </p>
                  <p>
                    <strong>Status:</strong>{" "}
                    {item.available ? (
                      <span className="text-success">Available</span>
                    ) : (
                      <>
                        <span className="text-danger">Booked</span> until{" "}
                        <strong>
                        {item.latest_booking?.end_date
  ? new Date(item.latest_booking.end_date).toLocaleDateString()
  : "Available"}

                        </strong>
                      </>
                    )}
                  </p>

                  <Button
                    variant={item.available ? "success" : "secondary"}
                    onClick={() => handleBookClick(item)}
                    disabled={!item.available}
                  >
                    {item.available ? "Book Now" : "Already Booked"}
                  </Button>
                </Card.Body>
              </Card>
            </div>
          ))
        ) : (
          <p className="text-center">No equipment found.</p>
        )}
      </div>

      {/* Booking Modal */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Book {selectedEquipment?.name}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Start Date</Form.Label>
              <FormControl
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Start Time</Form.Label>
              <FormControl
                type="time"
                value={startTime}
                onChange={(e) => setStartTime(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>End Date</Form.Label>
              <FormControl
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>End Time</Form.Label>
              <FormControl
                type="time"
                value={endTime}
                onChange={(e) => setEndTime(e.target.value)}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Cancel
          </Button>
          <Button variant="success" onClick={handleConfirmBooking}>
            Confirm Booking
          </Button>
        </Modal.Footer>
      </Modal>

      <ToastContainer />
    </div>
  );
};

export default EquipmentPage;
