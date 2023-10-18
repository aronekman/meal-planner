import { Outlet } from 'react-router-dom';

import { AxiosWrapper } from '@/api/Axios';
import { AuthProvider } from '@/features/authentication/AuthContext';

import Toaster from './components/Toaster';

const AppLayout = () => {
  return (
    <AuthProvider>
      <AxiosWrapper>
        <main>
          <Outlet />
        </main>
        <Toaster />
      </AxiosWrapper>
    </AuthProvider>
  );
};

export default AppLayout;
