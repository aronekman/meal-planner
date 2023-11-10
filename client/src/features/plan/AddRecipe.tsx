import { useState } from 'react';
import { PopoverAnchor } from '@radix-ui/react-popover';
import { CalendarClock, Check, ChefHat, ChevronsUpDown } from 'lucide-react';

import { Button } from '@/common/components/Button';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from '@/common/components/Command';
import { Dialog, DialogClose, DialogContent, DialogTrigger } from '@/common/components/Dialog';
import { Label } from '@/common/components/Label';
import { Popover, PopoverContent, PopoverTrigger } from '@/common/components/Popover';
import { cn } from '@/common/utils/tailwindUtils';
import TimePicker from '@/features/plan/TimePicker';

import { Recipe, useRecipeContext } from '../recipes/RecipeContext';

import { pad } from './helpers';
import { usePlanContext } from './PlanContext';

export type Time = {
  hour: number;
  minute: number;
};

const AddRecipe = () => {
  const { saved, published, drafts } = useRecipeContext();
  const { updatePlan } = usePlanContext();

  const options: Recipe[] = [...new Set([...saved, ...published, ...drafts])];

  const [recipeId, setRecipeId] = useState<string | null>(null);
  const [recipeOpen, setRecipeOpen] = useState<boolean>(false);
  const [timeOpen, setTimeOpen] = useState<boolean>(false);
  const [timeSlot, setTimeSlot] = useState<Time | null>(null);

  const handleSubmit = async () => {
    if (!timeSlot || !recipeId) return;
    await updatePlan(timeSlot, recipeId);
  };

  return (
    <Dialog onOpenChange={open => !open && setRecipeId(null)}>
      <DialogTrigger asChild>
        <Button className="self-end">Add</Button>
      </DialogTrigger>
      <DialogContent className="w-[80%] rounded-lg">
        <div className="flex flex-col gap-2 p-2">
          <Label htmlFor="recipe" className="flex items-center text-primary">
            <ChefHat className="mr-3" /> pick recipe
          </Label>
          <Popover open={recipeOpen} onOpenChange={open => setRecipeOpen(open)}>
            <PopoverTrigger asChild>
              <Button
                id="recipe"
                variant="secondary"
                role="combobox"
                aria-expanded={recipeOpen}
                className="justify-between">
                {recipeId ? options.find(({ _id }) => _id === recipeId)?.name : 'Select Recipe...'}
                <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="p-0">
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
                      }}>
                      <Check className={cn('mr-2 h-4 w-4', recipeId === recipe._id ? 'opacity-100' : 'opacity-0')} />
                      {recipe.name}
                    </CommandItem>
                  ))}
                </CommandGroup>
              </Command>
            </PopoverContent>
          </Popover>
          <Label htmlFor="time" className="flex items-center text-primary">
            <CalendarClock className="mr-3" /> pick time
          </Label>
          <Popover open={timeOpen} onOpenChange={open => setTimeOpen(open)}>
            <PopoverAnchor className="absolute -top-16 left-1/2" />
            <PopoverTrigger asChild>
              <Button
                id="time"
                variant="secondary"
                role="combobox"
                aria-expanded={recipeOpen}
                className="justify-between">
                {timeSlot ? `${timeSlot.hour}:${pad(timeSlot.minute)}` : 'Select Time'}
                <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="p-0">
              <TimePicker time={timeSlot} setTime={setTimeSlot} close={() => setTimeOpen(false)} />
            </PopoverContent>
          </Popover>
          <div className="flex justify-end gap-2">
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <DialogClose asChild>
              <Button onClick={handleSubmit} disabled={!recipeId || !timeSlot}>
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
