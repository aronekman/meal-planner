import { createContext, Dispatch, ReactNode, SetStateAction, useContext, useEffect, useMemo, useState } from 'react';
import { formatISO } from 'date-fns';
import { z } from 'zod';

import apiClient from '@/api/Axios';

const PlanSchema = z.object({ _id: z.string() });

type Plan = z.infer<typeof PlanSchema>;

type PlanState = {
  loading: boolean;
  plan: Plan | null;
  date: Date;
  setDate: Dispatch<SetStateAction<Date>>;
};

const initialState: PlanState = {
  loading: false,
  plan: null,
  date: new Date(),
  setDate: () => null
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
      const { data } = await apiClient.get(`/plans?date=${formatISO(date, { representation: 'date' })}`);
      setPlan(PlanSchema.parse(data));
      setLoading(false);
    };
    getData();
  }, [date]);

  const contextValue = useMemo(
    () => ({ plan, loading, date, setDate }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [plan, loading]
  );

  return <PlanContext.Provider value={contextValue}>{children}</PlanContext.Provider>;
};

export { PlanProvider, usePlanContext };
