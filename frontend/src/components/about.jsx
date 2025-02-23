import React from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";

const About = () => {
  return (
    <div>
      {/* Hero Section */}
      <div
        className="text-center text-white p-5"
        style={{
          background: "linear-gradient(to right, #228B22, #32CD32)",
          minHeight: "50vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Container>
          <h1 className="fw-bold">About Farm Link</h1>
          <p className="lead">Empowering farmers with accessible and affordable farm machinery.</p>
        </Container>
      </div>

      {/* Introduction Section */}
      <Container className="my-5">
        <Row>
          <Col md={6}>
            <img
              src="data:image/jpeg;base64,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"
              alt="Farm Machinery"
              className="img-fluid rounded shadow"
            />
          </Col>
          <Col md={6}>
            <h2 className="text-success fw-bold">What is Farm Link?</h2>
            <p>
              Farm Link is a mobile-first platform designed to connect farmers with essential farm equipment such as tractors and harvesters. 
              By bridging the gap between equipment owners and farmers, we aim to make agricultural machinery more accessible and efficient.
            </p>
          </Col>
        </Row>
      </Container>

      {/* Our Mission Section */}
      <div className="bg-light py-5">
        <Container>
          <h2 className="text-center text-success fw-bold mb-4">Our Mission</h2>
          <p className="text-center">
            We strive to empower farmers by providing them with **affordable, on-demand access** to modern agricultural tools, 
            enhancing productivity and efficiency while reducing costs.
          </p>
        </Container>
      </div>

      {/* Why Choose Us Section */}
      <Container className="my-5">
        <h2 className="text-center text-success fw-bold mb-4">Why Choose Farm Link?</h2>
        <Row>
          <Col md={4}>
            <Card className="text-center border-0 shadow-sm">
              <Card.Body>
                <h5 className="text-success fw-bold">Easy Access to Equipment</h5>
                <p>Farmers can find and book tractors, harvesters, and more within minutes.</p>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4}>
            <Card className="text-center border-0 shadow-sm">
              <Card.Body>
                <h5 className="text-success fw-bold">Secure Payments</h5>
                <p>Reliable and safe transactions using EcoCash and other digital platforms.</p>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4}>
            <Card className="text-center border-0 shadow-sm">
              <Card.Body>
                <h5 className="text-success fw-bold">AI-Powered Recommendations</h5>
                <p>Smart suggestions based on your farming needs.</p>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>

      {/* Meet the Team
      <div className="bg-light py-5">
        <Container>
          <h2 className="text-center text-success fw-bold mb-4">Meet the Team</h2>
          <Row>
            <Col md={4} className="text-center">
              <img
                src="https://source.unsplash.com/150x150/?person"
                alt="Founder"
                className="rounded-circle mb-2"
              />
              <h5 className="fw-bold">John Doe</h5>
              <p>Founder & CEO</p>
            </Col>
            <Col md={4} className="text-center">
              <img
                src="https://source.unsplash.com/150x150/?businessman"
                alt="CTO"
                className="rounded-circle mb-2"
              />
              <h5 className="fw-bold">Jane Smith</h5>
              <p>Chief Technology Officer</p>
            </Col>
            <Col md={4} className="text-center">
              <img
                src="https://source.unsplash.com/150x150/?woman"
                alt="COO"
                className="rounded-circle mb-2"
              />
              <h5 className="fw-bold">Emily Johnson</h5>
              <p>Operations Manager</p>
            </Col>
          </Row>
        </Container>
      </div> */}

      {/* Call to Action */}
      <div className="text-center text-white p-4" style={{ background: "#228B22" }}>
        <h3>Ready to Join FarmLink?</h3>
        <p>Sign up today and take your farming to the next level.</p>
        <Button variant="warning" size="lg">Join Now</Button>
      </div>
    </div>
  );
};

export default About;
