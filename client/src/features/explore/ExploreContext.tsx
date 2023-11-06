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
  /* 
  const createRecipe = async (recipe: RecipeRequest) => {
    const { data } = await apiClient.post('/recipes', recipe, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });
    setDrafts(prevState => [...prevState, data]);
  };

  const updateRecipe = async (recipe: RecipeRequest, id: string) => {
    const { data } = await apiClient.put(`/recipes?id=${id}`, recipe, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });
    setDrafts(prevState => prevState.map(draft => (draft._id === data._id ? data : draft)));
  };

  const deleteRecipe = async (recipe: Recipe) => {
    await apiClient.delete(`/recipes?id=${recipe._id}`);
    await getData();
  };
  const publishRecipe = async (recipe: Recipe) => {
    const { data } = await apiClient.post(`/recipes/publish?id=${recipe._id}`);
    setDrafts(prevState => prevState.filter(({ _id }) => _id !== recipe._id));
    setPublished(prevState => [...prevState, data]);
  };

  const unPublishRecipe = async (recipe: Recipe) => {
    const { data } = await apiClient.post(`/recipes/unpublish?id=${recipe._id}`);
    setPublished(prevState => prevState.filter(({ _id }) => _id !== recipe._id));
    setDrafts(prevState => [...prevState, data]);
  }; */
  const contextValue = useMemo(
    () => ({ recipes, loaded }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [recipes, loaded]
  );

  return <ExploreContext.Provider value={contextValue}>{children}</ExploreContext.Provider>;
};

export { ExploreProvider, useExploreContext };
