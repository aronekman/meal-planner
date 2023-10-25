import { createContext, ReactNode, useContext, useEffect, useMemo, useState } from 'react';
import { z } from 'zod';

import apiClient from '@/api/Axios';

import { RecipeSchema } from './components/RecipeForm';

export type RecipeRequest = z.infer<typeof RecipeSchema>;
export type Recipe = Omit<z.infer<typeof RecipeSchema>, 'image'> & { _id: string; image?: string };

type RecipeState = {
  drafts: Recipe[];
  published: Recipe[];
  loaded: boolean;
  getData: () => Promise<void>;
  createRecipe: (recipe: RecipeRequest) => Promise<void>;
};

const initialState: RecipeState = {
  drafts: [],
  published: [],
  loaded: false,
  getData: async () => new Promise(resolve => resolve()),
  createRecipe: () => new Promise(resolve => resolve())
};

const RecipeContext = createContext<RecipeState>(initialState);

const useRecipeContext = () => useContext(RecipeContext);

const RecipeProvider = ({ children }: { children: ReactNode }) => {
  const [drafts, setDrafts] = useState<Recipe[]>([]);
  const [published, setPublished] = useState<Recipe[]>([]);

  const [loaded, setLoaded] = useState<boolean>(false);

  const getData = async () => {
    const draftsResponse = await apiClient.get('/recipes/drafts');
    const publishedResponse = await apiClient.get('/recipes/published');
    setDrafts(draftsResponse.data);
    setPublished(publishedResponse.data);
    setLoaded(true);
  };

  useEffect(() => {
    getData();
  }, []);

  const createRecipe = async (recipe: RecipeRequest) => {
    const { data } = await apiClient.post('/recipes', recipe, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });
    setDrafts(prevState => [...prevState, data]);
  };

  const contextValue = useMemo(
    () => ({ drafts, published, loaded, getData, createRecipe }),
    [drafts, published, loaded]
  );

  return <RecipeContext.Provider value={contextValue}>{children}</RecipeContext.Provider>;
};

export { RecipeProvider, useRecipeContext };
