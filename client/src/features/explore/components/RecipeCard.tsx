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
      className='flex h-36 flex-row  rounded-sm border border-black p-0 mb-2'
      variant='ghost'
      key={recipe._id}
      onClick={() => navigate(recipe._id)}>
      <div className='h-full w-full flex'>
        {recipe.image ? (
          <div className='h-full aspect-square'>
            <img
              className='h-full aspect-square rounded object-cover object-top'
              src={`${config.baseUrl}/uploads/${recipe.image}`}
            />
          </div>
        ) : (
          <div className='h-full aspect-square flex items-center justify-center rounded bg-stone-200'>
            <ImageOff className='h-10 w-10' />
          </div>
        )}
        <div className='flex-grow h-full max-w-[calc(100% - 144px)] flex flex-col p-2 overflow-hidden'>
        <h1 className='line-clamp-1 text-left text-lg font-semibold break-words text-ellipsis'>{recipe.name}</h1>
        <p className='line-clamp-3 text-left font-light text-xs text-stone-600'>{recipe.description}</p>
        <div className='flex-1' />
        <div className='w-full grid grid-cols-2'>
          <div className='w-full flex h-4 flex-row items-center text-sm italic'>
            <Clock3 className='h-full aspect-square' />
            {recipe.time ? (<span className='line-clamp-1 break-words'>{recipe.time} min</span>) : (<span>--</span>)}
          </div>
          <div className='w-fit flex h-4 flex-row items-center justify-center text-sm italic'>
            <Gauge className='h-full aspect-square' /> 
            {recipe.difficulty ? (<span>{recipe.difficulty}</span>):(<span>--</span>)}
          </div>
        </div>
      </div>
      </div>
    </Button>
  );
};

export default RecipeCard;
