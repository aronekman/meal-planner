import { InferSchemaType, model, Schema } from 'mongoose';

/* const RecipeSchema = z.object({
  name: z.string().min(5),
  description: z.string().min(1),
  time: z.number().int().nullable(),
  difficulty: z.string(),
  ingredients: z.array(IngredientSchema),
  instructions: z.array(z.string()),
  image: z.instanceof(File).nullable(),
  cost: z.number().nullable()
});

export const IngredientSchema = z.object({
  amount: z.string(),
  name: z.string(),
  calories: z.number(),
  protein_g: z.number()
}); */

/* export interface IIngredient extends mongoose.Document {
  amount: string;
  name: string;
  calories: string;
  protein: string;
} */

/* export interface IRecipe extends mongoose.Document {
  name: string;
  description: string;
  time: number | null;
  difficulty: string;
  ingredients: IIngredient[];
  instructions: string;
  cost: number | null;
} */

const IngredientSchema = new Schema({
  amount: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  calories: {
    type: Number,
    required: true
  },
  protein: {
    type: Number,
    required: true
  }
});

const RecipeSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  time: {
    type: Number
  },
  difficulty: {
    type: String,
    required: true
  },
  ingredients: [IngredientSchema],
  instructions: {
    type: String,
    required: true
  },
  cost: {
    type: Number
  }
});

type IRecipe = InferSchemaType<typeof RecipeSchema>;

const Recipe = model<IRecipe>('Recipe', RecipeSchema);
export default Recipe;
