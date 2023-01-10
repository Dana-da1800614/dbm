import { Schema, mongoose } from 'mongoose';

const SurahSchema = new Schema(
  {
    id: { type: Number, required: true, unique: true },
    name: { type: String, required: true },
    englishName: { type: String, required: true },
    ayaCount: { type: Number, required: true },
    type: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

const Surah = mongoose.models.Surah || mongoose.model('Surah', SurahSchema);
export default Surah;
