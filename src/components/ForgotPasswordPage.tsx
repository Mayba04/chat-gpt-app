import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { forgotPasswordA } from "../actions/authActions";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import "./Auth.css"; // Додаємо файл зі стилями

const ForgotPasswordPage: React.FC = () => {
  const [email, setEmail] = useState("");
  const dispatch = useDispatch();

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    dispatch(forgotPasswordA(email) as any);
  };

  return (
    <Container className="auth-container">
      <Row className="justify-content-md-center">
        <Col md={6}>
          <h2>Forgot Password</h2>
          <Form onSubmit={handleSubmit} className="auth-form">
            <Form.Group controlId="formEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </Form.Group>
            <Button variant="primary" type="submit" className="auth-button">
              Send Reset Link
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default ForgotPasswordPage;
