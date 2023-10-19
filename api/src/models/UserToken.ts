import { InferSchemaType, model, Schema, Types } from 'mongoose';

const userTokenSchema = new Schema({
  userId: {
    type: Types.ObjectId,
    required: true
  },
  token: { type: String, required: true },
  createdAt: {
    type: Date,
    default: Date.now,
    expires: 60 * 60 * 24 // 1 day
  }
});

export type IUserToken = InferSchemaType<typeof userTokenSchema>;

const UserToken = model<IUserToken>('UserToken', userTokenSchema);

export default UserToken;
