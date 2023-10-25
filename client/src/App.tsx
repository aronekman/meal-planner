import { useEffect } from 'react';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import { ChevronLeft } from 'lucide-react';

import { useAppContext } from './common/AppContext';
import { Button } from './common/components/Button';
import { useAuthContext } from './features/authentication/AuthContext';

const ApplicationWrapper = () => {
  const {
    data: { isLoading, isLoggedIn },
    logout
  } = useAuthContext();
  const { showBackButton } = useAppContext();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoading && !isLoggedIn) {
      navigate('/login');
    }
  }, [isLoading, isLoggedIn, navigate]);

  if (isLoading || !isLoggedIn) return null;
  return (
    <div className="h-screen w-screen">
      <nav className="sticky top-0 grid w-full grid-cols-3 justify-between bg-primary p-2">
        {showBackButton && (
          <Button asChild variant="link" size="sm" className="justify-self-start text-secondary-foreground">
            <Link to="../">
              <ChevronLeft /> Back
            </Link>
          </Button>
        )}
        <h1 className="col-start-2 my-auto text-center text-lg font-bold text-primary-foreground">Meal Planner</h1>
        <Button onClick={logout} variant="secondary" size="sm" className="col-start-3 justify-self-end">
          Log Out
        </Button>
      </nav>
      <main className="h-[calc(100vh-52px)] ">
        <Outlet />
      </main>
    </div>
  );
};

export default ApplicationWrapper;
