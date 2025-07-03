import mongoose, { Schema, models } from 'mongoose';

const FileSchema = new Schema({
  filename: { type: String, required: true },
  url: { type: String, required: true },
  owner: { type: Schema.Types.ObjectId, ref: 'User' },
  size: Number,
  uploadedAt: { type: Date, default: Date.now },
});

export const File = models.File || mongoose.model("File", FileSchema);
