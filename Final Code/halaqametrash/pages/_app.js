import React from 'react';
import { Toaster } from 'react-hot-toast';
import Navbar from '../components/Navbar';
import '../styles/globals.css';

function MyApp({ Component, pageProps }) {
  const [user, setUser] = React.useState({});
  React.useEffect(() => {
    const user = JSON.parse(localStorage.getItem('$user')) || null;
    setUser(user);
  }, []);

  return (
    <>
      {user && <Navbar user={user} />}
      <Toaster />
      <Component {...pageProps} user={user} />
    </>
  );
}

export default MyApp;
