import React, { useState } from "react";
import { Container, Form, Button, Row, Col, Alert, Card } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "./Login.css";

const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const { email, password } = formData;

    // Validate email format
    if (!/\S+@\S+\.\S+/.test(email)) {
      setError("Enter a valid email address");
      setLoading(false);
      return;
    }

    // Check password contains a special character
    const specialCharRegex = /[!@#$%^&*(),.?":{}|<>]/;
    if (!specialCharRegex.test(password)) {
      setError("Password must include at least one special character (!@#$%^&*)");
      setLoading(false);
      return;
    }

    try {
      const response = await axios.post("http://127.0.0.1:8000/api/users/login/", {
        email,
        password,
      });

      const { token } = response.data;

      // Store token in localStorage or sessionStorage
      localStorage.setItem("token", token);

      alert("Login Successful!");
      setFormData({ email: "", password: "" });

      // Redirect to the dashboard or landing page
      navigate("/en-us/auth/loggedin/dashboard");

    } catch (error) {
      setError(error.response?.data?.detail || "Login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <Container className="d-flex justify-content-center align-items-center vh-100">
        <Row>
          <Col md={12}>
            <Card className="p-4 shadow-lg login-card">
              <h2 className="text-center text-success mb-4">Welcome Back</h2>

              {error && <Alert variant="danger">{error}</Alert>}

              <Form onSubmit={handleSubmit}>
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
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Enter your password"
                    required
                  />
                  <Form.Text className="text-muted">
                    Password must include at least one special character (!@#$%^&*).
                  </Form.Text>
                </Form.Group>

                <Button variant="success" type="submit" className="w-100" disabled={loading}>
                  {loading ? "Logging in..." : "Login"}
                </Button>
              </Form>

              <p className="mt-3 text-center">
                Don't have an account?{" "}
                <Link to="/en-us/auth/farmlink/sign-up" className="text-success">
                  Sign up here
                </Link>
              </p>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Login;
