import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { Form, Input, Button, Alert, Upload, message } from "antd";
import { UploadOutlined } from '@ant-design/icons';
import { RootState } from "../reducers";
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { registerUser } from "../actions/authActions";
import "./Auth.css";

const validationSchema = Yup.object().shape({
  firstName: Yup.string().required('First name is required'),
  lastName: Yup.string().required('Last name is required'),
  email: Yup.string().email('Invalid email format').required('Email is required'),
  password: Yup.string()
    .required('Password is required')
    .min(6, 'Password must be at least 6 characters')
    .matches(/^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/, 'Password must contain at least one uppercase letter, one number, and one special character'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password'), undefined], 'Passwords must match')
    .required('Confirm Password is required'),
  phoneNumber: Yup.string().required('Phone number is required'),
  imageFile: Yup.mixed().nullable()
});

const RegisterPage: React.FC = () => {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [fileList, setFileList] = useState<any[]>([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state: RootState) => state.user.user);
  const authError = useSelector((state: RootState) => state.user.error);

  useEffect(() => {
    if (user) {
      navigate("/login");
    }
  }, [user, navigate]);

  const formik = useFormik({
    initialValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      confirmPassword: '',
      phoneNumber: '',
      imageFile: null,
    },
    validationSchema,
    onSubmit: async (values, { setSubmitting }) => {
      const formData = new FormData();
      formData.append('FirstName', values.firstName);
      formData.append('LastName', values.lastName);
      formData.append('Email', values.email);
      formData.append('Role', '2');  // Default role as user
      formData.append('Password', values.password);
      formData.append('ConfirmPassword', values.confirmPassword);
      formData.append('PhoneNumber', values.phoneNumber);
      if (values.imageFile) {
        formData.append('ImageFile', values.imageFile);
      }

      try {
        await dispatch(registerUser(formData) as any);
        message.success("Registration successful!");
        setErrorMessage(null);
        navigate("/login");
      } catch (error: any) {
        setErrorMessage(error.message || "Registration failed. Please check your details and try again.");
        setSubmitting(false);
      }
    },
  });

  const handleUploadChange = ({ fileList }: any) => {
    setFileList(fileList);
    if (fileList.length > 0) {
      formik.setFieldValue("imageFile", fileList[0].originFileObj);
    } else {
      formik.setFieldValue("imageFile", null);
    }
  };

  return (
    <div className="auth-container">
      <Form
        onFinish={formik.handleSubmit}
        className="auth-form"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
      >
        <h2 className="text-center">Register</h2>
        {errorMessage && <Alert message={errorMessage} type="error" />}
        <Form.Item
          label="First Name"
          validateStatus={formik.touched.firstName && formik.errors.firstName ? 'error' : ''}
          help={formik.touched.firstName && formik.errors.firstName ? formik.errors.firstName : ''}
        >
          <Input
            name="firstName"
            value={formik.values.firstName}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
        </Form.Item>
        <Form.Item
          label="Last Name"
          validateStatus={formik.touched.lastName && formik.errors.lastName ? 'error' : ''}
          help={formik.touched.lastName && formik.errors.lastName ? formik.errors.lastName : ''}
        >
          <Input
            name="lastName"
            value={formik.values.lastName}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
        </Form.Item>
        <Form.Item
          label="Email"
          validateStatus={formik.touched.email && formik.errors.email ? 'error' : ''}
          help={formik.touched.email && formik.errors.email ? formik.errors.email : ''}
        >
          <Input
            name="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
        </Form.Item>
        <Form.Item
          label="Phone Number"
          validateStatus={formik.touched.phoneNumber && formik.errors.phoneNumber ? 'error' : ''}
          help={formik.touched.phoneNumber && formik.errors.phoneNumber ? formik.errors.phoneNumber : ''}
        >
          <Input
            name="phoneNumber"
            value={formik.values.phoneNumber}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
        </Form.Item>
        <Form.Item
          label="Password"
          validateStatus={formik.touched.password && formik.errors.password ? 'error' : ''}
          help={formik.touched.password && formik.errors.password ? formik.errors.password : ''}
        >
          <Input.Password
            name="password"
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
        </Form.Item>
        <Form.Item
          label="Confirm Password"
          validateStatus={formik.touched.confirmPassword && formik.errors.confirmPassword ? 'error' : ''}
          help={formik.touched.confirmPassword && formik.errors.confirmPassword ? formik.errors.confirmPassword : ''}
        >
          <Input.Password
            name="confirmPassword"
            value={formik.values.confirmPassword}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
        </Form.Item>
        <Form.Item label="Profile Picture">
          <Upload
            fileList={fileList}
            beforeUpload={() => false}
            onChange={handleUploadChange}
            listType="picture"
          >
            <Button icon={<UploadOutlined />}>Upload</Button>
          </Upload>
        </Form.Item>
        <Form.Item wrapperCol={{ span: 16, offset: 8 }}>
          <Button type="primary" htmlType="submit" className="auth-button" loading={formik.isSubmitting}>
            Register
          </Button>
        </Form.Item>
        <div className="text-center mt-3">
          <Link to="/login">Already have an account? Login here</Link>
        </div>
      </Form>
    </div>
  );
};

export default RegisterPage;
