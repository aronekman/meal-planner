import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { useAppContext } from '@/common/AppContext';

import RecipeForm from '../components/RecipeForm';
import { useRecipeContext } from '../RecipeContext';

const EditRecipe = () => {
  const { setAppData } = useAppContext();

  const { drafts, loaded, updateRecipe } = useRecipeContext();
  const { id } = useParams();
  const navigate = useNavigate();

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
  if (!recipe) return null;

  return (
    <div>
      <RecipeForm recipe={recipe} handleSubmit={data => updateRecipe(data, recipe._id)} />
    </div>
  );
};

export default EditRecipe;
