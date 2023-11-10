import { createContext, Dispatch, ReactNode, SetStateAction, useContext, useEffect, useMemo, useState } from 'react';
import { formatISO, setHours, setMinutes } from 'date-fns';
import { z } from 'zod';

import apiClient from '@/api/Axios';

import { RecipeSchema } from '../recipes/RecipeContext';

import { Time } from './AddRecipe';

const PlanSchema = z.object({
  _id: z.string(),
  meals: z.array(z.object({ time_slot: z.string().transform(str => new Date(str)), recipe: RecipeSchema }))
});

type Plan = z.infer<typeof PlanSchema>;

type PlanState = {
  loading: boolean;
  plan: Plan | null;
  date: Date;
  setDate: Dispatch<SetStateAction<Date>>;
  updatePlan: (time: Time, recipeId: string) => Promise<void>;
};

const initialState: PlanState = {
  loading: false,
  plan: null,
  date: new Date(),
  setDate: () => null,
  updatePlan: () => new Promise(resolve => resolve())
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

  const updatePlan = async (time: Time, recipeId: string) => {
    if (!plan) return;
    const time_slot = setMinutes(setHours(date, time.hour), time.minute);
    const request = { meal: { time_slot, recipe: recipeId } };
    const { data } = await apiClient.put(`/plans?id=${plan._id}`, request);
    console.log(data);
  };

  const contextValue = useMemo(
    () => ({ plan, loading, date, setDate, updatePlan }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [plan, loading]
  );

  return <PlanContext.Provider value={contextValue}>{children}</PlanContext.Provider>;
};

export { PlanProvider, usePlanContext };
