import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { useAppContext } from '@/common/AppContext';

import RecipeForm from '../components/RecipeForm';
import { useRecipeContext } from '../RecipeContext';

const EditRecipe = () => {
  const { setAppData } = useAppContext();

  const { drafts, published, loaded, updateRecipe } = useRecipeContext();
  const { id } = useParams();
  const navigate = useNavigate();
  let isPublished = true;
  let recipe = published.find(recipe => recipe._id === id);
  if (!recipe) {
    recipe = drafts.find(recipe => recipe._id === id);
    isPublished = false
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
  if (!recipe) return null;

  return (
    <div>
      {recipe && <RecipeForm recipe={recipe} handleSubmit={data => updateRecipe(data, recipe ? recipe._id : "", isPublished)} />}
    </div>
  );
};

export default EditRecipe;
