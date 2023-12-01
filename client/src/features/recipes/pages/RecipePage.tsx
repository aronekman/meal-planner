import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { useAppContext } from '@/common/AppContext';
import { useToast } from '@/common/components/use-toast';

import DraftCommand from '../components/DraftCommand';
import PublishedCommand from '../components/PublishedCommand';
import RecipeDetails from '../components/RecipeDetails';
import SavedCommand from '../components/SavedCommand';
import { useRecipeContext } from '../RecipeContext';

const RecipePage = () => {
  const { toast } = useToast();
  const { id } = useParams();
  const navigate = useNavigate();
  const { setAppData } = useAppContext();
  const { loaded, drafts, published, saved, deleteRecipe, publishRecipe, unPublishRecipe, unSaveRecipe } = useRecipeContext();
  
  // find the recipe with ID from list of drafted (status 0), published (1), or saved (2) recipes
  let status = 0;
  let recipe = drafts.find(draft => draft._id === id)
  if (!recipe) {
    recipe = published.find(published => published._id === id);
    status = 1;
  }
  if (!recipe) {
    recipe = saved.find(saved => saved._id === id);
    status = 2;
  }
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

  const handleUnPublish = async () => {
    if (!recipe) return;
    await unPublishRecipe(recipe);
    toast({ title: `${recipe.name} Unpublished!` });
    navigate('/recipes');
  };

  const handleUnsave = async () => {
    if (!recipe) return;
    await unSaveRecipe(recipe);
    toast({ title: `${recipe.name} Unsaved!` });
    navigate('../');
  };

  if (!recipe) return null;
  return (
    <div>
      <RecipeDetails recipe={recipe} />
      {status === 0 && (
        <DraftCommand 
          handlePublish={handlePublish} 
          handleDelete={handleDelete} 
          editLink={`/recipes/${recipe._id}/edit`}></DraftCommand>
      )}
      {status === 1 && (
        <PublishedCommand
          handleUnPublish={handleUnPublish}
          handleDelete={handleDelete}
          editLink={`/recipes/${recipe._id}/edit`}></PublishedCommand>
      )}
      {status === 2 && (
        <SavedCommand handleUnsave={handleUnsave}></SavedCommand>
      )}
    </div>
  );
};

export default RecipePage;
