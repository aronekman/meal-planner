import { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';

import { Button } from './common/components/Button';
import { useAuthContext } from './features/authentication/AuthContext';

const ApplicationWrapper = () => {
  const { isLoading, isLoggedIn, logout } = useAuthContext();
  const navigate = useNavigate();

  useEffect(() => {
    console.log(isLoading, isLoggedIn);
    if (!isLoading && !isLoggedIn) {
      navigate('/login');
    }
  }, [isLoading, isLoggedIn, navigate]);

  const handleLogOut = () => {
    logout();
    navigate('/login');
  };

  if (isLoading) return null;
  return (
    <div>
      <div className="flex justify-end">
        <Button onClick={handleLogOut}>Log Out</Button>
      </div>
      <h1>Logged In</h1>
      <Outlet />
    </div>
  );
};

export default ApplicationWrapper;
