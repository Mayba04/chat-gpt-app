import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { message, Spin, Typography, Card } from "antd";
import { LoadingOutlined } from '@ant-design/icons';
import { confirmEmail } from "../services/api-user-service";

const { Title, Paragraph } = Typography;

const ConfirmEmailPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const userId = params.get("userid");
    const token = params.get("token");

    const handleConfirmEmail = async () => {
      if (!userId || !token) {
        message.error("Invalid confirmation link.");
        return;
      }

      try {
        const data = await confirmEmail(userId, token);
        message.success(data.message);
        navigate("/login");
      } catch (error) {
        message.error("Failed to confirm email.");
      }
    };

    handleConfirmEmail();
  }, [location, navigate]);

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <Card style={{ maxWidth: '400px', width: '100%', textAlign: 'center', padding: '20px' }}>
        <Spin indicator={antIcon} />
        <Title level={3}>Confirming email...</Title>
        <Paragraph>Please wait while we confirm your email.</Paragraph>
      </Card>
    </div>
  );
};

export default ConfirmEmailPage;
