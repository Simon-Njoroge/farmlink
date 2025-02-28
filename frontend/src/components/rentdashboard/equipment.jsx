import React, { useState, useEffect } from "react";
import { Card, Form, FormControl, Button, Modal } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import { api } from "../navbar";
import { useSelector } from "react-redux";
const EquipmentPage = () => {
  const user = useSelector((state) => state.user);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("all");
  const [equipments, setEquipments] = useState([]);
  const [selectedEquipment, setSelectedEquipment] = useState(null);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [showModal, setShowModal] = useState(false);

  // Fetch equipment
  const fetchEquipments = async () => {
    try {
      const response = await axios.get(`${api}/all-equipments`);
      setEquipments(response.data);
    } catch (error) {
      console.error("Error fetching equipment:", error);
    }
  };

  useEffect(() => {
    fetchEquipments();
  }, []);

  // Open booking modal
  const handleBookClick = (equipment) => {
    setSelectedEquipment(equipment);
    setShowModal(true);
  };

  // Handle booking confirmation
  const handleConfirmBooking = async () => {
    if (!startDate || !endDate  || !selectedEquipment) {
      alert("Please select start and end dates.");
      return;
    }
  
    try {
      const userId = user.id; 
      
  
      const response = await axios.post(`${api}/all-booking/`, {
        farmer: 2,
        start_date: startDate,
        end_date: endDate,
        equipment_id: selectedEquipment?.id,  
      });
      
      console.log("Booking successful:", response.data);
  
      
      setEquipments((prevEquipments) =>
        prevEquipments.map((equip) =>
          equip.id === selectedEquipment.id ? { ...equip, available: false } : equip
        )
      );
  
      setShowModal(false);
    } catch (error) {
      console.error("Error booking equipment:", error.response?.data || error.message);
    }
  };
  

  // Filter equipment based on search term
  const filteredEquipment = equipments.filter((item) =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Sort equipment based on availability
  const sortedEquipment = filteredEquipment.filter((item) => {
    if (sortBy === "all") return true;
    return sortBy === "available" ? item.available : !item.available;
  });

  return (
    <div className="container mt-4 mb-5" style={{ overflowY: "auto", flex: 1, maxHeight: "100vh" , overflowY: "auto",maxHeight: "100vh",paddingBottom: "50px", marginBottom: "auto" }}>
      <h2>Available Equipment </h2>
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
        {sortedEquipment.length > 0 ? (
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
              <FormControl type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>End Date</Form.Label>
              <FormControl type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>Cancel</Button>
          <Button variant="success" onClick={handleConfirmBooking}>Confirm Booking</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default EquipmentPage;
