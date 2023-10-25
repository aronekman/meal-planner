import { Clock3, Gauge, ImageOff } from 'lucide-react';

import { Button } from '@/common/components/Button';
import config from '@/config';

import { Recipe } from './RecipeContext';

type RecipeIconProps = {
  recipe: Recipe;
  onClick: () => void;
};

const RecipeIcon = ({ recipe, onClick }: RecipeIconProps) => {
  return (
    <div className="aspect-square w-full">
      <Button onClick={onClick} variant="secondary" className="flex h-full w-full flex-col justify-center p-0">
        <div className="flex w-full flex-row flex-nowrap  justify-evenly  gap-2 overflow-hidden py-2">
          <div className="flex h-4 flex-row items-center justify-center">
            {recipe.time && (
              <>
                <Clock3 className="h-full" />
                <span>{recipe.time}</span>
              </>
            )}
          </div>
          <div className="flex h-4 flex-row items-center justify-center">
            {recipe.difficulty && (
              <>
                <Gauge className="h-full" />
                <span>{recipe.difficulty}</span>
              </>
            )}
          </div>
        </div>
        {recipe.image ? (
          <img className="rounded" src={`${config.baseUrl}/${recipe.image}`} />
        ) : (
          <div className="flex h-full w-full items-center justify-center rounded">
            <ImageOff className="h-10 w-10" />
          </div>
        )}
        <h1 className="w-full text-center">{recipe.name}</h1>
      </Button>
    </div>
  );
};

export default RecipeIcon;
