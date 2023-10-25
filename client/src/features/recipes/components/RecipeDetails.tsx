import { Clock3, Gauge } from 'lucide-react';

import { Table, TableBody, TableCell, TableRow } from '@/common/components/Table';
import config from '@/config';

import { Recipe } from '../RecipeContext';

type RecipeDetailsProps = {
  recipe: Recipe;
};

const RecipeDetails = ({ recipe }: RecipeDetailsProps) => {
  const { name, image, time, difficulty, description, ingredients, instructions } = recipe;
  return (
    <div className="flex w-full flex-col">
      <h1 className="py-2 text-center text-2xl font-bold capitalize">{name}</h1>
      {image && <img className="h-full max-h-40 w-full object-cover object-top " src={`${config.baseUrl}/${image}`} />}
      <div className="flex flex-col gap-2 p-4">
        <div className="flex gap-2">
          <span className="max-h-64 flex-shrink flex-grow-[3] basis-0 overflow-x-auto font-semibold">
            {description}
          </span>
          <div className="flex flex-shrink flex-grow-[2] basis-0 flex-col  gap-4 pt-4 font-thin">
            <div className="flex gap-2">
              <Clock3 />
              <span>{time ?? '-'} minutes</span>
            </div>
            <div className="flex gap-2">
              <Gauge />
              <span>{difficulty ?? ''}</span>
            </div>
          </div>
        </div>
        <h2 className="text-xl font-semibold">Ingredients</h2>
        <Table>
          <TableBody>
            {ingredients.map((ingredient, index) => (
              <TableRow key={index} className="p-0">
                <TableCell className="py-2" align="center">
                  {ingredient.name}
                </TableCell>
                <TableCell className="py-2" align="center">
                  {ingredient.amount}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <h2 className="text-xl font-semibold">Instructions</h2>
        <span className="whitespace-pre-line">{instructions}</span>
      </div>
    </div>
  );
};

export default RecipeDetails;
