import { createContext, ReactNode, useContext, useMemo, useState } from 'react';

type AppData = {
  showBackButton: boolean;
};

type AppState = AppData & {
  setAppData: (params: Partial<AppData>) => void;
};

const initialState: AppState = {
  showBackButton: false,
  setAppData: () => null
};

const AppContext = createContext<AppState>(initialState);

const useAppContext = () => useContext(AppContext);

const AppProvider = ({ children }: { children: ReactNode }) => {
  const [data, setData] = useState<AppData>({ showBackButton: false });

  const setAppData = (params: Partial<AppData>) => {
    setData(prevState => ({ ...prevState, ...params }));
  };

  const contextValue: AppState = useMemo(() => ({ ...data, setAppData }), [data]);
  return <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>;
};

export { AppProvider, useAppContext };
