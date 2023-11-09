import { useState } from 'react';
import { Check, ChefHat, ChevronsUpDown } from 'lucide-react';

import { Button } from '@/common/components/Button';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from '@/common/components/Command';
import { Dialog, DialogContent, DialogTrigger } from '@/common/components/Dialog';
import { Label } from '@/common/components/Label';
import { Popover, PopoverContent, PopoverTrigger } from '@/common/components/Popover';
import { cn } from '@/common/utils/tailwindUtils';

import { Recipe, useRecipeContext } from '../recipes/RecipeContext';

const AddRecipe = () => {
  const { saved, published, drafts } = useRecipeContext();

  const options: Recipe[] = [...new Set([...saved, ...published, ...drafts])];

  const [recipeId, setRecipeId] = useState<string | null>(null);
  const [recipeOpen, setRecipeOpen] = useState<boolean>(false);
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="self-end">Add</Button>
      </DialogTrigger>
      <DialogContent className="w-[80%] rounded-lg">
        <div className="flex flex-col gap-2 p-2">
          <Label htmlFor="recipe" className="flex items-center text-primary">
            <ChefHat /> pick recipe
          </Label>
          <Popover open={recipeOpen} onOpenChange={open => setRecipeOpen(open)}>
            <PopoverTrigger asChild>
              <Button variant="secondary" role="combobox" aria-expanded={recipeOpen} className=" justify-between">
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
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AddRecipe;
