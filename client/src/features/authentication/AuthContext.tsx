import { createContext, ReactNode, useContext, useEffect, useMemo, useState } from 'react';

import { apiClient } from '../../common/utils/apiUtils';

type TokenPair = {
  access: string;
  refresh: string;
};

type AuthState = {
  isLoading: boolean;
  isLoggedIn: boolean;
  tokens: TokenPair | null;
  login: (username: string, password: string) => Promise<boolean>;
  logout: () => void;
  refresh: (refreshToken: string) => void;
};

const initialState: AuthState = {
  isLoading: true,
  isLoggedIn: false,
  tokens: null,
  login: async () => false,
  logout: () => null,
  refresh: () => null
};

const AuthContext = createContext<AuthState>(initialState);

const useAuthContext = () => useContext(AuthContext);

const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [tokens, setTokens] = useState<TokenPair | null>(null);

  const refreshTokenAsync = async (refreshToken: string) => {
    setIsLoading(true);
    try {
      const response = await apiClient.post('/refreshToken', { refreshToken });
      setTokens({ refresh: refreshToken, access: response.data });
      setIsLoggedIn(true);
    } catch (error) {
      setIsLoggedIn(false);
      localStorage.removeItem('REFRESH_TOKEN');
    }
    setIsLoading(false);
  };

  const authenticateAsync = async (username: string, password: string) => {
    try {
      setIsLoading(true);
      const { data } = await apiClient.post('/login', { username, password });
      if (data.accessToken && data.refreshToken) {
        setTokens({ access: data.accessToken, refresh: data.refreshToken });
      }
      localStorage.setItem('REFRESH_TOKEN', data.refreshToken);
      setIsLoading(false);
      setIsLoggedIn(true);
      return true;
    } catch (error) {
      return false;
    }
  };

  const logout = async () => {
    if (!tokens) return;
    await apiClient.delete('/refreshToken', { data: { refreshToken: tokens.refresh } });
  };

  useEffect(() => {
    const cachedToken = localStorage.getItem('REFRESH_TOKEN');
    console.log(cachedToken);
    if (cachedToken) {
      refreshTokenAsync(cachedToken);
    }
    setIsLoading(false);
    setIsLoggedIn(false);
  }, []);

  const contextValue = useMemo(
    () => ({ isLoading, isLoggedIn, tokens, login: authenticateAsync, refresh: refreshTokenAsync, logout }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [isLoading, isLoggedIn, tokens]
  );

  return <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>;
};

export { AuthProvider, useAuthContext };
