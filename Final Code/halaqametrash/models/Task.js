import { Schema, mongoose } from 'mongoose';

const TaskSchema = new Schema(
  {
    studentId: { type: String, require: true },
    surahId: { type: Number, require: true },
    surahName: { type: String, require: true },
    fromAya: { type: Number, require: true },
    toAya: { type: Number, require: true },
    type: { type: String, require: true },
    dueDate: { type: String, require: true },
    completedDate: { type: String },
    masteryLevel: { type: String },
    comment: { type: String },
    surah: { type: Object },
  },
  {
    timestamps: true,
  }
);

const Task = mongoose.models.Task || mongoose.model('Task', TaskSchema);
export default Task;
