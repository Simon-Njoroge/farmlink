import React from "react";
import { Container, Row, Col, Button, Card } from "react-bootstrap";

const LandingPage = () => {
  return (
    <div>
      {/* Hero Section */}
      <div className="text-center text-white p-5" style={{ background: "linear-gradient(to right, #228B22, #32CD32)", minHeight: "60vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <Container>
          <h1 className="fw-bold">Welcome to Farm Link</h1>
          <p className="lead">Your trusted platform for hiring and leasing farm equipment.</p>
          <Button variant="warning" size="lg" className="fw-bold">Get Started</Button>
        </Container>
      </div>

      {/* How It Works Section */}
      <Container className="my-5">
        <h2 className="text-center text-success fw-bold mb-4">How It Works</h2>
        <Row>
          {/* Seeking Services */}
          <Col md={6}>
            <Card className="shadow-sm border-0">
              <Card.Body>
                <h4 className="text-success fw-bold">Seeking Services</h4>
                <ol>
                  <li>Choose tractor, lorry, or any  other farm equipment</li>
                  <li>Enter your details</li>
                  <li>Choose service and pay with Mpesa</li>
                  <li>Service will be delivered</li>
                </ol>
              </Card.Body>
            </Card>
          </Col>

          {/* Offering Services */}
          <Col md={6}>
            <Card className="shadow-sm border-0">
              <Card.Body>
                <h4 className="text-success fw-bold">Offering Services</h4>
                <ol>
                  <li>Add your equipment and enter details</li>
                  <li>Confirm bookings you receive</li>
                  <li>Provide the service</li>
                  <li>Receive your payment</li>
                </ol>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>

      {/* Features Section */}
      <Container className="my-5">
        <h2 className="text-center text-success fw-bold mb-4">Why Choose Farm Link?</h2>
        <Row>
          <Col md={4}>
            <Card className="text-center border-0 shadow-sm">
              <Card.Body>
                <h5 className="text-success fw-bold">Affordable & Efficient</h5>
                <p>Save time and money with on-demand farm equipment rentals.</p>
              </Card.Body>
            </Card>
          </Col>
          {/* <Col md={4}>
            <Card className="text-center border-0 shadow-sm">
              <Card.Body>
                <h5 className="text-success fw-bold">AI-Powered Matching</h5>
                <p>Get recommended machinery based on your farming needs.</p>
              </Card.Body>
            </Card>
          </Col> */}
          <Col md={4}>
            <Card className="text-center border-0 shadow-sm">
              <Card.Body>
                <h5 className="text-success fw-bold">Secure Payments</h5>
                <p>Pay safely using Mpesa and other trusted methods.</p>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>

      {/* Call to Action */}
      <div className="text-center text-white p-4" style={{ background: "#228B22" }}>
        <h3>Get Started Today!</h3>
        <p>Join thousands of farmers and equipment owners on Farm Link.</p>
        <Button variant="warning" size="lg">Sign Up Now</Button>
      </div>
    </div>
  );
};

export default LandingPage;
