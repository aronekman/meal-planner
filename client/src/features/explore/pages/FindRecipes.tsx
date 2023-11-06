import { useState } from 'react';

import { Input } from '@/common/components/Input';

import RecipeCard from '../components/RecipeCard';
import { useExploreContext } from '../ExploreContext';

const FindRecipes = () => {
  const { recipes } = useExploreContext();
  const [search, setSearch] = useState<string>('');
  const rows = recipes.filter(
    recipe =>
      recipe.name.trim().toLowerCase().includes(search.trim().toLowerCase()) ||
      recipe.description.trim().toLowerCase().includes(search.trim().toLowerCase())
  );
  return (
    <div className="flex flex-col gap-2 p-4">
      <Input value={search} onChange={({ target }) => setSearch(target.value)} placeholder="Search" />
      {rows.map(recipe => (
        <RecipeCard key={recipe._id} recipe={recipe} />
      ))}
    </div>
  );
};

export default FindRecipes;
