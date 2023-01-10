import { Schema, mongoose } from 'mongoose';

const ParentSchema = new Schema(
  {
    qatariId: { type: Number, required: true, unique: true },
    firstName: { type: String, required: true },
    lastName: { type: String },
    mobile: { type: String, required: true },
    email: { type: String, required: true },
    username: { type: String, required: true },
    password: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

const Parent = mongoose.models.Parent || mongoose.model('Parent', ParentSchema);
export default Parent;
