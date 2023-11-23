import { FormEvent, useEffect, useState } from 'react';
import { PopoverClose, PopoverContent } from '@radix-ui/react-popover';
import { Clock3, Filter, Search } from 'lucide-react';

import { Button } from '@/common/components/Button';
import { Checkbox } from '@/common/components/CheckBox';
import { Input } from '@/common/components/Input';
import { Label } from '@/common/components/Label';
import { Popover, PopoverTrigger } from '@/common/components/Popover';
import { Slider } from '@/common/components/Slider';
import { parseInteger } from '@/common/utils/formUtils';

import RecipeCard from '../components/RecipeCard';
import { useExploreContext } from '../ExploreContext';

const difficulties = ['easy', 'medium', 'hard'];

const FindRecipes = () => {
  const { recipes, getData, status } = useExploreContext();
  const [search, setSearch] = useState<string>('');
  const [time, setTime] = useState<number>(60);
  const [cost, setCost] = useState<number | null>(null);
  const [difficulty, setDifficulty] = useState<string[]>([]);

  useEffect(() => {
    status === 'idle' && getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSearch = (event: FormEvent) => {
    console.log("h'ä");
    event.preventDefault();
    getData(search);
  };
  const handleFilter = () => {
    getData(search, time ?? undefined, difficulty, cost ?? undefined);
  };
  return (
    <div className="flex flex-col gap-2 p-4">
      <div className="relative">
        <form onSubmit={handleSearch}>
          <Input
            className="pl-10"
            value={search}
            onChange={({ target }) => setSearch(target.value)}
            placeholder="Search"
          />
          <Search className="absolute left-2 top-2" />
        </form>
        <Popover>
          <PopoverTrigger className="absolute right-2 top-2">
            <Filter />
          </PopoverTrigger>
          <PopoverContent className="w-screen px-4 pt-1">
            <div className="flex flex-col gap-2 border border-t-0  bg-white p-2">
              <Label className="flex items-center gap-2">
                <Clock3 size="20" />
                Time
              </Label>
              <div className="flex justify-between">
                <Label>0</Label>
                <Label>{time} min</Label>
                <Label>200</Label>
              </div>
              <Slider value={[time]} onValueChange={value => setTime(value[0])} max={200} min={0} />
              <Label className="flex items-center">Budget</Label>
              <Input value={cost ?? ''} onChange={({ target }) => setCost(parseInteger(target.value))} />
              <Label className="flex items-center">Difficulty</Label>
              <div className="flex justify-evenly">
                {difficulties.map(value => (
                  <div key={value} className="flex flex-col items-center justify-center gap-2">
                    <Label className="capitalize">{value}</Label>
                    <Checkbox
                      checked={difficulty.includes(value)}
                      onCheckedChange={checked =>
                        setDifficulty(prevState =>
                          checked ? [...prevState, value] : prevState.filter(d => d !== value)
                        )
                      }
                    />
                  </div>
                ))}
              </div>
              <PopoverClose asChild>
                <Button onClick={handleFilter}>Filter</Button>
              </PopoverClose>
            </div>
          </PopoverContent>
        </Popover>
      </div>
      {recipes.map(recipe => (
        <RecipeCard key={recipe._id} recipe={recipe} />
      ))}
    </div>
  );
};

export default FindRecipes;
