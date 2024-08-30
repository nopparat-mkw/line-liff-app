import React, { useEffect, useState } from 'react';
import liff from '@line/liff';
import LoginPage from './components/LoginPage';
import HomePage from './components/HomePage';

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const initLiff = async () => {
      try {
        await liff.init({ liffId: process.env.REACT_APP_LIFF_ID });

        if (liff.isInClient()) {
          const queryString = new URLSearchParams(window.location.search);
          const message = queryString.get('message');

          if (message === 'login') {
            setIsLoggedIn(false);
          } else if (message === 'test') {
            setIsLoggedIn(true);
          }
        }
      } catch (error) {
        console.error('LIFF initialization failed', error);
      }
    };

    initLiff();
  }, []);

  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
    if (liff.isInClient()) {
      liff.sendMessages([
        {
          type: 'text',
          text: 'Login success!',
        },
      ]);
    }
  };

  return (
    <div className="App">
      {isLoggedIn ? <HomePage /> : <LoginPage onLoginSuccess={handleLoginSuccess} />}
    </div>
  );
};

export default App;
