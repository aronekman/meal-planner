import { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';

import { Button } from './common/components/Button';
import { useAuthContext } from './features/authentication/AuthContext';

const ApplicationWrapper = () => {
  const {
    data: { isLoading, isLoggedIn },
    logout
  } = useAuthContext();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoading && !isLoggedIn) {
      navigate('/login');
    }
  }, [isLoading, isLoggedIn, navigate]);

  if (isLoading || !isLoggedIn) return null;
  return (
    <div>
      <div className="bg flex justify-between bg-primary p-2">
        <h1 className="my-auto text-lg font-bold text-primary-foreground">Meal Planner</h1>
        <Button onClick={logout} variant="secondary" size="sm">
          Log Out
        </Button>
      </div>
      <Outlet />
    </div>
  );
};

export default ApplicationWrapper;
