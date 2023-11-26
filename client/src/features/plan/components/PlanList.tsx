import { Link, useNavigate } from 'react-router-dom';
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
    <div className='flex w-full flex-col'>
      {plan.meals.map(meal => (
        <div key={meal._id} className='h-20 flex justify-start items-center'>
          <svg className='h-full w-4 fill-primary stroke-primary '>
            <line x1='50%' y1='0' x2='50%' y2='100%' strokeWidth='3' />
            <circle cx='50%' cy='50%' r='5' />
          </svg>
          <div 
            onClick={() => navigate(`recipes/${meal.recipe._id}`)} 
            className='flex h-full w-full items-center px-2'>
            <div className='h-[80%] aspect-[5/4] overflow-clip bg-[#F0F0F0] p-1'>
              {meal.recipe.image ? (
                <div className='h-full w-full'>
                  <img className='h-full w-full object-cover' src={`${config.baseUrl}/uploads/${meal.recipe.image}`} />
                </div>
              ) : (
                <div className='flex h-full w-full items-center justify-center'>
                <ImageOff className='h-6 w-6' />
              </div>
              )}
            </div>
            <div className='w-[70%] h-[80%] line-clamp-1 flex flex-col pl-2 whitespace-nowrap font-alegreya'>
              <div className='text-ellipsis overflow-hidden text-sm'>{`${format(meal.time_slot, 'hh:mm')} - ${format(addHours(meal.time_slot, 1), 'hh:mm')}`}</div>
              <div className='text-ellipsis overflow-hidden text-base'>{meal.recipe.name}</div>
            </div>
          </div>
          <Button className='h-4 w-4 rounded-full p-[1px] justify-self-end' onClick={() => handleDelete(meal._id)}>
              <X className='text-sm font-bold'/>
          </Button>
        </div>
      ))}
    </div>
  );
};

export default PlanList;
