import { Schema, mongoose } from 'mongoose';

const StaffSchema = new Schema(
  {
    staffNo: { type: Number, required: true, unique: true },
    username: { type: String, required: true, unique: true },
    firstName: { type: String, required: true, unique: true },
    lastName: { type: String },
    email: { type: String, required: true },
    password: { type: String, required: true },
    isCoordinator: { type: Number },
    halaqa: { type: String },
  },
  {
    timestamps: true,
  }
);

const Staff = mongoose.models.Staff || mongoose.model('Staff', StaffSchema);
export default Staff;
