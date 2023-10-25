import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/common/components/Accordion';
import { Button } from '@/common/components/Button';

import { useRecipeContext } from '../RecipeContext';
import RecipeIcon from '../RecipeIcon';

const MyRecipes = () => {
  const { drafts, published, getData } = useRecipeContext();
  const navigate = useNavigate();
  useEffect(() => {
    getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="flex flex-col gap-2 p-4">
      <Button asChild variant="outline">
        <Link className="w-full" to="create">
          Create Recipe
        </Link>
      </Button>
      <Accordion type="multiple">
        <AccordionItem value="drafts">
          <AccordionTrigger>Drafted Recipes</AccordionTrigger>
          <AccordionContent>
            <div className="grid grid-cols-2 gap-2">
              {drafts.map(recipe => (
                <RecipeIcon key={recipe._id} recipe={recipe} onClick={() => navigate(`${recipe._id}/draft`)} />
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="published">
          <AccordionTrigger>Published Recipes</AccordionTrigger>
          <AccordionContent>
            <div className="grid grid-cols-2 gap-2">
              {published.map(recipe => (
                <RecipeIcon key={recipe._id} recipe={recipe} onClick={() => navigate(`${recipe._id}/published`)} />
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};

export default MyRecipes;
