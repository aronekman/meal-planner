import { Link, useNavigate } from 'react-router-dom';
import { Plus } from 'lucide-react';

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/common/components/Accordion';
import { Button } from '@/common/components/Button';

import RecipeIcon from '../components/RecipeIcon';
import { useRecipeContext } from '../RecipeContext';

const MyRecipes = () => {
  const { drafts, published, saved } = useRecipeContext();
  const navigate = useNavigate();

  return (
    <div className="flex flex-col gap-2 py-4 px-9">
      <Button asChild variant="default" className='fixed bottom-20 right-9 \
        rounded-full p-2 drop-shadow-[0_4px_4px_rgba(0,0,0,0.5)]'>
        <Link className="w-fit" to="create">
          <Plus className='h-full text-white'></Plus>
        </Link>
      </Button>
      <Accordion type="multiple">
        <AccordionItem value="drafts" className='overflow-visible'>
          <AccordionTrigger className='font-hand text-2xl'>Drafted Recipes</AccordionTrigger>
          <AccordionContent>
            <div className="grid grid-flow-row auto-rows-max justify-items-center gap-4
              min-[350px]:grid-cols-2
              sm:grid-cols-3
              md:grid-cols-4
              lg:grid-cols-5">
              {drafts.map(recipe => (
                <RecipeIcon key={recipe._id} recipe={recipe} onClick={() => navigate(`${recipe._id}/draft`)} />
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="published">
          <AccordionTrigger className='font-hand text-2xl'>Published Recipes</AccordionTrigger>
          <AccordionContent>
            <div className="grid grid-flow-row auto-rows-max justify-items-center gap-4
              min-[350px]:grid-cols-2
              sm:grid-cols-3
              md:grid-cols-4
              lg:grid-cols-5">
              {published.map(recipe => (
                <RecipeIcon key={recipe._id} recipe={recipe} onClick={() => navigate(`${recipe._id}/published`)} />
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="saved">
          <AccordionTrigger className='font-hand text-2xl'>Saved Recipes</AccordionTrigger>
          <AccordionContent>
            <div className="grid grid-flow-row auto-rows-max justify-items-center gap-4
              min-[350px]:grid-cols-2
              sm:grid-cols-3
              md:grid-cols-4
              lg:grid-cols-5">
              {saved.map(recipe => (
                <RecipeIcon key={recipe._id} recipe={recipe} onClick={() => navigate(`${recipe._id}/saved`)} />
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};

export default MyRecipes;
