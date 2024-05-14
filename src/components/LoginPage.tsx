import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../actions/authActions";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import "./Auth.css";
import { RootState } from "../reducers"; // Імпортуємо RootState для типізації

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate(); // Використовуємо useNavigate
  const user = useSelector((state: RootState) => state.user.user); // Отримуємо користувача з Redux

  useEffect(() => {
    if (user) {
      navigate("/chat"); 
    }
  }, [user, navigate]);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    console.log("Форма відправлена", { email, password });
    dispatch(loginUser({ email, password }) as any);
  };

  return (
    <Container className="auth-container">
      <Row className="justify-content-md-center">
        <Col md={6}>
          <h2>Login</h2>
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
            <Form.Group controlId="formPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </Form.Group>
            <Button variant="primary" type="submit" className="auth-button">
              Login
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default LoginPage;
