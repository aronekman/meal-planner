import { useNavigate } from 'react-router-dom';
import { addHours, format } from 'date-fns';
import { ImageOff, X } from 'lucide-react';

import { Button } from '@/common/components/Button';
import config from '@/config';

import { usePlanContext } from '../PlanContext';

const PlanList = () => {
  const { plan, deleteMeal } = usePlanContext();
  const navigate = useNavigate();
  if (!plan) return null;

  const handleDelete = async (id: string) => {
    await deleteMeal(id);
  };
  return (
    <div className="flex w-full flex-col">
      {plan.meals.map(meal => (
        <div key={meal._id} className="flex h-20 items-center justify-start">
          <svg className="h-full w-4 fill-primary stroke-primary ">
            <line x1="50%" y1="0" x2="50%" y2="100%" strokeWidth="3" />
            <circle cx="50%" cy="50%" r="5" />
          </svg>
          <div onClick={() => navigate(`recipes/${meal.recipe._id}`)} className="flex h-full w-full items-center px-2">
            <div className="aspect-[5/4] h-[80%] overflow-clip bg-[#F0F0F0] p-1">
              {meal.recipe.image ? (
                <div className="h-full w-full">
                  <img className="h-full w-full object-cover" src={`${config.baseUrl}/uploads/${meal.recipe.image}`} />
                </div>
              ) : (
                <div className="flex h-full w-full items-center justify-center">
                  <ImageOff className="h-6 w-6" />
                </div>
              )}
            </div>
            <div className="line-clamp-1 flex h-[80%] w-[70%] flex-col whitespace-nowrap pl-2 font-alegreya">
              {meal.time_slot && (
                <div className="overflow-hidden text-ellipsis text-sm">{`${format(meal.time_slot, 'hh:mm')} - ${format(
                  addHours(meal.time_slot, 1),
                  'hh:mm'
                )}`}</div>
              )}
              <div className="max-w-[calc(50vw)] overflow-hidden text-ellipsis text-base">{meal.recipe.name}</div>
            </div>
          </div>
          <Button className="h-4 w-4 justify-self-end rounded-full p-[1px]" onClick={() => handleDelete(meal._id)}>
            <X className="text-sm font-bold" />
          </Button>
        </div>
      ))}
    </div>
  );
};

export default PlanList;
