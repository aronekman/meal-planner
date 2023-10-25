import { useEffect } from 'react';

import { useAppContext } from '@/common/AppContext';

import RecipeForm from '../components/RecipeForm';
import { useRecipeContext } from '../RecipeContext';

const CreateRecipe = () => {
  const { createRecipe } = useRecipeContext();
  const { setAppData } = useAppContext();

  useEffect(() => {
    setAppData({ showBackButton: true });
    return () => {
      setAppData({ showBackButton: false });
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return <RecipeForm handleSubmit={data => createRecipe(data)} />;
};

export default CreateRecipe;
