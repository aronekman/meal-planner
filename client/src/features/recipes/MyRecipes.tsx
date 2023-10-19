import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ImageOff } from 'lucide-react';

import { Button } from '@/common/components/Button';
import config from '@/config';

import { useRecipeContext } from './RecipeContext';

const MyRecipes = () => {
  const { recipes, getData } = useRecipeContext();
  useEffect(() => {
    !recipes.length && getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="flex flex-col gap-2 p-4">
      <Button asChild variant="outline">
        <Link className="w-full" to="create">
          Create Recipe
        </Link>
      </Button>
      <div className="grid grid-cols-2 gap-2">
        {recipes.map(recipe => (
          <div key={recipe._id} className="flex flex-col">
            {recipe.image ? (
              <img className="rounded" src={`${config.baseUrl}/${recipe.image}`}></img>
            ) : (
              <div className="flex h-full w-full items-center justify-center rounded bg-secondary">
                <ImageOff className="h-10 w-10" />
              </div>
            )}
            <h1 className="text-center">{recipe.name}</h1>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyRecipes;
