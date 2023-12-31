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
    <div className='w-fit'>
      <Button onClick={onClick} variant='secondary' 
        className='flex h-full w-[30vw] min-w-[140px] max-w-[180px] flex-col justify-start px-0 py-3 bg-white'>
        <div className='w-full grid grid-cols-2'>
          <div className='w-full flex h-4 flex-row items-center text-xs italic'>
            <Clock3 className='h-full aspect-square' />
            {recipe.time ? (<span className='line-clamp-1 w-full'>{recipe.time} min</span>) : (<span>--</span>)}
          </div>
          <div className='w-fit flex h-4 flex-row items-center justify-center text-xs italic'>
            <Gauge className='h-full aspect-square' /> 
            {recipe.difficulty ? (<span>{recipe.difficulty}</span>):(<span>--</span>)}
          </div>
        </div>
        <div className='my-2 aspect-[7/5] w-full overflow-clip bg-[#F0F0F0] p-2'>
          {recipe.image ? (
            <div className='h-full w-full'>
              <img className='h-full w-full object-cover' src={`${config.baseUrl}/uploads/${recipe.image}`} />
            </div>
          ) : (
            <div className='flex h-full w-full items-center justify-center'>
              <ImageOff className='h-10 w-10' />
            </div>
          )}
        </div>
        <h1 className='w-full text-center font-alegreya text-base line-clamp-3 text-ellipsis break-words'>{recipe.name}</h1>
      </Button>
    </div>
  );
};

export default RecipeIcon;
