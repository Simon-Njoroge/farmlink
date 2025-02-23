import React, { useEffect, useState } from "react";
import { Container, Row, Col, Card, Spinner } from "react-bootstrap";

const Blog = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:8000/api/blog/")
      .then((response) => response.json())
      .then((data) => {
        setBlogs(data);
        setLoading(false);
      })
      .catch((error) => console.error("Error fetching blogs:", error));
  }, []);

  return (
    <Container className="mt-5">
      <h2 className="text-center mb-4 text-success">Farm Link Blog</h2>
      {loading ? (
        <div className="text-center">
          <Spinner animation="border" variant="success" />
        </div>
      ) : (
        <Row>
          {blogs.map((blog) => (
            <Col md={4} key={blog.id} className="mb-4">
              <Card className="shadow-sm">
                <Card.Body>
                  <Card.Title className="text-success">{blog.title}</Card.Title>
                  <Card.Text>{blog.content.slice(0, 100)}...</Card.Text>
                  <Card.Text className="text-muted">
                    <small>By {blog.author} | {new Date(blog.created_at).toDateString()}</small>
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      )}
    </Container>
  );
};

export default Blog;
