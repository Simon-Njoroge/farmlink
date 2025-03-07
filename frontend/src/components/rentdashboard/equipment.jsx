import React, { useState, useEffect } from "react";
import { Card, Form, FormControl, Button, Modal, Alert } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import { useSelector } from "react-redux";
import { api } from "../navbar";
import { ToastContainer, toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
const EquipmentPage = () => {
  const user = useSelector((state) => state.user);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("all");
  const [equipments, setEquipments] = useState([]);
  const [selectedEquipment, setSelectedEquipment] = useState(null);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [bookingSuccess, setBookingSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  // Fetch equipment data
  useEffect(() => {
    fetchEquipments();
  }, []);

  const fetchEquipments = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${api}/all-equipments`);
      setEquipments(response.data);
    } catch (error) {
      console.error("Error fetching equipment:", error);
    } finally {
      setLoading(false);
    }
  };

  // Open booking modal
  const handleBookClick = (equipment) => {
    setSelectedEquipment(equipment);
    setShowModal(true);
  };

  // Handle booking confirmation
  const handleConfirmBooking = async () => {
    if (!startDate || !endDate || !selectedEquipment) {
      alert("Please select start and end dates.");
      return;
    }

    if (new Date(startDate) >= new Date(endDate)) {
      alert("End date must be after start date.");
      return;
    }

    if (!user?.id) {
      alert("User not found. Please log in again.");
      return;
    }

    try {
      await axios.post(`${api}/all-booking/`, {
        farmer: user.id, 
        start_date: startDate,
        end_date: endDate,
        equipment_id: selectedEquipment.id,
      }, {
        headers: {
          "Content-Type": "application/json", 
        }});

      setBookingSuccess(true);
      setShowModal(false);
      toast.success('Booked Successfully')
      fetchEquipments(); 
    } catch (error) {
      console.error("Error booking equipment:", error.response?.data || error.message);
      toast.error('Failed To Book')
      alert("Failed to book equipment. Please try again.");
    }
  };

  // Filter and sort equipment
  const filteredEquipment = equipments.filter((item) =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const sortedEquipment = filteredEquipment.filter((item) => {
    if (sortBy === "all") return true;
    return sortBy === "available" ? item.available : !item.available;
  });

  return (
    <div className="container mt-4 mb-5" style={{ maxHeight: "100vh", overflowY: "auto", paddingBottom: "50px" }}>
      <h2>Available Equipment</h2>

      {bookingSuccess && <Alert variant="success">Booking successful!</Alert>}

      <div className="d-flex justify-content-between mb-3">
        <FormControl
          type="text"
          placeholder="Search by name"
          className="w-50"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <Form.Select className="w-25" value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
          <option value="all">All</option>
          <option value="available">Available</option>
          <option value="booked">Booked</option>
        </Form.Select>
      </div>

      <div className="row">
        {loading ? (
          <p className="text-center">Loading equipment...</p>
        ) : sortedEquipment.length > 0 ? (
          sortedEquipment.map((item) => (
            <div key={item.id} className="col-md-4 mb-3">
              <Card className="p-3 shadow">
                {item.image && (
                  <Card.Img
                    variant="top"
                    src={item.image.startsWith("http") ? item.image : `${api}${item.image}`}
                    alt={item.name}
                    style={{ height: "200px", objectFit: "cover" }}
                  />
                )}
                <Card.Body>
                  <Card.Title>{item.name}</Card.Title>
                  <Card.Text>{item.description}</Card.Text>
                  <p><strong>Price per day:</strong> Ksh {item.price_per_day}</p>
                  <p><strong>Location:</strong> {item.location}</p>
                  <p><strong>Status:</strong> {item.available ? "Available" : "Booked"}</p>
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
                min={new Date().toISOString().split("T")[0]} // Prevent past dates
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>End Date</Form.Label>
              <FormControl
                type="date"
                min={startDate || new Date().toISOString().split("T")[0]} // Prevent invalid range
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>Cancel</Button>
          <Button variant="success" onClick={handleConfirmBooking}>Confirm Booking</Button>
        </Modal.Footer>
      </Modal>
      <ToastContainer/>
    </div>
  );
};

export default EquipmentPage;
