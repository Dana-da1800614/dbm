import { useRouter } from 'next/router';
import React from 'react';
import toast from 'react-hot-toast';

const Dashboard = ({ user }) => {
  const router = useRouter();
  React.useEffect(() => {
    if (!user) {
      router.push('/');
      toast.error('Unauthorized!');
    }
  }, [user, router]);
  return <div>dashboard {user?.role}</div>;
};

export default Dashboard;
