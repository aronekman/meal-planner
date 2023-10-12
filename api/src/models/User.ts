import mongoose from 'mongoose';

export interface IUser extends mongoose.Document {
  userName: string;
  passwordHash: string;
}

const UserSchema = new mongoose.Schema<IUser>({
  userName: {
    type: String,
    required: true,
    unique: true
  },
  passwordHash: {
    type: String,
    required: true
  }
});

const User = mongoose.model<IUser>('User', UserSchema);
export default User;
