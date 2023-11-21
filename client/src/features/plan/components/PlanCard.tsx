import { format } from 'date-fns';
import { CalendarIcon, ChevronDown } from 'lucide-react';

import { Button } from '@/common/components/Button';
import { Calendar } from '@/common/components/Calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/common/components/Popover';

import { usePlanContext } from '../PlanContext';

import AddRecipe from './AddRecipe';
import PlanList from './PlanList';

const PlanCard = () => {
  const { date, setDate } = usePlanContext();
  return (
    <div className='flex flex-col items-center justify-between gap-4 rounded-lg bg-white p-4 min-h-[150px]'>
      <div className='flex flex-col w-full items-center'>
        <Popover>
          <PopoverTrigger asChild>
            <Button variant='secondary' 
              className='w-full py-6 mb-4 flex justify-between gap-4 transition-all 
                font-alegreya text-base
                [&[data-state=open]>svg]:rotate-180'>
              <div className='flex h-full items-center'>
              <CalendarIcon className='mr-2 h-4 w-4' />
              {date ? format(date, 'PPP') : <span>Pick a date</span>}
              </div>
              <ChevronDown className='h-4 w-4 shrink-0 transition-transform duration-200' />
            </Button>
          </PopoverTrigger>
          <PopoverContent className='w-auto p-0'>
            <Calendar className = 'font-alegreya' mode='single' required selected={date} onSelect={day => day && setDate(day)} initialFocus />
          </PopoverContent>
        </Popover>
        <PlanList />
      </div>
      <AddRecipe />
    </div>
  );
};

export default PlanCard;
