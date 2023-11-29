import { createContext, Dispatch, ReactNode, SetStateAction, useContext, useEffect, useMemo, useState } from 'react';
import { formatISO, setHours, setMinutes } from 'date-fns';
import { z } from 'zod';

import apiClient from '@/api/Axios';

import { RecipeSchema } from '../recipes/RecipeContext';

import { Time } from './components/AddRecipe';

const PlanSchema = z.object({
  _id: z.string(),
  meals: z.array(
    z.object({
      _id: z.string(),
      time_slot: z
        .string()
        .optional()
        .transform(str => (str ? new Date(str) : undefined)),
      recipe: RecipeSchema
    })
  )
});

type Plan = z.infer<typeof PlanSchema>;

type PlanState = {
  loading: boolean;
  plan: Plan | null;
  date: Date;
  setDate: Dispatch<SetStateAction<Date>>;
  addMeal: (recipeId: string, time?: Time) => Promise<void>;
  deleteMeal: (mealId: string) => Promise<void>;
};

const initialState: PlanState = {
  loading: false,
  plan: null,
  date: new Date(),
  setDate: () => null,
  addMeal: () => new Promise(resolve => resolve()),
  deleteMeal: () => new Promise(resolve => resolve())
};

const PlanContext = createContext<PlanState>(initialState);

const usePlanContext = () => useContext(PlanContext);

const PlanProvider = ({ children }: { children: ReactNode }) => {
  const [plan, setPlan] = useState<Plan | null>(null);
  const [date, setDate] = useState<Date>(new Date());
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const getData = async () => {
      setLoading(true);
      setPlan(null);
      const { data } = await apiClient.get(`/plans?date=${formatISO(date, { representation: 'date' })}`);
      setPlan(PlanSchema.parse(data));
      setLoading(false);
    };
    getData();
  }, [date]);

  const addMeal = async (recipeId: string, time?: Time) => {
    if (!plan) return;
    console.log(plan, recipeId, time);
    const time_slot = time && setMinutes(setHours(date, time.hour), time.minute);
    const request = { meal: { time_slot, recipe: recipeId } };
    const { data } = await apiClient.post(`/meals?id=${plan._id}`, request);
    setPlan(PlanSchema.parse(data));
  };

  const deleteMeal = async (mealId: string) => {
    if (!plan) return;
    const { data } = await apiClient.delete(`/meals?planId=${plan._id}&mealId=${mealId}`);
    setPlan(PlanSchema.parse(data));
  };

  const contextValue = useMemo(
    () => ({ plan, loading, date, setDate, addMeal, deleteMeal }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [plan, loading]
  );

  return <PlanContext.Provider value={contextValue}>{children}</PlanContext.Provider>;
};

export { PlanProvider, usePlanContext };
