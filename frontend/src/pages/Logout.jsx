// src/pages/Logout.jsx

import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

function Logout() {
  const navigate = useNavigate();

  useEffect(() => {
    // Clear login/session data
    localStorage.clear();

    // Show success toast
    toast.success('Logout Successful!');

    // Redirect to login page after toast
    const timeout = setTimeout(() => {
      navigate('/signin');
    }, 1500);

    return () => clearTimeout(timeout); // Cleanup
  }, [navigate]);

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h2>Logging out...</h2>
    </div>
  );
}

export default Logout;
