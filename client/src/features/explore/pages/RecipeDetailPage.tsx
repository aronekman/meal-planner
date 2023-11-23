import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { useAppContext } from '@/common/AppContext';
import { Button } from '@/common/components/Button';
import { useToast } from '@/common/components/use-toast';
import RecipeDetails from '@/features/recipes/components/RecipeDetails';
import { useRecipeContext } from '@/features/recipes/RecipeContext';

import { useExploreContext } from '../ExploreContext';

const RecipeDetailPage = () => {
  const { toast } = useToast();
  const { id } = useParams();
  const navigate = useNavigate();
  const { setAppData } = useAppContext();
  const { status, recipes, getData } = useExploreContext();
  const { saved, saveRecipe, unSaveRecipe } = useRecipeContext();

  const recipe = recipes.find(recipe => recipe._id === id);

  const isSaved = !!saved.find(savedRecipe => savedRecipe._id === id);

  useEffect(() => {
    setAppData({ showBackButton: true });
    return () => {
      setAppData({ showBackButton: false });
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (status === 'idle') {
      getData();
      return;
    }
    if (status === 'succeeded' && !recipe) navigate('../');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status, recipe]);

  const handleSave = async () => {
    if (!recipe) return;
    await saveRecipe(recipe);
    toast({ title: `${recipe.name} Saved!` });
    navigate('../');
  };

  const handleUnSave = async () => {
    if (!recipe) return;
    await unSaveRecipe(recipe);
    toast({ title: `${recipe.name} Unsaved!` });
    navigate('../');
  };

  if (!recipe) return null;
  return (
    <div>
      <RecipeDetails recipe={recipe} />
      <div className="mb-6 flex justify-end p-4">
        {isSaved ? (
          <Button variant="outline" onClick={handleUnSave}>
            Unsave
          </Button>
        ) : (
          <Button onClick={handleSave}>Save</Button>
        )}
      </div>
    </div>
  );
};

export default RecipeDetailPage;
