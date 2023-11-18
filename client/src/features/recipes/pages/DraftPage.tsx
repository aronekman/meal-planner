import { useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';

import { useAppContext } from '@/common/AppContext';
import { Button } from '@/common/components/Button';
import { useToast } from '@/common/components/use-toast';

import RecipeDetails from '../components/RecipeDetails';
import { useRecipeContext } from '../RecipeContext';

const DraftPage = () => {
  const { toast } = useToast();
  const { id } = useParams();
  const navigate = useNavigate();
  const { setAppData } = useAppContext();
  const { loaded, drafts, deleteRecipe, publishRecipe } = useRecipeContext();
  const recipe = drafts.find(draft => draft._id === id);
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

  const handlePublish = async () => {
    if (!recipe) return;
    await publishRecipe(recipe);
    toast({ title: `${recipe.name} Published!` });
    navigate('../');
  };

  const handleDelete = async () => {
    if (!recipe) return;
    await deleteRecipe(recipe);
    toast({ title: `${recipe.name} Deleted!` });
    navigate('../');
  };

  if (!recipe) return null;
  return (
    <div>
      <RecipeDetails recipe={recipe} />
      <div className="mb-6 flex justify-end gap-4 p-4">
        <Button variant="outline" disabled={!recipe} className='w-16' asChild>
          <Link to={`/recipes/${recipe._id}/edit`}>Edit</Link>
        </Button>
        <Button variant="outline" onClick={handleDelete} className='w-16' disabled={!recipe}>
          Delete
        </Button>
        <Button onClick={handlePublish} className='w-16' disabled={!recipe}>
          Publish
        </Button>
      </div>
    </div>
  );
};

export default DraftPage;
