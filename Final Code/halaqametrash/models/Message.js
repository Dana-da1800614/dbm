import { Schema, mongoose } from 'mongoose';

const MessageSchema = new Schema(
  { message: { type: String, require: true },
  image: { type: String },
  parentId: { type: String, require: true },
  },
  {
    timestamps: true,
  }
);

const Message =
  mongoose.models.Message || mongoose.model('Message', MessageSchema);
export default Message;
