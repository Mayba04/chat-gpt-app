import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../reducers';
import { Form, Input, Button, Row, Col, Avatar, message, Upload } from 'antd';
import { updateUserProfile, updatePassword } from '../actions/userActions';
import { UploadOutlined } from '@ant-design/icons';
import './ProfilePage.css';

const ProfilePage: React.FC = () => {
  const user = useSelector((state: RootState) => state.user.user);
  const dispatch = useDispatch();

  const [formProfile] = Form.useForm();
  const [formPassword] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [fileList, setFileList] = useState<any[]>([]);

  useEffect(() => {
    if (user) {
      formProfile.setFieldsValue({
        email: user.email,
        firstName: user.FirstName,
        lastName: user.LastName,
        phone: user.Phone,
      });
    }
  }, [user, formProfile]);

  const handleFinishProfile = (values: any) => {
    setLoading(true);
    const formData = new FormData();
    formData.append('Id', user.Id.toString());
    formData.append('Email', user.email);
    formData.append('RoleName', user.roles);
    formData.append('PhoneNumber', values.phone);
    formData.append('FirstName', values.firstName);
    formData.append('LastName', values.lastName);
    if (fileList.length > 0) {
      formData.append('ImageFile', fileList[0].originFileObj);
    }

    dispatch(updateUserProfile(formData) as any)
      .then(() => {
        message.success('Profile updated successfully');
        setLoading(false);
      })
      .catch((error: any) => {
        if (error.response && error.response.data && error.response.data.message) {
          message.error(`Failed to update profile: ${error.response.data.message}`);
        } else {
          message.error('Failed to update profile');
        }
        setLoading(false);
      });
  };

  const handleFinishPassword = (values: any) => {
    setLoading(true);
    const formData = new FormData();
    formData.append('Id', user.Id.toString());
    formData.append('CurrentPassword', values.currentPassword);
    formData.append('NewPassword', values.newPassword);
    formData.append('ConfirmPassword', values.confirmNewPassword);

    dispatch(updatePassword(formData) as any)
      .then(() => {
        message.success('Password updated successfully');
        setLoading(false);
      })
      .catch((error: any) => {
        if (error.response && error.response.data && error.response.data.message) {
          message.error(`Failed to update password: ${error.response.data.message}`);
        } else {
          message.error('Failed to update password');
        }
        setLoading(false);
      });
  };

  const handleUploadChange = ({ fileList }: any) => setFileList(fileList);

  return (
    <div className="profile-page">
      <h2>Profile</h2>
      <Form form={formProfile} layout="vertical" onFinish={handleFinishProfile}>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item label="Email" name="email">
              <Input disabled />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="Phone" name="phone">
              <Input />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item label="First Name" name="firstName">
              <Input />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="Last Name" name="lastName">
              <Input />
            </Form.Item>
          </Col>
        </Row>
        <Form.Item label="Profile Picture">
          <div className="profile-picture">
            <Avatar src={`https://localhost:7004/images/600_${user.image}`} size={64} />
          </div>
          <Upload
            fileList={fileList}
            beforeUpload={() => false}
            onChange={handleUploadChange}
            listType="picture"
          >
            <Button icon={<UploadOutlined />}>Upload</Button>
          </Upload>
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" loading={loading}>
            Save Changes
          </Button>
        </Form.Item>
      </Form>

      <Form form={formPassword} layout="vertical" onFinish={handleFinishPassword}>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              label="Current Password"
              name="currentPassword"
              
              rules={[
                { required: true, message: 'Please enter your current password'  },
                { min: 6, message: 'Password must be at least 6 characters long' },
                {
                  pattern: /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/,
                  message: 'Password must contain at least one uppercase letter, one number, and one special character',
                },
              ]}
            >
              <Input.Password />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label="New Password"
              name="newPassword"
              rules={[
                { required: true, message: 'Please enter your new password' },
                { min: 6, message: 'Password must be at least 6 characters long' },
                {
                  pattern: /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/,
                  message: 'Password must contain at least one uppercase letter, one number, and one special character',
                },
              ]}
            >
              <Input.Password />
            </Form.Item>
          </Col>
        </Row>
        <Form.Item
          label="Confirm New Password"
          name="confirmNewPassword"
          rules={[
            { required: true, message: 'Please confirm your new password'  },
            { min: 6, message: 'Password must be at least 6 characters long' },
            {
              pattern: /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/,
              message: 'Password must contain at least one uppercase letter, one number, and one special character',
            },
          ]}
        >
          <Input.Password />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" loading={loading}>
            Save New Password
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default ProfilePage;
