import { InferSchemaType, model, Schema, Types } from 'mongoose';

const IngredientSchema = new Schema({
  amount: {
    type: String
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
    type: String
  },
  time: {
    type: Number
  },
  difficulty: {
    type: String
  },
  ingredients: [IngredientSchema],
  instructions: {
    type: String
  },
  cost: {
    type: Number
  },
  created_by: {
    type: Types.ObjectId,
    required: true,
    ref: 'User'
  },
  image: {
    type: String
  },
  published: {
    type: Boolean,
    default: false
  },
  published_at: {
    type : Date
  }
});

type IRecipe = InferSchemaType<typeof RecipeSchema> & { _id: Types.ObjectId };

const Recipe = model<IRecipe>('Recipe', RecipeSchema);
export default Recipe;
