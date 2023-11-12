import { addHours, format } from 'date-fns';
import { ImageOff, X } from 'lucide-react';

import { Button } from '@/common/components/Button';
import config from '@/config';

import { usePlanContext } from '../PlanContext';

const PlanList = () => {
  const { plan, deleteMeal } = usePlanContext();
  if (!plan) return null;

  const handleDelete = async (id: string) => {
    await deleteMeal(id);
  };
  return (
    <div className="flex w-full flex-col">
      {plan.meals.map(meal => (
        <div key={meal._id} className="grid h-20 grid-cols-9">
          <svg className="h-full w-full fill-primary stroke-primary ">
            <line x1="50%" y1="0" x2="50%" y2="100%" strokeWidth="3" />
            <circle cx="50%" cy="50%" r="5" />
          </svg>
          <div className="col-span-2 flex h-20 w-full py-2 ">
            <div className="col-span-2 h-full  w-full  bg-gray-100 p-1">
              {meal.recipe.image ? (
                <div className="flex h-full items-center overflow-hidden">
                  <img className="object-contain" src={`${config.baseUrl}/${meal.recipe.image}`} />
                </div>
              ) : (
                <div className="flex h-full w-full items-center justify-center rounded">
                  <ImageOff className="h-6 w-6" />
                </div>
              )}
            </div>
          </div>
          <div className="col-span-4 line-clamp-1 flex flex-col justify-center whitespace-nowrap px-2 py-4">
            <p>{`${format(meal.time_slot, 'hh:mm')} - ${format(addHours(meal.time_slot, 1), 'hh:mm')}`}</p>
            <p>{meal.recipe.name}</p>
          </div>
          <div className="flex items-center justify-center">
            <Button className="h-8 w-8 rounded-full p-0" onClick={() => handleDelete(meal._id)}>
              <X />
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PlanList;
