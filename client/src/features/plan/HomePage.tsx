import { useMemo } from 'react';

import { Background } from '@/common/components/Background';

import PlanCard from './components/PlanCard';
import { usePlanContext } from './PlanContext';

type PlanSummary = {
  cost: number;
  protein: number;
  calories: number;
};

const HomePage = () => {
  const { plan } = usePlanContext();

  const summary: PlanSummary | null = useMemo(() => {
    if (!plan) return null;
    return plan.meals.reduce(
      (prev, curr) => ({
        cost: prev.cost + curr.recipe.cost,
        protein: prev.protein + curr.recipe.ingredients.reduce((prev, curr) => prev + curr.protein, 0),
        calories: prev.calories + curr.recipe.ingredients.reduce((prev, curr) => prev + curr.calories, 0)
      }),
      { cost: 0, protein: 0, calories: 0 }
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [plan?.meals]);
  return (
    <div>
      <Background />
      <div className="flex flex-col gap-4 p-2 pt-6">
        <div className="flex h-24 flex-col rounded-lg border border-primary bg-white p-1">
          <p className="text-center text-sm underline">Current bill</p>
          <div className="flex h-full items-center justify-center pb-2">
            <span className="my-auto text-3xl font-bold">{summary && `${summary.cost.toFixed(2)}€`} </span>
          </div>
        </div>
        <div className="flex flex-col rounded-lg bg-gray-600 bg-opacity-50 p-1">
          <p className="pl-2 text-sm font-semibold text-white">Nutrients intake</p>
          <span className="pl-6 font-semibold">{summary && `Protein - ${summary.protein}g`}</span>
          <span className="pl-6 font-semibold">{summary && `Calories - ${summary.calories}g`}</span>
        </div>
        <PlanCard />
      </div>
    </div>
  );
};

export default HomePage;
