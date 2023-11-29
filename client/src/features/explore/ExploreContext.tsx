import { createContext, Dispatch, ReactNode, SetStateAction, useContext, useMemo, useState } from 'react';
import { z } from 'zod';

import apiClient from '@/api/Axios';

import { Recipe, RecipeSchema } from '../recipes/RecipeContext';

type FilterConstants = {
  maxTime: number;
  maxCost: number;
};

type ExploreState = {
  status: 'idle' | 'loading' | 'succeeded';
  recipes: Recipe[];
  filterConstants: FilterConstants | null;
  setFilterConstants: Dispatch<SetStateAction<FilterConstants | null>>;
  getData: (search?: string, timeLimit?: number, difficulty?: string[], costLimit?: number) => Promise<void>;
};

const initialState: ExploreState = {
  status: 'idle',
  recipes: [],
  filterConstants: null,
  setFilterConstants: () => null,
  getData: () => new Promise(resolve => resolve())
};

const ExploreContext = createContext<ExploreState>(initialState);

const useExploreContext = () => useContext(ExploreContext);

const ExploreProvider = ({ children }: { children: ReactNode }) => {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [status, setStatus] = useState<'idle' | 'loading' | 'succeeded'>('idle');
  const [filterConstants, setFilterConstants] = useState<FilterConstants | null>(null);

  const getData = async (search: string = '', timeLimit?: number, difficulty?: string[], costLimit?: number) => {
    setStatus('loading');
    const query = [
      search && `search=${search}`,
      timeLimit && `timeLimit=${timeLimit}`,
      difficulty && `difficulty=${difficulty}`,
      costLimit && `costLimit=${costLimit}`
    ]
      .filter(Boolean)
      .join('&');
    const { data } = await apiClient.get(`/recipes?${query}`);
    setRecipes(z.array(RecipeSchema).parse(data));
    setStatus('succeeded');
  };

  const contextValue = useMemo(
    () => ({ recipes, status, getData, filterConstants, setFilterConstants }),
    [recipes, status, filterConstants]
  );

  return <ExploreContext.Provider value={contextValue}>{children}</ExploreContext.Provider>;
};

export { ExploreProvider, useExploreContext };
