import React, { useState } from "react";
import { Card, Form, FormControl, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

const EquipmentPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("all");

  const equipmentData = [
    { id: 1, name: "Tractor", description: "Heavy-duty farming tractor", price: 5000, location: "Nairobi", available: true },
    { id: 2, name: "Plow", description: "Steel plow for soil tilling", price: 2000, location: "Kisumu", available: false },
    { id: 3, name: "Irrigation Pump", description: "Water pump for irrigation", price: 3500, location: "Mombasa", available: true },
  ];

  const filteredEquipment = equipmentData.filter((item) =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const sortedEquipment = filteredEquipment.filter((item) => {
    if (sortBy === "all") return true;
    return sortBy === "available" ? item.available : !item.available;
  });

  return (
    <div className="container mt-4">
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
        {sortedEquipment.length > 0 ? (
          sortedEquipment.map((item) => (
            <div key={item.id} className="col-md-4 mb-3">
              <Card className="p-3 shadow">
                <Card.Body>
                  <Card.Title>{item.name}</Card.Title>
                  <Card.Text>{item.description}</Card.Text>
                  <p><strong>Price per day:</strong> Ksh {item.price}</p>
                  <p><strong>Location:</strong> {item.location}</p>
                  <p><strong>Status:</strong> {item.available ? "Available" : "Booked"}</p>
                </Card.Body>
              </Card>
            </div>
          ))
        ) : (
          <p className="text-center">No equipment found.</p>
        )}
      </div>
    </div>
  );
};

export default EquipmentPage;