import { FormEvent, useEffect, useState } from 'react';
import { PopoverClose, PopoverContent } from '@radix-ui/react-popover';
import { Filter, Search } from 'lucide-react';

import { Button } from '@/common/components/Button';
import { Checkbox } from '@/common/components/CheckBox';
import { Input } from '@/common/components/Input';
import { Label } from '@/common/components/Label';
import { Popover, PopoverTrigger } from '@/common/components/Popover';
import { Slider } from '@/common/components/Slider';

import RecipeCard from '../components/RecipeCard';
import { useExploreContext } from '../ExploreContext';

const difficulties = ['easy', 'medium', 'hard'];

const FindRecipes = () => {
  const { recipes, getData, status, filterConstants, setFilterConstants } = useExploreContext();
  useEffect(() => {
    status === 'idle' && getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => {
    console.log(filterConstants, recipes.length);
    if (filterConstants || !recipes.length) return;
    const filterValues = recipes.reduce(
      (prev, curr) => {
        let time = prev.time;
        let cost = prev.cost;
        if (curr.time && curr.time > prev.time) {
          time = curr.time;
        }
        if (curr.cost && curr.cost > prev.cost) {
          cost = curr.cost;
        }
        return { time: time, cost: cost };
      },
      { time: 0, cost: 0 }
    );
    setFilterConstants({ maxCost: filterValues.cost, maxTime: filterValues.time });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [recipes]);

  const [search, setSearch] = useState<string>('');
  const [time, setTime] = useState<number>(0);
  const [cost, setCost] = useState<number>(0);
  const [difficulty, setDifficulty] = useState<string[]>(difficulties);

  const [applied, setApplied] = useState<boolean>(false);

  const handleSearch = (event: FormEvent) => {
    event.preventDefault();
    getData(search);
    setApplied(true);

    setTime(0);
    setCost(0);
  };
  const handleFilter = () => {
    getData(search, time ?? undefined, difficulty, cost ?? undefined);
    setApplied(true);

    setTime(0);
    setCost(0);
  };
  const handleReset = () => {
    getData();
    setApplied(false);

    setTime(0);
    setCost(0);
  };
  return (
    <div className="flex flex-col gap-2 p-4  font-alegreya">
      <div className="relative mb-2">
        <form onSubmit={handleSearch}>
          <Input
            className="border-[1px] border-black pl-10 font-alegreya text-base"
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
            <div
              className="flex flex-col gap-2 
              rounded-b-md border-[1px] border-t-0 border-black 
              bg-white p-4">
              <Label className="mt-2 flex items-center">Time</Label>
              <div className="flex justify-between">
                <Label>0</Label>
                <Label>{time} min</Label>
                <Label>{filterConstants?.maxTime}</Label>
              </div>
              <Slider
                value={[time]}
                onValueChange={value => setTime(value[0])}
                max={filterConstants?.maxTime}
                min={0}
              />
              <Label className="mt-2 flex items-center border-t-[1px] border-black pt-2">Cost</Label>
              <div className="flex justify-between">
                <Label>0</Label>
                <Label>{cost} €</Label>
                <Label>{filterConstants?.maxCost}</Label>
              </div>
              <Slider
                value={[cost]}
                onValueChange={value => setCost(value[0])}
                max={filterConstants?.maxCost}
                min={0}
              />
              <Label className="mt-2 flex items-center border-t-[1px] border-black pt-2">Difficulty</Label>
              <div className="my-2 flex justify-between">
                <div className="flex items-center justify-center gap-2">
                  <Checkbox
                    checked={difficulty.length === 3}
                    onCheckedChange={checked => setDifficulty(checked ? difficulties : [])}
                  />
                  <Label className="capitalize">All</Label>
                </div>
                {difficulties.map(value => (
                  <div key={value} className="flex items-center justify-center gap-2">
                    <Checkbox
                      checked={difficulty.includes(value)}
                      onCheckedChange={checked =>
                        setDifficulty(prevState =>
                          checked ? [...prevState, value] : prevState.filter(d => d !== value)
                        )
                      }
                    />
                    <Label className="capitalize">{value}</Label>
                  </div>
                ))}
              </div>
              <PopoverClose asChild>
                <div className="flex flex-col gap-2">
                  <Button className="w-full" onClick={handleFilter}>
                    Apply
                  </Button>
                  <Button className="w-full" variant="outline" onClick={handleReset}>
                    Reset
                  </Button>
                </div>
              </PopoverClose>
            </div>
          </PopoverContent>
        </Popover>
      </div>
      {applied && <h1>{recipes.length} results...</h1>}
      {recipes.map(recipe => (
        <RecipeCard key={recipe._id} recipe={recipe} />
      ))}
    </div>
  );
};

export default FindRecipes;
