import { createContext, ReactNode, useContext, useEffect, useMemo, useState } from 'react';
import { z } from 'zod';

import apiClient from '@/api/Axios';

import { RecipeSchema } from './CreateRecipes';

export type RecipeRequest = z.infer<typeof RecipeSchema>;
export type Recipe = Omit<z.infer<typeof RecipeSchema>, 'image'> & { _id: string; image?: string };

type RecipeState = {
  recipes: Recipe[];
  isLoading: boolean;
  getData: () => Promise<void>;
  createRecipe: (recipe: RecipeRequest) => Promise<void>;
};

const initialState: RecipeState = {
  recipes: [],
  isLoading: false,
  getData: async () => new Promise(resolve => resolve()),
  createRecipe: () => new Promise(resolve => resolve())
};

const RecipeContext = createContext<RecipeState>(initialState);

const useRecipeContext = () => useContext(RecipeContext);

const RecipeProvider = ({ children }: { children: ReactNode }) => {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [isLoading, setIsloading] = useState<boolean>(false);

  const getData = async () => {
    setIsloading(true);
    const { data } = await apiClient.get('/recipes');
    setRecipes(data);
    setIsloading(false);
  };

  useEffect(() => {
    getData();
  }, []);

  const createRecipe = async (recipe: RecipeRequest) => {
    setIsloading(true);
    const { data } = await apiClient.post('/recipes', recipe, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });
    setRecipes(prevState => [...prevState, data]);
    setIsloading(false);
  };

  const contextValue = useMemo(() => ({ recipes, isLoading, getData, createRecipe }), [recipes, isLoading]);

  return <RecipeContext.Provider value={contextValue}>{children}</RecipeContext.Provider>;
};

export { RecipeProvider, useRecipeContext };
