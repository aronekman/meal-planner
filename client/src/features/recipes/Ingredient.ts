import { z } from 'zod';

import apiClient from '@/api/Axios';

export const IngredientSchema = z.object({
  amount: z.string(),
  name: z.string(),
  calories: z.number(),
  protein: z.number()
});

export type Ingredient = z.infer<typeof IngredientSchema>;

export const fetchIngredientData = async (amount: string, search: string): Promise<Ingredient> => {
  const { data } = await apiClient.get(`/ingredient?search=${search}&amount=${amount}`);
  return IngredientSchema.parse({ ...data, amount, protein: data.protein_g });
};
