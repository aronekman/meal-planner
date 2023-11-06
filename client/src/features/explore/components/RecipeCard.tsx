import { useNavigate } from 'react-router-dom';
import { Clock3, Gauge, ImageOff } from 'lucide-react';

import { Button } from '@/common/components/Button';
import config from '@/config';
import { Recipe } from '@/features/recipes/RecipeContext';

type RecipeCardProps = {
  recipe: Recipe;
};

const RecipeCard = ({ recipe }: RecipeCardProps) => {
  const navigate = useNavigate();
  return (
    <Button
      className="flex h-36 flex-row  rounded-sm border border-black p-0"
      variant="ghost"
      key={recipe._id}
      onClick={() => navigate(recipe._id)}>
      <div className="h-full w-full flex-shrink flex-grow-[2] basis-0">
        {recipe.image ? (
          <div className="h-full overflow-hidden">
            <img className="h-full w-full rounded object-cover object-top" src={`${config.baseUrl}/${recipe.image}`} />
          </div>
        ) : (
          <div className="flex h-full w-full items-center justify-center rounded">
            <ImageOff className="h-10 w-10" />
          </div>
        )}
      </div>
      <div className="flex h-full  flex-shrink flex-grow-[3] basis-0 flex-col p-2">
        <h1 className="text-left text-lg font-semibold">{recipe.name}</h1>
        <p className="line-clamp-2 text-left font-light text-gray-600">{recipe.description}</p>
        <div className="flex-1" />
        {recipe.time && (
          <div className="flex h-6 flex-row items-center gap-4 pl-8">
            <Clock3 className="h-full" />
            <span className="text-lg font-normal">{recipe.time} minutes</span>
          </div>
        )}
        {recipe.difficulty && (
          <div className="flex h-6 flex-row items-center gap-4 pl-8">
            <Gauge className="h-full" />
            <span className="text-lg font-normal">{recipe.difficulty}</span>
          </div>
        )}
      </div>
    </Button>
  );
};

export default RecipeCard;
