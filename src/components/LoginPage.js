import React, { useState } from 'react';
import { Button, Input, Form, Typography, Alert } from 'antd';
import liff from '@line/liff';

const { Title } = Typography;

const LoginPage = ({ onLoginSuccess }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = () => {
    // Retrieve credentials from environment variables
    const validUsername = process.env.REACT_APP_USERNAME;
    const validPassword = process.env.REACT_APP_PASSWORD;

    if (username === validUsername && password === validPassword) {
      setError('');
      onLoginSuccess();
    } else {
      setError(`Invalid username or password (${validUsername}).`);
    }
  };

  return (
    <div style={{ maxWidth: 400, margin: 'auto', padding: '50px 0' }}>
      <Title level={2}>Login</Title>
      <Form layout="vertical">
        <Form.Item label="Username">
          <Input
            placeholder="Enter your username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </Form.Item>
        <Form.Item label="Password">
          <Input.Password
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Item>
        {error && <Alert message={error} type="error" showIcon />}
        <Form.Item>
          <Button type="primary" onClick={handleLogin} block>
            Login
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default LoginPage;
