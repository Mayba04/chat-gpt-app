import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { loginUser } from "../actions/authActions";
import { Container, Form, Button, Alert } from "react-bootstrap";
import { RootState } from "../reducers";
import * as Yup from 'yup';
import { useFormik } from 'formik';
import "./Auth.css";

// Схема валідації
const validationSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email format').required('Email is required'),
  password: Yup.string()
    .required('Password is required')
    .min(6, 'Password must be at least 6 characters')
    .matches(/^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/, 'Password must contain at least one uppercase letter, one number, and one special character'),
});

const LoginPage: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state: RootState) => state.user.user);
  const authError = useSelector((state: RootState) => state.user.error);

  useEffect(() => {
    if (user) {
      const role = localStorage.getItem("role");
      if (role === "Admin") {
        navigate("/pending-verification-sessions");
      } else {
        navigate("/chat");
      }
    }
  }, [user, navigate]);

  useEffect(() => {
    if (authError) {
      formik.setSubmitting(false);
      formik.setErrors({ password: authError });
    }
  }, [authError]);

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema,
    onSubmit: (values, { setSubmitting }) => {
      setErrorMessage(null);
      dispatch(loginUser(values) as any)
        .catch(() => {
          setErrorMessage("Failed to login. Please check your credentials.");
          setSubmitting(false);
        });
    },
  });

  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  return (
    <Container className="auth-container">
      <Form onSubmit={formik.handleSubmit} className="auth-form">
        <h2 className="text-center">Login</h2>
        {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}
        <Form.Group controlId="formEmail">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            name="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            isInvalid={!!formik.errors.email && formik.touched.email}
            required
          />
          <Form.Control.Feedback type="invalid">
            {formik.errors.email}
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group controlId="formPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            name="password"
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            isInvalid={!!formik.errors.password && formik.touched.password}
            required
          />
          <Form.Control.Feedback type="invalid">
            {formik.errors.password}
          </Form.Control.Feedback>
        </Form.Group>
        <Button variant="primary" type="submit" className="auth-button" disabled={formik.isSubmitting}>
          Login
        </Button>
        <div className="text-center mt-3">
          <Link to="/register">Don't have an account? Register here</Link>
        </div>
      </Form>
    </Container>
  );
};

export default LoginPage;
