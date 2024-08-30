import React, { useState, useEffect } from 'react';
import { Card, Typography } from 'antd';
import liff from '@line/liff';

const { Title, Text } = Typography;

const HomePage = () => {
  const [userInfo, setUserInfo] = useState({
    displayName: '',
    phoneNumber: '',
    email: '',
  });

  useEffect(() => {
    const getUserProfile = async () => {
      try {
        await liff.ready;
        const profile = await liff.getProfile();
        setUserInfo({
          displayName: profile.displayName,
          phoneNumber: liff.getDecodedIDToken().phone_number || '',
          email: liff.getDecodedIDToken().email || '',
        });
      } catch (error) {
        console.error('Error getting user profile', error);
      }
    };

    getUserProfile();
  }, []);

  return (
    <div style={{ maxWidth: 600, margin: 'auto', padding: '50px 0' }}>
      <Card>
        <Title level={2}>Home Page</Title>
        <Text strong>Username: </Text>
        <Text>{userInfo.displayName}</Text>
        <br />
        {userInfo.phoneNumber && (
          <>
            <Text strong>Phone: </Text>
            <Text>{userInfo.phoneNumber}</Text>
            <br />
          </>
        )}
        {userInfo.email && (
          <>
            <Text strong>Email: </Text>
            <Text>{userInfo.email}</Text>
          </>
        )}
      </Card>
    </div>
  );
};

export default HomePage;
