import React from 'react';
import Login from './Login';

export default function Home() {
  const [user, setUser] = React.useState({});
  React.useEffect(() => {
    const user = JSON.parse(localStorage.getItem('$user'));
    setUser(user);
  }, []);
  return (
    <div>
      <Login user={user} />
    </div>
  );
}
