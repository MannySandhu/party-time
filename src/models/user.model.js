import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true
    },
    name: {
      type: String,
      required: true
    },
    picture: {
      type: String
    },
    googleId: {
      type: String,
      required: true,
      unique: true
    },
    role: {
      type: String,
      enum: ['user', 'guest', 'viewer', 'admin'],
      default: 'user'
    },
    invitedEvents: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Event'
      }
    ]
  },
  { timestamps: true }
);

export default mongoose.model('User', userSchema);
