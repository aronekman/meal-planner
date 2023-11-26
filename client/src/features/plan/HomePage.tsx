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
      <div className='flex flex-col gap-4 p-2 px-4 pt-6'>
        <div className='flex h-24 flex-col rounded-lg border border-primary bg-white p-1'>
          <p className='text-center text-xl font-hand underline'>Current bill</p>
          <div className='flex h-full items-center justify-center pb-2'>
            <span className='my-auto text-4xl font-alegreya font-bold'>{summary && `${summary.cost.toFixed(2)}€`} </span>
          </div>
        </div>
        <div className='flex h-24 flex-col rounded-lg bg-gray-600 bg-opacity-50 p-1'>
          <p className='text-center text-xl font-hand text-white underline'>Nutrient intakes</p>
          <div className='flex flex-col h-full py-2 px-10 justify-center text-base font-alegreya'>
            <div className='flex justify-between'>
              <span className='text-white'>Protein</span>
              <span className='text-white'>{summary ? summary.protein.toFixed(2) : 0.00}g</span>
            </div>
            <div className='flex justify-between'>
              <span className='text-white'>Calories</span>
              <span className='text-white'>{summary ? summary.calories.toFixed(2) : 0.00}kcal</span>
            </div>
          </div>
        </div>
        <PlanCard />
      </div>
    </div>
  );
};

export default HomePage;
