import { Schema, mongoose } from 'mongoose';

const StudentSchema = new Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String },
    dob: { type: String, required: true },
    gender: { type: String, required: true },
    schoolGrade: { type: Number, required: true },
    teacherId: { type: Number, required: true },
    parentId: { type: String, require: true },
    enrollmentStatus: { type: Boolean, require: true },
  },
  {
    timestamps: true,
  }
);

const Student =
  mongoose.models.Student || mongoose.model('Student', StudentSchema);
export default Student;
