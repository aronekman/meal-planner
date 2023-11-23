import { ReactNode, useEffect } from 'react';
import axios, { InternalAxiosRequestConfig } from 'axios';

import config from '@/config';
import { useAuthContext } from '@/features/authentication/AuthContext';

const apiClient = axios.create({
  baseURL: `${config.baseUrl}/api`
});

const AxiosWrapper = ({ children }: { children: ReactNode }) => {
  const { logout } = useAuthContext();
  useEffect(() => {
    const requestHandler = (config: InternalAxiosRequestConfig) => {
      const token = localStorage.getItem('ACCESS_TOKEN');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    };

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const responseErrorHandler = async (error: any) => {
      if (!axios.isCancel(error) && axios.isAxiosError(error) && error.response?.status === 401) {
        if (!error.config?.headers || error.config.headers['No-Retry']) {
          return Promise.reject(error);
        }
        try {
          const refreshToken = localStorage.getItem('REFRESH_TOKEN');
          if (refreshToken) {
            const { data: newToken } = await apiClient.post(
              '/refreshToken',
              { refreshToken },
              { headers: { 'No-Retry': 'true' } }
            );
            localStorage.setItem('ACCESS_TOKEN', newToken);
            error.config.headers.Authorization = `Bearer ${newToken}`;
            return axios(error.config);
          } else {
            logout();
          }
        } catch (error) {
          logout();
        }
      }
      return Promise.reject(error);
    };

    const requestInterceptor = apiClient.interceptors.request.use(requestHandler, error => Promise.reject(error));
    const responseInterceptor = apiClient.interceptors.response.use(response => {
      return response;
    }, responseErrorHandler);

    return () => {
      apiClient.interceptors.request.eject(requestInterceptor);
      apiClient.interceptors.response.eject(responseInterceptor);
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return children;
};

export default apiClient;
export { AxiosWrapper };
