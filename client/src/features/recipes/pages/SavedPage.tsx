import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { useAppContext } from '@/common/AppContext';
import { Button } from '@/common/components/Button';
import { useToast } from '@/common/components/use-toast';

import RecipeDetails from '../components/RecipeDetails';
import { useRecipeContext } from '../RecipeContext';

const SavedPage = () => {
  const { toast } = useToast();
  const { id } = useParams();
  const navigate = useNavigate();
  const { setAppData } = useAppContext();
  const { loaded, saved, unSaveRecipe } = useRecipeContext();
  const recipe = saved.find(recipe => recipe._id === id);
  useEffect(() => {
    setAppData({ showBackButton: true });
    return () => {
      setAppData({ showBackButton: false });
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (loaded && !recipe) navigate('../');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loaded, recipe]);

  const handleUnsave = async () => {
    if (!recipe) return;
    await unSaveRecipe(recipe);
    toast({ title: `${recipe.name} Published!` });
    navigate('../');
  };

  if (!recipe) return null;
  return (
    <div>
      <RecipeDetails recipe={recipe} />
      <div className='mb-6 flex justify-end p-4'>
        <Button onClick={handleUnsave} disabled={!recipe} className='w-20' variant='outline'>
          Unsave
        </Button>
      </div>
    </div>
  );
};

export default SavedPage;
