import { InferSchemaType, model, Schema, Types } from 'mongoose';

const UserSchema = new Schema({
  userName: {
    type: String,
    required: true,
    unique: true
  },
  passwordHash: {
    type: String,
    required: true
  },
  savedRecipes: {
    type: [String],
    default : []
  }
});

export type IUser = InferSchemaType<typeof UserSchema> & { _id: Types.ObjectId };

const User = model<IUser>('User', UserSchema);
export default User;
