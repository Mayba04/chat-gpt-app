import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../actions/authActions";
import { Container, Form, Button } from "react-bootstrap";
import "./Auth.css";
import { RootState } from "../reducers";

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state: RootState) => state.user.user);

  useEffect(() => {
    if (user) {
      const role = localStorage.getItem('role');
      if (role === 'Admin') {
        navigate("/pending-verification-sessions");
      } else {
        navigate("/chat");
      }
    }
  }, [user, navigate]);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    dispatch(loginUser({ email, password }) as any);
    
  };

  return (
    <Container className="auth-container">
      <Form onSubmit={handleSubmit} className="auth-form">
        <h2 className="text-center">Login</h2>
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
    </Container>
  );
};

export default LoginPage;
