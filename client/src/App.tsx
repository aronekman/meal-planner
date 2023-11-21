import { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { ChevronLeft, LogOut } from 'lucide-react';

import { useAppContext } from './common/AppContext';
import { Button } from './common/components/Button';
import { useAuthContext } from './features/authentication/AuthContext';
import NavBar from './features/navigation/NavBar';
import { RecipeProvider } from './features/recipes/RecipeContext';

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
    <div className='h-[calc(100dvh)] w-screen'>
      <div className='sticky top-0 grid w-full grid-cols-3 justify-between bg-primary p-2'>
        {showBackButton && (
          <Button
            onClick={() => navigate(-1)}
            variant='link'
            size='sm'
            className='justify-self-start text-secondary-foreground'>
            <ChevronLeft /> Back
          </Button>
        )}
        <h1 className='col-start-2 my-auto text-center text-lg font-bold text-primary-foreground'>Meal Planner</h1>
        <Button onClick={logout} size='sm' className='col-start-3 justify-self-end'>
          <LogOut></LogOut>
        </Button>
      </div>
      <main className='h-[calc(100%-52px-40px)] overflow-auto'>
        <RecipeProvider>
          <Outlet />
        </RecipeProvider>
      </main>
      <NavBar />
    </div>
  );
};

export default ApplicationWrapper;
