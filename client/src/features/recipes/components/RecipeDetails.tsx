import { Clock3, Gauge, ImageOff } from 'lucide-react';

import { Table, TableBody, TableCell, TableRow } from '@/common/components/Table';
import config from '@/config';

import { Recipe } from '../RecipeContext';

type RecipeDetailsProps = {
  recipe: Recipe;
};

const RecipeDetails = ({ recipe }: RecipeDetailsProps) => {
  const { name, image, time, difficulty, description, ingredients, instructions, cost, created_by } = recipe;
  const nutrients = recipe.ingredients.reduce(
    (prev, curr) => (
      { protein: prev.protein + curr.protein, 
        calories: prev.calories + curr.calories,
        fat: prev.fat + curr.fat }
    ),
    {
      protein: 0,
      calories: 0,
      fat: 0
    }
  );
  return (
    <div className="flex w-full flex-col">
      <h1 className="mx-10 py-5 text-center font-alegreya text-2xl font-bold capitalize break-words">{name}</h1>
      {image ? (
        <img
          className="aspect-video w-full bg-stone-100 object-contain object-top "
          src={`${config.baseUrl}/uploads/${image}`}
        />
      ) : (
        <div className="flex aspect-video w-full items-center justify-center bg-stone-100">
          <ImageOff className="h-1/5 w-1/5" />
        </div>
      )}
      <div className="flex flex-col gap-2 p-4">
      <div className="text-center font-alegreya mb-2">Published by <span className="font-semibold">{created_by.username}</span></div>
        
        <div className="flex w-full">
          <span
            className="w-[70%] border-r-[1px] border-black pr-3
            font-alegreya text-base">
            {description ? <div>{description}</div> : <div className="italic text-stone-600">Some description...</div>}
          </span>
          <div className="grid h-fit w-[30%] gap-2 pl-3 pt-[2px] font-alegreya">
            <div className="flex h-fit flex-row items-center overflow-visible text-sm font-medium italic">
              <Clock3 className="aspect-square h-4" />
              <span className="mx-2">{time ?? '--'} ms</span>
            </div>
            <div className=" flex h-4 flex-row items-center text-sm font-medium italic">
              <Gauge className="aspect-square h-full" />
              <span className="mx-2">{difficulty ?? '--'}</span>
            </div>
          </div>
        </div>
        <h2 className="mb-1 mt-6 font-alegreya text-xl font-bold">Ingredients</h2>
        {ingredients.length !== 0 ? (
          <Table>
            <colgroup>
              <col span={1} className="w-[70%]" />
              <col span={1} className="w-[30%]" />
            </colgroup>
            <TableBody>
              {ingredients.map((ingredient, index) => (
                <TableRow
                  key={index}
                  className="whitespace-nowrap border-b-2 
                  border-stone-100 p-0
                  font-alegreya text-base hover:bg-white">
                  <TableCell className="bg-stone-100 py-2 pl-2 capitalize" align="left">
                    {ingredient.name}
                  </TableCell>
                  <TableCell className="py-2" align="left">
                    {ingredient.amount}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        ) : (
          <div className="font-alegreya italic text-stone-600">Some ingredients...</div>
        )}

        <div className="w-full border-b-[1px] border-black">
          <div className="border-b-[1px] border-black pb-2 pt-5 font-alegreya text-base font-bold">Nutrients</div>
          <div className="flex w-full justify-between">
            <div className="pl-2 pt-2 font-alegreya text-base">Protein</div>
            <div className="w-[30%] pl-4 font-alegreya text-base">{nutrients.protein.toFixed(2)} g</div>
          </div>
          <div className="flex w-full justify-between">
            <div className="pl-2 font-alegreya text-base">Calories</div>
            <div className="w-[30%] pb-2 pl-4 font-alegreya text-base">{nutrients.calories.toFixed(2)} kcal</div>
          </div>
          <div className="flex w-full justify-between">
            <div className="pl-2 font-alegreya text-base">Fat</div>
            <div className="w-[30%] pb-2 pl-4 font-alegreya text-base">{nutrients.fat.toFixed(2)} g</div>
          </div>
        </div>
        <div className="flex w-full justify-between border-b-[1px] border-black">
          <div className="pb-2 font-alegreya text-base font-bold">Estimated Cost</div>
          <div className="w-[30%] pb-2 pl-4 font-alegreya text-base font-bold">{cost} €</div>
        </div>
        <h2 className="mb-1 mt-6 font-alegreya text-xl font-bold">Instructions</h2>
        {instructions ? (
          <span className="whitespace-pre-line break-words font-alegreya">{instructions}</span>
        ) : (
          <div className="font-alegreya italic text-stone-600">Some instructions...</div>
        )}
      </div>
    </div>
  );
};

export default RecipeDetails;
