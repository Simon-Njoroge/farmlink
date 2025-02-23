import React, { useState } from "react";
import {
  Container,
  Form,
  Button,
  Row,
  Col,
  Alert,
  Spinner,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import "./sign_up.css";

const SignUp = () => {
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    const { email, phone, password } = formData;

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError("Invalid email format.");
      return false;
    }

    // Phone number validation (10-15 digits)
    const phoneRegex = /^[0-9]{10,15}$/;
    if (phone && !phoneRegex.test(phone)) {
      setError("Phone number must be between 10 and 15 digits.");
      return false;
    }

    // Password validation (at least one special character)
    const specialCharRegex = /[!@#$%^&*(),.?":{}|<>]/;
    if (!specialCharRegex.test(password)) {
      setError(
        "Password must include at least one special character (!@#$%^&* etc.)"
      );
      return false;
    }

    setError(""); // Clear errors if validation passes
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setLoading(true);
    try {
      const response = await fetch("http://127.0.0.1:8000/api/users/signup/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setSuccess(
          "Signup successful! Please check your email to verify your account."
        );
        setFormData({
          username: "",
          first_name: "",
          last_name: "",
          email: "",
          phone: "",
          password: "",
        });
      } else {
        setError(data.error || "Signup failed. Please try again.");
      }
    } catch (error) {
      setError("An error occurred. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="signup-container">
      <Container className="mt-5 sign-up">
        <h2 className="text-center text-success mb-4">Create an Account</h2>
        <Row className="justify-content-center">
          <Col md={6}>
            {error && <Alert variant="danger">{error}</Alert>}
            {success && <Alert variant="success">{success}</Alert>}

            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3">
                <Form.Label>Username</Form.Label>
                <Form.Control
                  type="text"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  placeholder="Enter a username"
                  required
                />
                <Form.Label>First Name</Form.Label>
                <Form.Control
                  type="text"
                  name="first_name"
                  value={formData.first_name}
                  onChange={handleChange}
                  placeholder="Enter your first name"
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Last Name</Form.Label>
                <Form.Control
                  type="text"
                  name="last_name"
                  value={formData.last_name}
                  onChange={handleChange}
                  placeholder="Enter your last name"
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Email Address</Form.Label>
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
                <Form.Label>Phone Number</Form.Label>
                <Form.Control
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="Enter your phone number"
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Enter a strong password"
                  required
                />
                <Form.Text className="text-muted">
                  Password must include at least one special character (!@#$%^&*
                  etc.)
                </Form.Text>
              </Form.Group>

              <Button
                variant="success"
                type="submit"
                className="w-100"
                disabled={loading}
              >
                {loading ? (
                  <Spinner as="span" animation="border" size="sm" />
                ) : (
                  "Sign Up"
                )}
              </Button>
            </Form>

            <p className="mt-3 text-center">
              Already have an account?{" "}
              <Link to="/en-us/auth/farmlink/login" className="text-success">
                Login here
              </Link>
            </p>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default SignUp;
