import { Clock3, Gauge } from 'lucide-react';

import { Table, TableBody, TableCell, TableRow } from '@/common/components/Table';
import config from '@/config';

import { Recipe } from '../RecipeContext';

type RecipeDetailsProps = {
  recipe: Recipe;
};

const RecipeDetails = ({ recipe }: RecipeDetailsProps) => {
  const { name, image, time, difficulty, description, ingredients, instructions, cost } = recipe;
  const nutrients = recipe.ingredients.reduce(
    (prev, curr) => ({ protein: prev.protein + curr.protein, calories: prev.calories + curr.calories }),
    {
      protein: 0,
      calories: 0
    }
  );
  return (
    <div className="flex w-full flex-col">
      <h1 className="py-5 px-10 text-center text-2xl font-alegreya font-bold capitalize">{name}</h1>
      {image && (
        <img
          className="w-full aspect-video bg-stone-100 object-contain object-top "
          src={`${config.baseUrl}/uploads/${image}`}
        />
      )}
      <div className="flex flex-col gap-2 p-4">
        <div className="w-full flex">
          <span className="w-[70%] border-r-[1px] border-black pr-3
            font-alegreya text-base">
            {description}
          </span>
          <div className="w-[30%] grid gap-2 pl-3 pt-[2px] h-fit">
            <div className="flex h-fit flex-row items-center text-sm font-medium italic overflow-visible">
              <Clock3 className = "h-4 aspect-square"/>
              <span className = "mx-2">{time ?? '-'} ms</span>
            </div>
            <div className=" flex h-4 flex-row items-center text-sm font-medium italic">
              <Gauge className = "h-full aspect-square" />
              <span className = "mx-2">{difficulty ?? ''}</span>
            </div>
          </div>
        </div>
        <h2 className="text-xl font-alegreya font-bold mt-6 mb-1">Ingredients</h2>
        <Table>
          <colgroup>
            <col span={1} className="w-[70%]"/>
            <col span={1} className="w-[30%]"/>
          </colgroup>
          <TableBody>
            {ingredients.map((ingredient, index) => (
              <TableRow key={index} className="p-0 whitespace-nowrap 
                font-alegreya text-base
                hover:bg-white border-stone-100 border-b-2">
                <TableCell className="pl-2 py-2 capitalize bg-stone-100" align="left">
                  {ingredient.name}
                </TableCell>
                <TableCell className="py-2" align="left">
                  {ingredient.amount}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <div className='w-full flex justify-between border-black border-b-[1px]'>
          <div className="text-base font-alegreya font-bold py-2">Estimated Cost</div>
          <div className='text-base font-alegreya font-bold py-2 w-[30%] pl-4'>{cost} €</div>
        </div>
        <div className='w-full border-black border-b-[1px]'>
          <div className="text-base font-alegreya font-bold pb-2">Nutrients</div>
          <div className="w-full flex justify-between">
            <div className="text-base font-alegreya pl-2">Protein</div>
            <div className='text-base font-alegreya w-[30%] pl-4'>{nutrients.protein.toFixed(2)} g</div>
          </div>
          <div className="w-full flex justify-between">
            <div className="text-base font-alegreya pl-2">Calories</div>
            <div className='text-base font-alegreya w-[30%] pl-4 pb-2'>{nutrients.calories.toFixed(2)} kcal</div>
          </div>
        </div>
        <h2 className="text-xl font-alegreya font-bold mt-6 mb-1">Instructions</h2>
        <span className="whitespace-pre-line font-alegreya">{instructions}</span>
      </div>
    </div>
  );
};

export default RecipeDetails;
