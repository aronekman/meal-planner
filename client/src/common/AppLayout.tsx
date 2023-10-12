import { Outlet } from 'react-router-dom';

import { AuthProvider } from '@/features/authentication/AuthContext';

import Toaster from './components/Toaster';

const AppLayout = () => {
  return (
    <AuthProvider>
      <main>
        <Outlet />
      </main>
      <Toaster />
    </AuthProvider>
  );
};

export default AppLayout;
