import axios from 'axios';
import { z } from 'zod';

import config from '@/config';

export const IngredientSchema = z.object({
  amount: z.string(),
  name: z.string(),
  calories: z.number(),
  protein_g: z.number()
});

export type Ingredient = z.infer<typeof IngredientSchema>;

export const fetchIngredientData = async (amount: string, search: string): Promise<Ingredient> => {
  const response = await axios.get(`https://api.api-ninjas.com/v1/nutrition?query=${search}`, {
    headers: { 'X-Api-Key': config.apiNinjasApiKey }
  });
  if (!response.data.length) throw Error('No results');
  return IngredientSchema.parse({ ...response.data[0], amount });
};
