import { createContext, ReactNode, useContext, useEffect, useMemo, useState } from 'react';
import { z } from 'zod';

import apiClient from '@/api/Axios';

import { RecipeRequestSchema } from './components/RecipeForm';

export type RecipeRequest = z.infer<typeof RecipeRequestSchema>;
export const RecipeSchema = RecipeRequestSchema.extend({
  image: z.string().optional(),
  _id: z.string(),
  time: z.number().int().optional(),
  cost: z.number().optional()
});
export type Recipe = z.infer<typeof RecipeSchema>;

type RecipeState = {
  drafts: Recipe[];
  published: Recipe[];
  saved: Recipe[];
  loaded: boolean;
  getData: () => Promise<void>;
  createRecipe: (recipe: RecipeRequest) => Promise<void>;
  updateRecipe: (recipe: RecipeRequest, id: string) => Promise<void>;
  deleteRecipe: (recipe: Recipe) => Promise<void>;
  publishRecipe: (recipe: Recipe) => Promise<void>;
  unPublishRecipe: (recipe: Recipe) => Promise<void>;
  saveRecipe: (recipe: Recipe) => Promise<void>;
  unSaveRecipe: (recipe: Recipe) => Promise<void>;
};

const initialState: RecipeState = {
  drafts: [],
  published: [],
  saved: [],
  loaded: false,
  getData: async () => new Promise(resolve => resolve()),
  createRecipe: () => new Promise(resolve => resolve()),
  updateRecipe: () => new Promise(resolve => resolve()),
  deleteRecipe: () => new Promise(resolve => resolve()),
  publishRecipe: () => new Promise(resolve => resolve()),
  unPublishRecipe: () => new Promise(resolve => resolve()),
  saveRecipe: () => new Promise(resolve => resolve()),
  unSaveRecipe: () => new Promise(resolve => resolve())
};

const RecipeContext = createContext<RecipeState>(initialState);

const useRecipeContext = () => useContext(RecipeContext);

const RecipeProvider = ({ children }: { children: ReactNode }) => {
  const [drafts, setDrafts] = useState<Recipe[]>([]);
  const [published, setPublished] = useState<Recipe[]>([]);
  const [saved, setSaved] = useState<Recipe[]>([]);

  const [loaded, setLoaded] = useState<boolean>(false);

  const getData = async () => {
    const draftsResponse = await apiClient.get('/recipes/drafts');
    const publishedResponse = await apiClient.get('/recipes/published');
    const savedResponse = await apiClient.get('/recipes/saved');
    setDrafts(z.array(RecipeSchema).parse(draftsResponse.data));
    setPublished(z.array(RecipeSchema).parse(publishedResponse.data));
    setSaved(z.array(RecipeSchema).parse(savedResponse.data));
    setLoaded(true);
  };

  useEffect(() => {
    getData();
  }, []);

  const createRecipe = async (recipe: RecipeRequest) => {
    const { data } = await apiClient.post('/recipes', recipe, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });
    setDrafts(prevState => [...prevState, RecipeSchema.parse(data)]);
  };

  const updateRecipe = async (recipe: RecipeRequest, id: string) => {
    const { data } = await apiClient.put(`/recipes?id=${id}`, recipe, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });
    setDrafts(prevState => prevState.map(draft => (draft._id === data._id ? RecipeSchema.parse(data) : draft)));
  };

  const deleteRecipe = async (recipe: Recipe) => {
    await apiClient.delete(`/recipes?id=${recipe._id}`);
    await getData();
  };
  const publishRecipe = async (recipe: Recipe) => {
    const { data } = await apiClient.post(`/recipes/publish?id=${recipe._id}`);
    setDrafts(prevState => prevState.filter(({ _id }) => _id !== recipe._id));
    setPublished(prevState => [...prevState, RecipeSchema.parse(data)]);
  };

  const unPublishRecipe = async (recipe: Recipe) => {
    const { data } = await apiClient.post(`/recipes/unpublish?id=${recipe._id}`);
    setPublished(prevState => prevState.filter(({ _id }) => _id !== recipe._id));
    setDrafts(prevState => [...prevState, RecipeSchema.parse(data)]);
  };

  const saveRecipe = async (recipe: Recipe) => {
    const { data } = await apiClient.post(`/recipes/save?id=${recipe._id}`);
    setSaved(prevState => [...prevState, RecipeSchema.parse(data)]);
  };

  const unSaveRecipe = async (recipe: Recipe) => {
    console.log(`Un Saving recipe: ${recipe.name} not yet implemented`);
  };

  const contextValue = useMemo(
    () => ({
      drafts,
      published,
      saved,
      loaded,
      getData,
      createRecipe,
      updateRecipe,
      deleteRecipe,
      publishRecipe,
      unPublishRecipe,
      saveRecipe,
      unSaveRecipe
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [drafts, published, loaded]
  );

  return <RecipeContext.Provider value={contextValue}>{children}</RecipeContext.Provider>;
};

export { RecipeProvider, useRecipeContext };
