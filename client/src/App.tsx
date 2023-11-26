import { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { ChevronLeft, LogOut } from 'lucide-react';

import { useAppContext } from './common/AppContext';
import logo from './common/assets/logo.png'
import { Button } from './common/components/Button';
import { useAuthContext } from './features/authentication/AuthContext';
import { ExploreProvider } from './features/explore/ExploreContext';
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
    <div className="h-[calc(100dvh)] w-screen">
      <div className="sticky top-0 grid w-full grid-cols-3 justify-between bg-primary p-2 items-center">
        {showBackButton && (
          <Button
            onClick={() => navigate(-1)}
            variant="link"
            size="sm"
            className="justify-self-start text-white">
            <ChevronLeft />
          </Button>
        )}
        <img src={logo} className='col-start-2 h-10 justify-self-center'/>
        {/* <h1 className="col-start-2 my-auto text-center text-lg font-bold text-primary-foreground">Meal Planner</h1> */}
        <Button onClick={logout} size="icon" className="col-start-3 justify-self-end">
          <LogOut className='h-5'></LogOut>
        </Button>
      </div>
      <main className="h-[calc(100%-52px-40px)] overflow-auto">
        <RecipeProvider>
          <ExploreProvider>
            <Outlet />
          </ExploreProvider>
        </RecipeProvider>
      </main>
      <NavBar />
    </div>
  );
};

export default ApplicationWrapper;
