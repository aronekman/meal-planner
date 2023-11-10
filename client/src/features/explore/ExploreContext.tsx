import { createContext, ReactNode, useContext, useEffect, useMemo, useState } from 'react';
import { z } from 'zod';

import apiClient from '@/api/Axios';

import { Recipe, RecipeSchema } from '../recipes/RecipeContext';

type ExploreState = {
  loaded: boolean;
  recipes: Recipe[];
};

const initialState: ExploreState = {
  loaded: false,
  recipes: []
};

const ExploreContext = createContext<ExploreState>(initialState);

const useExploreContext = () => useContext(ExploreContext);

const ExploreProvider = ({ children }: { children: ReactNode }) => {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [loaded, setLoaded] = useState<boolean>(false);

  const getData = async () => {
    const { data } = await apiClient.get('/recipes');
    setRecipes(z.array(RecipeSchema).parse(data));
    setLoaded(true);
  };

  useEffect(() => {
    getData();
  }, []);

  const contextValue = useMemo(
    () => ({ recipes, loaded }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [recipes, loaded]
  );

  return <ExploreContext.Provider value={contextValue}>{children}</ExploreContext.Provider>;
};

export { ExploreProvider, useExploreContext };
