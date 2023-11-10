import { InferSchemaType, model, Schema, Types } from 'mongoose';

const MealSchema = new Schema({
  time_slot: {
    type: Date,
    required: true
  },

  recipe: {
    type: Types.ObjectId,
    required: true,
    ref: 'Recipe'
  }
});

const PlanSchema = new Schema({
  user: {
    type: Types.ObjectId,
    required: true,
    ref: 'User'
  },
  date: {
    type: Date,
    required: true,
    expires: 60 * 60 * 24 * 7 //expires after 1 week
  },
  meals: [MealSchema]
});

type IPlan = InferSchemaType<typeof PlanSchema> & { _id: Types.ObjectId };

const Plan = model<IPlan>('Plan', PlanSchema);
export default Plan;
