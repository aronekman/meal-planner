import { Outlet } from 'react-router-dom';

import { AxiosWrapper } from '@/api/Axios';
import { AuthProvider } from '@/features/authentication/AuthContext';

import Toaster from './components/Toaster';
import { AppProvider } from './AppContext';

const AppLayout = () => {
  return (
    <AuthProvider>
      <AxiosWrapper>
        <AppProvider>
          <main>
            <Outlet />
          </main>
          <Toaster />
        </AppProvider>
      </AxiosWrapper>
    </AuthProvider>
  );
};

export default AppLayout;
