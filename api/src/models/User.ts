import { InferSchemaType, model, Schema, Types } from 'mongoose';

const UserSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  password_hash: {
    type: String,
    required: true
  },
  saved_recipes: {
    type: [{ type: Types.ObjectId, ref: 'Recipe' }],
    default: []
  }
});

export type IUser = InferSchemaType<typeof UserSchema> & { _id: Types.ObjectId };

const User = model<IUser>('User', UserSchema);
export default User;
