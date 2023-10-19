import axios from 'axios';
import { z } from 'zod';

import config from '@/config';

export const IngredientSchema = z.object({
  amount: z.string(),
  name: z.string(),
  calories: z.number(),
  protein: z.number()
});

export type Ingredient = z.infer<typeof IngredientSchema>;

export const fetchIngredientData = async (amount: string, search: string): Promise<Ingredient> => {
  const { data } = await axios.get(`https://api.api-ninjas.com/v1/nutrition?query=${search}`, {
    headers: { 'X-Api-Key': config.apiNinjasApiKey }
  });
  if (!data.length) throw Error('No results');
  return IngredientSchema.parse({ ...data[0], amount, protein: data[0].protein_g });
};
