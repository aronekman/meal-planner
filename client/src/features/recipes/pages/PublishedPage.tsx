import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { useAppContext } from '@/common/AppContext';
import { Button } from '@/common/components/Button';
import { useToast } from '@/common/components/use-toast';

import RecipeDetails from '../components/RecipeDetails';
import { useRecipeContext } from '../RecipeContext';

const PublishedPage = () => {
  const { toast } = useToast();
  const { id } = useParams();
  const navigate = useNavigate();
  const { setAppData } = useAppContext();
  const { loaded, published, deleteRecipe, unPublishRecipe } = useRecipeContext();
  const recipe = published.find(recipe => recipe._id === id);
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

  const handleUnPublish = async () => {
    if (!recipe) return;
    await unPublishRecipe(recipe);
    toast({ title: `${recipe.name} Unpublished!` });
    navigate('/recipes');
  };

  const handleDelete = async () => {
    if (!recipe) return;
    await deleteRecipe(recipe);
    toast({ title: `${recipe.name} Deleted!` });
    navigate('/recipes');
  };

  if (!recipe) return null;
  return (
    <div>
      <RecipeDetails recipe={recipe} />
      <div className="mb-6 flex justify-end gap-6 p-4">
        <Button className='w-20' variant="secondary" onClick={handleDelete} disabled={!recipe}>
          Delete
        </Button>
        <Button className='w-20' onClick={handleUnPublish} disabled={!recipe} variant="outline">
          Unpublish
        </Button>
      </div>
    </div>
  );
};

export default PublishedPage;
