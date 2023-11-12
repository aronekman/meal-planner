import { Dispatch, SetStateAction, useState } from 'react';
import { PopoverClose } from '@radix-ui/react-popover';

import { Button } from '../../../common/components/Button';
import { cn } from '../../../common/utils/tailwindUtils';
import { hourData, minuteData, pad } from '../helpers';

import { Time } from './AddRecipe';

type TimePickerProps = {
  time: Time | null;
  setTime: Dispatch<SetStateAction<Time | null>>;
  close: () => void;
};

type ActiveOptions = 'h' | 'm';

const TimePicker = ({ time, setTime, close }: TimePickerProps) => {
  const [active, setActive] = useState<ActiveOptions>('h');
  const [hour, setHour] = useState<number | null>(time?.hour ?? null);
  const [minute, setMinute] = useState<number | null>(time?.minute ?? null);

  const handleSumbit = () => {
    if (hour === null || minute === null) return;

    setTime({ hour, minute });
    close();
  };
  return (
    <div className="rounded p-2">
      <div className="flex h-14 items-center justify-evenly text-2xl">
        <div>
          <button className={cn(active === 'h' && 'text-primary underline')} onClick={() => setActive('h')}>
            {hour !== null ? pad(hour) : 'hh'}
          </button>
          :
          <button className={cn(active === 'm' && 'text-primary underline')} onClick={() => setActive('m')}>
            {minute !== null ? pad(minute) : 'mm'}
          </button>
        </div>
      </div>
      <div className="relative aspect-square rounded-lg bg-secondary">
        {active === 'h' &&
          Object.entries(hourData).map(([hour, { rotateRight, rotateLeft }]) => (
            <div
              key={hour}
              className={cn('pointer-events-none absolute flex h-full w-full justify-center p-2', rotateRight)}>
              <Button
                variant="ghost"
                onClick={() => {
                  setHour(parseInt(hour));
                  setMinute(prev => prev ?? 0);
                  setActive('m');
                }}
                className={cn('pointer-events-auto hover:bg-opacity-0 ', rotateLeft)}>
                {hour}
              </Button>
            </div>
          ))}
        {active === 'm' &&
          Object.entries(minuteData).map(([minute, { rotateRight, rotateLeft }]) => (
            <div
              key={minute}
              className={cn('pointer-events-none absolute flex h-full w-full justify-center p-2', rotateRight)}>
              <Button
                variant="ghost"
                onClick={() => {
                  setMinute(parseInt(minute));
                }}
                className={cn('pointer-events-auto hover:bg-opacity-0 ', rotateLeft)}>
                {pad(parseInt(minute))}
              </Button>
            </div>
          ))}
      </div>
      <div className="flex justify-end gap-2 p-2">
        <PopoverClose asChild>
          <Button variant="secondary">Cancel</Button>
        </PopoverClose>
        <Button onClick={handleSumbit} disabled={hour === null || minute === null}>
          OK
        </Button>
      </div>
    </div>
  );
};

export default TimePicker;
