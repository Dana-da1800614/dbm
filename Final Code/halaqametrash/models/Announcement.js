import { Schema, mongoose } from 'mongoose';
const AutoIncrement = require('mongoose-sequence')(mongoose);

const AnnouncementSchema = new Schema(
  {
    announcementTitle: { type: String, require: true },
    announcementText: { type: String, require: true },
  },
  {
    timestamps: true,
  }
);

const Announcement =
  mongoose.models.Announcement ||
  mongoose.model('Announcement', AnnouncementSchema);
export default Announcement;
