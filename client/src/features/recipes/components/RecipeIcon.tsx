import { Clock3, Gauge, ImageOff } from 'lucide-react';

import { Button } from '@/common/components/Button';
import config from '@/config';

import { Recipe } from '../RecipeContext';

type RecipeIconProps = {
  recipe: Recipe;
  onClick: () => void;
};

const RecipeIcon = ({ recipe, onClick }: RecipeIconProps) => {
  return (
    <div className="w-fit">
      <Button
        onClick={onClick}
        variant="secondary"
        className="flex h-full w-[30vw] min-w-[140px] max-w-[180px] flex-col justify-start bg-white px-0 py-3">
        <div className="grid w-full grid-cols-2">
          <div className="flex h-4 w-fit flex-row items-center text-xs italic">
            {recipe.time && (
              <>
                <Clock3 className="aspect-square h-full" />
                <span>{recipe.time} min</span>
              </>
            )}
          </div>
          <div className="flex h-4 w-fit flex-row items-center justify-center text-xs italic">
            <Gauge className="aspect-square h-full" />
            {recipe.difficulty && <span>{recipe.difficulty}</span>}
          </div>
        </div>
        <div className="my-2 aspect-[7/5] w-full overflow-clip bg-[#F0F0F0] p-2">
          {recipe.image ? (
            <div className="h-full w-full">
              <img className="h-full w-full object-cover" src={`${config.baseUrl}/uploads/${recipe.image}`} />
            </div>
          ) : (
            <div className="flex h-full w-full items-center justify-center">
              <ImageOff className="h-10 w-10" />
            </div>
          )}
        </div>
        <h1 className="w-full text-center font-arbutus">{recipe.name}</h1>
      </Button>
    </div>
  );
};

export default RecipeIcon;
