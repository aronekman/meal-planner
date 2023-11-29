import { useState } from 'react';
import { PopoverAnchor } from '@radix-ui/react-popover';
import { CalendarClock, Check, ChefHat, ChevronsUpDown } from 'lucide-react';

import { Button } from '@/common/components/Button';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from '@/common/components/Command';
import { Dialog, DialogClose, DialogContent, DialogTrigger } from '@/common/components/Dialog';
import { Label } from '@/common/components/Label';
import { Popover, PopoverContent, PopoverTrigger } from '@/common/components/Popover';
import { cn } from '@/common/utils/tailwindUtils';
import TimePicker from '@/features/plan/components/TimePicker';

import { Recipe, useRecipeContext } from '../../recipes/RecipeContext';
import { pad } from '../helpers';
import { usePlanContext } from '../PlanContext';

export type Time = {
  hour: number;
  minute: number;
};

const AddRecipe = () => {
  const { saved, published, drafts } = useRecipeContext();
  const { addMeal } = usePlanContext();

  const options: Recipe[] = [...new Set([...saved, ...published, ...drafts])];

  const [recipeId, setRecipeId] = useState<string | null>(null);
  const [recipeOpen, setRecipeOpen] = useState<boolean>(false);
  const [timeOpen, setTimeOpen] = useState<boolean>(false);
  const [timeSlot, setTimeSlot] = useState<Time | null>(null);

  const handleSubmit = async () => {
    if (!recipeId) return;
    await addMeal(recipeId, timeSlot ?? undefined);
  };

  return (
    <Dialog onOpenChange={open => !open && setRecipeId(null)}>
      <DialogTrigger asChild>
        <Button className="w-20 self-end justify-self-end">Add</Button>
      </DialogTrigger>
      <DialogContent className="w-[80%] rounded-lg">
        <div className="flex w-full flex-col gap-2 overflow-hidden p-2">
          <Label htmlFor="recipe" className="flex items-center font-alegreya text-base italic text-primary">
            <ChefHat className="mr-2" /> Pick recipe
          </Label>
          <Popover open={recipeOpen} onOpenChange={open => setRecipeOpen(open)}>
            <PopoverTrigger asChild>
              <Button
                id="recipe"
                variant="secondary"
                role="combobox"
                aria-expanded={recipeOpen}
                className="justify-between font-alegreya">
                <span className="w-full overflow-hidden text-ellipsis text-left">
                  {recipeId ? options.find(({ _id }) => _id === recipeId)?.name : 'Select Recipe...'}
                </span>
                <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="p-0 font-alegreya">
              <Command>
                <CommandInput placeholder="Search recipe..." />
                <CommandEmpty>No recipe found.</CommandEmpty>
                <CommandGroup>
                  {options.map(recipe => (
                    <CommandItem
                      key={recipe._id}
                      value={recipe.name}
                      onSelect={() => {
                        setRecipeId(recipe._id === recipeId ? null : recipe._id);
                        setRecipeOpen(false);
                      }}
                      className="flex w-full">
                      <Check className={cn('mr-2 h-4 w-4', recipeId === recipe._id ? 'opacity-100' : 'opacity-0')} />
                      <span className="max-w-[90%] overflow-hidden text-ellipsis break-words">{recipe.name}</span>
                    </CommandItem>
                  ))}
                </CommandGroup>
              </Command>
            </PopoverContent>
          </Popover>
          <Label htmlFor="time" className="mt-4 flex items-center font-alegreya text-base italic text-primary">
            <CalendarClock className="mr-2" /> Pick time
          </Label>
          <Popover open={timeOpen} onOpenChange={open => setTimeOpen(open)}>
            <PopoverAnchor className="absolute -top-16 left-1/2" />
            <PopoverTrigger asChild>
              <Button
                id="time"
                variant="secondary"
                role="combobox"
                aria-expanded={recipeOpen}
                className="justify-between font-alegreya">
                {timeSlot ? `${timeSlot.hour}:${pad(timeSlot.minute)}` : 'Select Time'}
                <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="p-0">
              <TimePicker time={timeSlot} setTime={setTimeSlot} close={() => setTimeOpen(false)} />
            </PopoverContent>
          </Popover>
          <div className="mt-4 flex justify-end gap-2">
            <DialogClose className="w-20" asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <DialogClose asChild>
              <Button className="w-20" onClick={handleSubmit} disabled={!recipeId}>
                Add
              </Button>
            </DialogClose>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AddRecipe;
