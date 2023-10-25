import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import apiClient from '@/api/Axios';
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
  const { loaded, published } = useRecipeContext();
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
    await apiClient.post(`/recipes/unpublish?id=${recipe?._id}`);
    toast({ title: `${recipe.name} Unpublished!` });
    navigate('../');
  };

  if (!recipe) return null;
  return (
    <div>
      <RecipeDetails recipe={recipe} />
      <div className="mb-6 flex justify-end p-4">
        <Button onClick={handleUnPublish} disabled={!recipe}>
          Unpublish
        </Button>
      </div>
    </div>
  );
};

export default PublishedPage;
