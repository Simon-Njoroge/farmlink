import React from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "./LandingPage.css";

const UserLandingPage = () => {
  const navigate = useNavigate();

  return (
    <div className="landing-page">
      <div className="overlay">
        <Container className="text-center">
          <Row>
            <Col>
              <h1 className="title">Welcome to FarmLink</h1>
              <p className="subtitle">
                Your trusted platform for renting and leasing agricultural equipment.
              </p>
              <div className="button-group">
                <Button className="btn-custom" onClick={() => navigate("/rent")}>
                  Rent Equipment
                </Button>
                <Button className="btn-custom-outline" onClick={() => navigate("/offer")}>
                  Offer Equipment
                </Button>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </div>
  );
};

export default UserLandingPage;
