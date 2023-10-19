import { createContext, ReactNode, useContext, useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import apiClient from '@/api/Axios';
type AuthData = { isLoading: boolean; isLoggedIn: boolean };

type AuthState = {
  data: AuthData;
  login: (username: string, password: string) => Promise<boolean>;
  logout: () => void;
  refresh: (refreshToken: string) => Promise<string>;
};

const initialState: AuthState = {
  data: {
    isLoading: true,
    isLoggedIn: false
  },
  login: async () => false,
  logout: () => null,
  refresh: async () => ''
};

const AuthContext = createContext<AuthState>(initialState);

const useAuthContext = () => useContext(AuthContext);

const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [data, setData] = useState<AuthData>({ isLoading: true, isLoggedIn: false });
  const navigate = useNavigate();

  const refreshTokenAsync = async (refreshToken: string, is_retry?: boolean) => {
    setData({ ...data, isLoading: true });
    try {
      const response = await apiClient.post(
        '/refreshToken',
        { refreshToken },
        { headers: is_retry ? { 'No-Retry': 'true' } : {} }
      );
      localStorage.setItem('ACCESS_TOKEN', response.data);
      setData({ isLoggedIn: true, isLoading: false });
      return response.data;
    } catch (error) {
      localStorage.removeItem('REFRESH_TOKEN');
      localStorage.removeItem('ACCESS_TOKEN');
      setData({ isLoading: false, isLoggedIn: false });
      throw new Error('Failed to refresh token');
    }
  };

  const authenticateAsync = async (username: string, password: string) => {
    try {
      setData({ ...data, isLoading: true });
      const response = await apiClient.post('/login', { username, password });

      localStorage.setItem('REFRESH_TOKEN', response.data.refreshToken);
      localStorage.setItem('ACCESS_TOKEN', response.data.accessToken);
      setData({
        isLoading: false,
        isLoggedIn: true
      });

      return true;
    } catch (error) {
      return false;
    }
  };

  const logout = async () => {
    const cachedToken = localStorage.getItem('REFRESH_TOKEN');
    localStorage.removeItem('REFRESH_TOKEN');
    localStorage.removeItem('ACCESS_TOKEN');
    if (cachedToken) {
      apiClient.delete('/refreshToken', { data: { refreshToken: cachedToken } });
    }
    navigate('/login');
  };

  useEffect(() => {
    const cachedToken = localStorage.getItem('REFRESH_TOKEN');
    if (cachedToken) {
      refreshTokenAsync(cachedToken);
      return;
    }
    setData({ isLoading: false, isLoggedIn: false });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const contextValue = useMemo(
    () => ({ data, login: authenticateAsync, refresh: refreshTokenAsync, logout }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [data]
  );

  return <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>;
};

export { AuthProvider, useAuthContext };
