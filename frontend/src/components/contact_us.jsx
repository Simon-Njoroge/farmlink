import React, { useState } from "react";
import { Container, Form, Button, Row, Col } from "react-bootstrap";

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Your message has been sent successfully!");
    setFormData({ name: "", email: "", message: "" });
  };

  return (
    <Container className="mt-5">
      <h2 className="text-center text-success mb-4">Contact Us</h2>
      <Row>
        {/* Contact Form */}
        <Col md={6}>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter your name"
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email"
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Message</Form.Label>
              <Form.Control
                as="textarea"
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows={4}
                placeholder="Write your message..."
                required
              />
            </Form.Group>

            <Button variant="success" type="submit" className="w-100">
              Send Message
            </Button>
          </Form>
        </Col>

        {/* Contact Information */}
        <Col md={6} className="text-center">
          <h4 className="text-success">Our Contact Details</h4>
          <p>
            📍 **Address:** Nairobi, Kenya <br />
            📧 **Email:** support@farmlink.com <br />
            📞 **Phone:** +254 700 123 456 <br />
            🌐 **Website:** www.farmlink.com
          </p>
        </Col>
      </Row>
    </Container>
  );
};

export default ContactUs;
