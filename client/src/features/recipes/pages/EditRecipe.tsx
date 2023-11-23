import { useEffect } from 'react';
import { matchPath, useLocation, useNavigate, useParams } from 'react-router-dom';

import { useAppContext } from '@/common/AppContext';

import RecipeForm from '../components/RecipeForm';
import { useRecipeContext } from '../RecipeContext';

const EditRecipe = () => {
  const { setAppData } = useAppContext();

  const { drafts, published, loaded, updateRecipe } = useRecipeContext();
  const { id } = useParams();
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const isPublished = Boolean(matchPath('/recipes/published/*', pathname));
  const recipe = (isPublished ? published : drafts).find(recipe => recipe._id === id);
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
      <RecipeForm recipe={recipe} handleSubmit={data => updateRecipe(data, recipe._id, isPublished)} />
    </div>
  );
};

export default EditRecipe;
