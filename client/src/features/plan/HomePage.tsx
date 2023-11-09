import { Background } from '@/common/components/Background';

import PlanCard from './PlanCard';

const HomePage = () => {
  return (
    <div>
      <Background />
      <div className="flex flex-col gap-4 p-2 pt-6">
        <div className="flex h-24 flex-col rounded-lg border border-primary bg-white p-1">
          <p className="text-center text-sm underline">Current bill</p>
          <div className="flex h-full items-center justify-center pb-2">
            <span className="my-auto text-3xl font-bold">35.00€</span>
          </div>
        </div>
        <div className="flex flex-col rounded-lg bg-gray-600 bg-opacity-50 p-1">
          <p className="pl-2 text-sm font-semibold text-white">Nutrients intake</p>
          <span className="pl-6 font-semibold">Protein - 30g</span>
          <span className="pl-6 font-semibold">carbs - 50g</span>
        </div>
        <PlanCard />
      </div>
    </div>
  );
};

export default HomePage;
