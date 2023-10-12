import mongoose from 'mongoose';

export interface IUserToken extends mongoose.Document {
  userId: mongoose.Types.ObjectId;
  token: string;
  createdAt: Date;
}

const userTokenSchema = new mongoose.Schema<IUserToken>({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true
  },
  token: { type: String, required: true },
  createdAt: {
    type: Date,
    default: Date.now,
    expires: 60 * 60 * 24 // 1 day
  }
});

const UserToken = mongoose.model<IUserToken>('UserToken', userTokenSchema);

export default UserToken;
