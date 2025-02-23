import React from "react";
import { Navbar, Nav, Container, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
const FarmLinkNavbar = () => {
  return (
    <Navbar expand="lg" style={{ backgroundColor: "#228B22" }} variant="dark">
      <Container>
        <Navbar.Brand href="/" className="fw-bold">
          🚜 FarmLink
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarNav" />
        <Navbar.Collapse id="navbarNav">
          <Nav className="ms-auto">
            <Nav.Link  as={Link} to="/" className="text-white">Home</Nav.Link>
            <Nav.Link as={Link} to="/en-us/about-us" className="text-white">About</Nav.Link>
            <Nav.Link as={Link} to="/en-us/blogs" className="text-white">Blog</Nav.Link>
            <Nav.Link as={Link} to="/en-us/faqs" className="text-white">FAQs</Nav.Link>
            <Nav.Link as={Link} to="/en-us/contact_us" className="text-white">Contact Us</Nav.Link>
            {/* <Nav.Link as={Link} to="/getting-started" className="text-white">Getting Started</Nav.Link> */}
          </Nav>
          <div className="ms-3">
            <Link to='/en-us/auth/farmlink/login'><Button variant="outline-light" className="me-2">Login</Button></Link>
            <Link to="/en-us/auth/farmlink/sign-up"><Button variant="warning">Sign Up</Button></Link>
          </div>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default FarmLinkNavbar;
